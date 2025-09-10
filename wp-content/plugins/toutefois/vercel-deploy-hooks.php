<?php

/**
 * Plugin Name: Vercel Deploy Hooks
 * Description: Triggers Vercel deploys when content is published/updated.
 * Version: 1.0.0
 * Author: You
 */

if (!defined('ABSPATH')) exit;

class Vercel_Deploy_Hooks
{
    const OPT = 'vdh_options';
    const TRANSIENT = 'vdh_deploy_scheduled';

    public function __construct()
    {
        add_action('admin_menu', [$this, 'add_settings_page']);
        add_action('admin_init', [$this, 'register_settings']);

        // Content changes
        add_action('save_post', [$this, 'maybe_trigger_on_post'], 10, 3);
        add_action('wp_update_nav_menu', [$this, 'maybe_trigger_generic']);          // Menus
        add_action('customize_save_after', [$this, 'maybe_trigger_generic']);        // Customizer changes

        // Scheduled deploy executor
        add_action('vdh_run_deploy', [$this, 'run_deploy'], 10, 1);
    }

    public function add_settings_page()
    {
        add_options_page('Vercel Deploy Hooks', 'Vercel Deploy Hooks', 'manage_options', 'vdh-settings', [$this, 'render_settings']);
    }

    public function register_settings()
    {
        register_setting(self::OPT, self::OPT, ['sanitize_callback' => [$this, 'sanitize']]);

        add_settings_section('vdh_main', 'Vercel Hooks', function () {
            echo '<p>Paste your Vercel Deploy Hook URLs. Create them in Vercel → Project → Settings → <em>Deploy Hooks</em>.</p>';
        }, self::OPT);

        add_settings_field('production_url', 'Production hook URL', function () {
            $o = get_option(self::OPT, []);
            printf('<input type="url" name="%s[production_url]" value="%s" class="regular-text" placeholder="https://api.vercel.com/v1/integrations/deploy/prj_...">', self::OPT, esc_attr($o['production_url'] ?? ''));
        }, self::OPT, 'vdh_main');

        add_settings_field('preview_url', 'Preview hook URL (optional)', function () {
            $o = get_option(self::OPT, []);
            printf('<input type="url" name="%s[preview_url]" value="%s" class="regular-text">', self::OPT, esc_attr($o['preview_url'] ?? ''));
        }, self::OPT, 'vdh_main');

        add_settings_field('throttle', 'Throttle (seconds)', function () {
            $o = get_option(self::OPT, []);
            $val = isset($o['throttle']) ? intval($o['throttle']) : 60;
            printf('<input type="number" min="0" name="%s[throttle]" value="%d" class="small-text">', self::OPT, $val);
            echo '<p class="description">Minimum delay before firing a deploy (events within this window are batched).</p>';
        }, self::OPT, 'vdh_main');

        add_settings_field('post_types', 'Trigger on post types', function () {
            $o = get_option(self::OPT, []);
            $selected = isset($o['post_types']) && is_array($o['post_types']) ? $o['post_types'] : ['post', 'page'];
            foreach (get_post_types(['public' => true], 'objects') as $pt => $obj) {
                printf(
                    '<label><input type="checkbox" name="%s[post_types][]" value="%s" %s> %s</label><br>',
                    self::OPT,
                    esc_attr($pt),
                    checked(in_array($pt, $selected, true), true, false),
                    esc_html($obj->labels->name)
                );
            }
        }, self::OPT, 'vdh_main');
    }

    public function sanitize($input)
    {
        return [
            'production_url' => esc_url_raw($input['production_url'] ?? ''),
            'preview_url'    => esc_url_raw($input['preview_url'] ?? ''),
            'throttle'       => max(0, intval($input['throttle'] ?? 60)),
            'post_types'     => array_values(array_map('sanitize_key', $input['post_types'] ?? ['post', 'page'])),
        ];
    }
    public function render_settings()
    {
        echo '<div class="wrap"><h1>Vercel Deploy Hooks</h1><form method="post" action="options.php">';
        settings_fields(self::OPT); // This already outputs the correct nonce for the options form
        do_settings_sections(self::OPT);
        submit_button();
        echo '</form><hr>';

        // Manual trigger form with its own nonce
        echo '<form method="post">';
        wp_nonce_field('vdh_manual_deploy_action', 'vdh_manual_deploy_nonce');
        submit_button('Trigger Deploy Now', 'secondary', 'vdh_manual_deploy');
        echo '</form></div>';

        // Handle manual trigger
        if (isset($_POST['vdh_manual_deploy'])) {
            if (
                !isset($_POST['vdh_manual_deploy_nonce']) ||
                !wp_verify_nonce($_POST['vdh_manual_deploy_nonce'], 'vdh_manual_deploy_action')
            ) {
                wp_die(__('Security check failed. Please try again.'));
            }
            $this->schedule_deploy('manual');
            echo '<div class="updated"><p>Deploy scheduled.</p></div>';
        }
    }


    public function maybe_trigger_on_post($post_ID, $post, $update)
    {
        if (wp_is_post_revision($post_ID) || wp_is_post_autosave($post_ID)) return;
        $o = get_option(self::OPT, []);
        $pts = $o['post_types'] ?? ['post', 'page'];
        if (!in_array($post->post_type, $pts, true)) return;

        // Only on publish/update of public content
        if (get_post_status($post_ID) === 'publish') {
            $this->schedule_deploy('post:' . $post->post_type);
        }
    }

    public function maybe_trigger_generic()
    {
        $this->schedule_deploy('generic_change');
    }

    private function schedule_deploy($context = 'auto')
    {
        $o = get_option(self::OPT, []);
        $delay = isset($o['throttle']) ? intval($o['throttle']) : 60;

        if (!get_transient(self::TRANSIENT)) {
            set_transient(self::TRANSIENT, 1, $delay);
            wp_schedule_single_event(time() + $delay, 'vdh_run_deploy', [$context]);
        }
    }

    public function run_deploy($context = 'auto')
    {
        $o = get_option(self::OPT, []);
        $prod = $o['production_url'] ?? '';
        $prev = $o['preview_url'] ?? '';

        // Simple rule: published updates → production; otherwise fall back to preview if present.
        $target = $prod ?: $prev;
        if (!$target) return;

        $args = [
            'method'  => 'POST',
            'timeout' => 5,
            'blocking' => false,
            'headers' => ['Content-Type' => 'application/json'],
            'body'    => wp_json_encode([
                'source'  => 'wordpress',
                'site'    => home_url(),
                'context' => $context,
                'time'    => current_time('mysql')
            ]),
        ];
        $res = wp_remote_post($target, $args);
        // Optional: log result
        if (is_wp_error($res)) error_log('[VDH] Deploy failed: ' . $res->get_error_message());
        else error_log('[VDH] Deploy triggered: ' . $target);
    }
}
new Vercel_Deploy_Hooks();

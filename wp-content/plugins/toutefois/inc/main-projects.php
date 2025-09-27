<?php
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Main Projects: meta, admin UI, and helpers
 */

// Register meta for marking a Projet as Main and associating items to a Main Project
function toutefois_register_main_project_meta() {
    // Mark a projet as a main project
    register_post_meta('projet', '_projet_is_main', [
        'show_in_rest' => true,
        'single'       => true,
        'type'         => 'boolean',
        'auth_callback'=> '__return_true', // expose publicly for frontend
    ]);

    // Association to a main project (for posts, collaborators, and sub-projects)
    $assoc_meta_args = [
        'show_in_rest' => true,
        'single'       => true,
        'type'         => 'integer',
        'auth_callback'=> '__return_true', // expose publicly for frontend filters
    ];
    register_post_meta('post', '_main_project_id', $assoc_meta_args);
    register_post_meta('collaborateur', '_main_project_id', $assoc_meta_args);
    register_post_meta('projet', '_main_project_id', $assoc_meta_args); // sub-projects
}
add_action('init', 'toutefois_register_main_project_meta');

/**
 * Admin UI: Meta boxes
 */
function toutefois_get_main_projects_dropdown() {
    // Fetch only projets flagged as main
    $projects = get_posts([
        'post_type'      => 'projet',
        'posts_per_page' => -1,
        'post_status'    => ['publish','draft','pending'],
        'meta_query'     => [[
            'key'     => '_projet_is_main',
            'value'   => '1',
            'compare' => '=',
        ]],
        'orderby'        => 'title',
        'order'          => 'ASC',
        'fields'         => 'ids',
    ]);
    return $projects;
}

function toutefois_main_project_meta_box_render($post) {
    wp_nonce_field('toutefois_main_project_meta', 'toutefois_main_project_meta_nonce');

    $is_main = get_post_meta($post->ID, '_projet_is_main', true);
    $assoc   = intval(get_post_meta($post->ID, '_main_project_id', true));

    // Only show the "Main Project" checkbox on projet post type
    if ($post->post_type === 'projet') {
        echo '<p><label><input type="checkbox" name="_projet_is_main" value="1" ' . checked($is_main, '1', false) . ' /> ' . esc_html__('Main Project', 'toutefois') . '</label></p>';
    }

    // Association dropdown (for all: post, collaborateur, projet)
    $options = toutefois_get_main_projects_dropdown();
    echo '<p><label for="_main_project_id">' . esc_html__('Associated Main Project', 'toutefois') . '</label><br />';
    echo '<select name="_main_project_id" id="_main_project_id">';
    echo '<option value="">' . esc_html__('— None —', 'toutefois') . '</option>';
    foreach ($options as $proj_id) {
        $title = get_the_title($proj_id);
        echo '<option value="' . esc_attr($proj_id) . '" ' . selected($assoc, $proj_id, false) . '>' . esc_html($title) . '</option>';
    }
    echo '</select></p>';

    if ($post->post_type === 'projet') {
        echo '<p class="description">' . esc_html__('If this Projet is a sub-project, selecting a Main Project here will also set its post_parent.', 'toutefois') . '</p>';
    }
}

function toutefois_add_main_project_meta_box() {
    $screens = ['post', 'collaborateur', 'projet'];
    foreach ($screens as $screen) {
        add_meta_box(
            'toutefois_main_project_meta',
            __('Main Project', 'toutefois'),
            'toutefois_main_project_meta_box_render',
            $screen,
            'side',
            'high'
        );
    }
}
add_action('add_meta_boxes', 'toutefois_add_main_project_meta_box');

/**
 * Save handler
 */
function toutefois_save_main_project_meta($post_id, $post, $update) {
    // Prevent recursion and irrelevant saves
    static $toutefois_saving = false;
    if ($toutefois_saving) return;
    if (!isset($_POST['toutefois_main_project_meta_nonce']) || !wp_verify_nonce($_POST['toutefois_main_project_meta_nonce'], 'toutefois_main_project_meta')) {
        return;
    }
    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) return;
    if (!current_user_can('edit_post', $post_id)) return;
    if (!in_array($post->post_type, ['post','collaborateur','projet'], true)) return;

    // Save association meta across all screens
    if (isset($_POST['_main_project_id']) && $_POST['_main_project_id'] !== '') {
        $main_id = absint($_POST['_main_project_id']);
        update_post_meta($post_id, '_main_project_id', $main_id);
        // If saving a projet that is not the main itself, sync post_parent
        if ($post->post_type === 'projet' && (int)$post_id !== (int)$main_id) {
            // Ensure main_id is a projet and marked as main
            $is_main = get_post_meta($main_id, '_projet_is_main', true);
            $current_parent = (int) get_post_field('post_parent', $post_id);
            if ($is_main && $current_parent !== (int)$main_id) {
                $toutefois_saving = true;
                remove_action('save_post', 'toutefois_save_main_project_meta', 10);
                wp_update_post([
                    'ID' => $post_id,
                    'post_parent' => $main_id,
                ]);
                add_action('save_post', 'toutefois_save_main_project_meta', 10, 3);
                $toutefois_saving = false;
            }
        }
    } else {
        delete_post_meta($post_id, '_main_project_id');
        // If projet and not marked as main, clear parent
        if ($post->post_type === 'projet') {
            $current_parent = (int) get_post_field('post_parent', $post_id);
            if ($current_parent !== 0) {
                $toutefois_saving = true;
                remove_action('save_post', 'toutefois_save_main_project_meta', 10);
                wp_update_post([
                    'ID' => $post_id,
                    'post_parent' => 0,
                ]);
                add_action('save_post', 'toutefois_save_main_project_meta', 10, 3);
                $toutefois_saving = false;
            }
        }
    }

    // Save is_main checkbox (only for projet)
    if ($post->post_type === 'projet') {
        $is_main_val = isset($_POST['_projet_is_main']) ? '1' : '';
        if ($is_main_val === '1') {
            update_post_meta($post_id, '_projet_is_main', '1');
            // Main projects must not have a parent
            $current_parent = (int) get_post_field('post_parent', $post_id);
            if ($current_parent !== 0) {
                $toutefois_saving = true;
                remove_action('save_post', 'toutefois_save_main_project_meta', 10);
                wp_update_post([
                    'ID' => $post_id,
                    'post_parent' => 0,
                ]);
                add_action('save_post', 'toutefois_save_main_project_meta', 10, 3);
                $toutefois_saving = false;
            }
        } else {
            delete_post_meta($post_id, '_projet_is_main');
        }
    }
}
add_action('save_post', 'toutefois_save_main_project_meta', 10, 3);

/**
 * Helper: resolve a projet ID from slug or ID
 */
function toutefois_resolve_main_project_id($raw) {
    if (!$raw) return 0;
    // numeric ID
    if (ctype_digit((string)$raw)) {
        return (int)$raw;
    }
    // slug lookup
    $q = get_posts([
        'name'           => sanitize_title($raw),
        'post_type'      => 'projet',
        'posts_per_page' => 1,
        'post_status'    => 'any',
        'fields'         => 'ids',
    ]);
    return $q ? (int)$q[0] : 0;
}

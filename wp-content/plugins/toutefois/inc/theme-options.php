<?php

/**
 * Theme Options for Toutefois.
 */

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly.
}

// 1. Add Theme Options Page
function toutefois_add_options_page()
{
    add_options_page(
        'Toutefois Options',
        'Toutefois Options',
        'manage_options',
        'toutefois-options',
        'toutefois_options_page_html'
    );
}
add_action('admin_menu', 'toutefois_add_options_page');

// 2. Register Settings
function toutefois_register_settings()
{
    register_setting('toutefois_options', 'toutefois_error_title', [
        'type' => 'string',
        'sanitize_callback' => 'sanitize_text_field',
        'default' => 'Erreur',
        'show_in_rest' => true,
    ]);
    register_setting('toutefois_options', 'toutefois_error_message', [
        'type' => 'string',
        'sanitize_callback' => 'sanitize_text_field',
        'default' => 'Une erreur est survenue.',
        'show_in_rest' => true,
    ]);
    register_setting('toutefois_options', 'toutefois_donation_link', [
        'type' => 'string',
        'sanitize_callback' => 'sanitize_text_field',
        'default' => '',
        'show_in_rest' => true,
    ]);
    // Google Analytics 4 Measurement ID (e.g. G-XXXXXXXXXX)
    register_setting('toutefois_options', 'toutefois_ga_measurement_id', [
        'type' => 'string',
        'sanitize_callback' => 'sanitize_text_field',
        'default' => '',
        'show_in_rest' => true,
    ]);
    // Google Search Console verification token
    register_setting('toutefois_options', 'toutefois_google_site_verification', [
        'type' => 'string',
        'sanitize_callback' => 'sanitize_text_field',
        'default' => '',
        'show_in_rest' => true,
    ]);

    // Facebook authoring options used by frontend News header
    // Store default page info (id, name, url, logo) as an array
    register_setting('toutefois_options', 'toutefois_facebook_default', [
        'type' => 'array',
        'sanitize_callback' => function ($value) {
            // Expect array with id, name, url, logo
            $out = is_array($value) ? $value : [];
            $out['id'] = isset($out['id']) ? sanitize_text_field((string)$out['id']) : '';
            $out['name'] = isset($out['name']) ? sanitize_text_field((string)$out['name']) : '';
            $out['url'] = isset($out['url']) ? esc_url_raw((string)$out['url']) : '';
            $out['logo'] = isset($out['logo']) ? esc_url_raw((string)$out['logo']) : '';
            return $out;
        },
        'default' => [],
        'show_in_rest' => true,
    ]);
    // Store multiple pages as JSON string in the DB for easier UI handling; we will parse before exposing via REST
    register_setting('toutefois_options', 'toutefois_facebook_pages_json', [
        'type' => 'string',
        'sanitize_callback' => function ($value) {
            // Accept raw JSON string; sanitize as text, frontend/REST will decode safely
            return wp_kses_post((string)$value);
        },
        'default' => '[]',
        'show_in_rest' => false,
    ]);
}
add_action('admin_init', 'toutefois_register_settings');

// 3. Render Options Page HTML
function toutefois_options_page_html()
{
    if (!current_user_can('manage_options')) {
        return;
    }
?>
    <div class="wrap">
        <h1><?php echo esc_html(get_admin_page_title()); ?></h1>
        <form action="options.php" method="post">
            <?php
            settings_fields('toutefois_options');
            ?>
            <table class="form-table">
                <tr valign="top">
                    <th scope="row">Error Page Title</th>
                    <td><input type="text" name="toutefois_error_title" value="<?php echo esc_attr(get_option('toutefois_error_title')); ?>" size="40" /></td>
                </tr>
                <tr valign="top">
                    <th scope="row">Error Page Message</th>
                    <td><input type="text" name="toutefois_error_message" value="<?php echo esc_attr(get_option('toutefois_error_message')); ?>" size="40" /></td>
                </tr>
                <tr valign="top">
                    <th scope="row">Lien de donation</th>
                    <td><input type="text" name="toutefois_donation_link" value="<?php echo esc_attr(get_option('toutefois_donation_link')); ?>" size="40" /></td>
                </tr>
                <tr valign="top">
                    <th scope="row">Google Analytics 4 Measurement ID</th>
                    <td>
                        <input type="text" name="toutefois_ga_measurement_id" value="<?php echo esc_attr(get_option('toutefois_ga_measurement_id')); ?>" size="40" placeholder="G-XXXXXXXXXX" />
                        <p class="description">Entrez l'identifiant GA4 (par ex. G-XXXXXXXXXX).</p>
                    </td>
                </tr>
                <tr valign="top">
                    <th scope="row">Google Site Verification</th>
                    <td>
                        <input type="text" name="toutefois_google_site_verification" value="<?php echo esc_attr(get_option('toutefois_google_site_verification')); ?>" size="60" placeholder="Token de vérification Search Console" />
                        <p class="description">Collez la valeur du meta tag <code>google-site-verification</code> fourni par la Google Search Console.</p>
                    </td>
                </tr>

                <tr valign="top">
                    <th scope="row">Facebook par défaut (auteur)</th>
                    <td>
                        <?php $fb_default = (array) get_option('toutefois_facebook_default', []); ?>
                        <label>ID (optionnel)<br/>
                            <input type="text" name="toutefois_facebook_default[id]" value="<?php echo esc_attr($fb_default['id'] ?? ''); ?>" size="40" />
                        </label><br/>
                        <label>Nom<br/>
                            <input type="text" name="toutefois_facebook_default[name]" value="<?php echo esc_attr($fb_default['name'] ?? ''); ?>" size="40" />
                        </label><br/>
                        <label>URL de la page<br/>
                            <input type="url" name="toutefois_facebook_default[url]" value="<?php echo esc_attr($fb_default['url'] ?? ''); ?>" size="60" placeholder="https://www.facebook.com/yourpage" />
                        </label><br/>
                        <label>Logo (URL image)<br/>
                            <input type="url" name="toutefois_facebook_default[logo]" value="<?php echo esc_attr($fb_default['logo'] ?? ''); ?>" size="60" placeholder="https://…/logo.png" />
                        </label>
                        <p class="description">Utilisé lorsque la publication n'indique pas une autre Page Facebook source.</p>
                    </td>
                </tr>

                <tr valign="top">
                    <th scope="row">Facebook Pages (liste)</th>
                    <td>
                        <?php $fb_pages_json = (string) get_option('toutefois_facebook_pages_json', '[]'); ?>
                        <textarea name="toutefois_facebook_pages_json" rows="8" cols="80" style="width:100%;font-family:monospace;"><?php echo esc_textarea($fb_pages_json); ?></textarea>
                        <p class="description">JSON d'objets avec les clés: <code>page_id</code>, <code>name</code>, <code>url</code>, <code>logo</code>, <code>project_id</code> (optionnel). Exemple:<br/>
<code>[{"page_id":"123456789","name":"Toutefois","url":"https://www.facebook.com/toutefois","logo":"https://…/logo.png"}]</code></p>
                    </td>
                </tr>
            </table>
            <?php submit_button(); ?>
        </form>
    </div>
<?php
}

// 4. Register REST API Endpoint for Options
function toutefois_register_options_route()
{
    register_rest_route('toutefois/v1', '/options', [
        'methods' => 'GET',
        'callback' => 'toutefois_get_options',
        'permission_callback' => '__return_true',
    ]);
}
add_action('rest_api_init', 'toutefois_register_options_route');

function toutefois_get_options()
{
    $options = [
        'error_title' => get_option('toutefois_error_title', 'Erreur'),
        'error_message' => get_option('toutefois_error_message', 'Une erreur est survenue.'),
        'donation_link' => get_option('toutefois_donation_link', ''),
        // Expose analytics and search verification values to the frontend
        'ga_measurement_id' => get_option('toutefois_ga_measurement_id', ''),
        'google_site_verification' => get_option('toutefois_google_site_verification', ''),
    ];

    // Facebook mapping for News header
    $fb_default = (array) get_option('toutefois_facebook_default', []);
    $options['facebook_default'] = [
        'id' => isset($fb_default['id']) ? (string)$fb_default['id'] : '',
        'name' => isset($fb_default['name']) ? (string)$fb_default['name'] : '',
        'url' => isset($fb_default['url']) ? (string)$fb_default['url'] : '',
        'logo' => isset($fb_default['logo']) ? (string)$fb_default['logo'] : '',
    ];

    $pages_raw = (string) get_option('toutefois_facebook_pages_json', '[]');
    $decoded = json_decode($pages_raw, true);
    $fb_pages = [];
    if (is_array($decoded)) {
        foreach ($decoded as $p) {
            if (!is_array($p)) continue;
            $page_id = isset($p['page_id']) ? (string)$p['page_id'] : '';
            if ($page_id === '') continue;
            $fb_pages[] = [
                'page_id' => $page_id,
                'name' => isset($p['name']) ? (string)$p['name'] : '',
                'url' => isset($p['url']) ? (string)$p['url'] : '',
                'logo' => isset($p['logo']) ? (string)$p['logo'] : '',
                'project_id' => isset($p['project_id']) ? (int)$p['project_id'] : null,
            ];
        }
    }
    $options['facebook_pages'] = $fb_pages;
    return new WP_REST_Response($options, 200);
}

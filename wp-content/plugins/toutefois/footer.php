<?php

/**
 * Plugin Name: Toutefois Footer Settings
 * Description: Adds editable footer settings (phone, email, socials) and exposes them via REST at /wp-json/toutefois/v1/footer
 * Version: 1.0.0
 * Author: Ariane
 */

if (!defined('ABSPATH')) {
    exit;
}

// ---- 1) Register settings ----
add_action('admin_init', function () {
    // One option array to keep things tidy
    register_setting('toutefois_footer_group', 'toutefois_footer', [
        'type'              => 'array',
        'sanitize_callback' => function ($input) {
            return [
                'phone'     => isset($input['phone']) ? sanitize_text_field($input['phone']) : '',
                'email'     => isset($input['email']) ? sanitize_email($input['email']) : '',
                'facebook'  => isset($input['facebook']) ? esc_url_raw($input['facebook']) : '',
                'instagram' => isset($input['instagram']) ? esc_url_raw($input['instagram']) : '',
                'slogan'    => isset($input['slogan']) ? sanitize_text_field($input['slogan']) : '',
            ];
        },
        'default' => [
            'phone'     => '',
            'email'     => '',
            'facebook'  => '',
            'instagram' => '',
            'slogan'    => '',
        ],
    ]);

    add_settings_section(
        'toutefois_footer_section',
        'Footer – Coordonnées & Réseaux sociaux',
        function () {
            echo '<p>Renseignez les informations utilisées dans le pied de page du site headless.</p>';
        },
        'toutefois_footer_page'
    );

    $add_field = function ($key, $label, $type = 'text', $placeholder = '') {
        add_settings_field(
            "toutefois_footer_{$key}",
            $label,
            function () use ($key, $type, $placeholder) {
                $opts = get_option('toutefois_footer', []);
                $val  = isset($opts[$key]) ? $opts[$key] : '';
                printf(
                    '<input type="%s" name="toutefois_footer[%s]" value="%s" class="regular-text" placeholder="%s" />',
                    esc_attr($type),
                    esc_attr($key),
                    esc_attr($val),
                    esc_attr($placeholder)
                );
            },
            'toutefois_footer_page',
            'toutefois_footer_section'
        );
    };

    $add_field('phone',     'Téléphone', 'text', '514-288-2222');
    $add_field('email',     'Courriel',  'email', 'info@toutefois.ca');
    $add_field('facebook',  'Facebook URL',  'url', 'https://www.facebook.com/toutefois');
    $add_field('instagram', 'Instagram URL', 'url', 'https://www.instagram.com/toutefois/');
    $add_field('slogan', 'Slogan', 'text', 'Ensembles');
});

// ---- 2) Admin page ----
add_action('admin_menu', function () {
    add_options_page(
        'Toutefois Footer',
        'Toutefois Footer',
        'manage_options',
        'toutefois_footer',
        function () {
?>
        <div class="wrap">
            <h1>Toutefois – Footer</h1>
            <form method="post" action="options.php">
                <?php
                settings_fields('toutefois_footer_group');
                do_settings_sections('toutefois_footer_page');
                submit_button();
                ?>
            </form>
        </div>
<?php
        }
    );
});

// ---- 3) REST endpoint ----
add_action('rest_api_init', function () {
    register_rest_route('toutefois/v1', '/footer', [
        'methods'  => 'GET',
        'permission_callback' => '__return_true', // public read
        'callback' => function () {
            $opts = get_option('toutefois_footer', []);
            // Basic normalization + derived fields you may want
            $payload = [
                'phone'     => isset($opts['phone']) ? $opts['phone'] : '',
                'email'     => isset($opts['email']) ? $opts['email'] : '',
                'facebook'  => isset($opts['facebook']) ? $opts['facebook'] : '',
                'instagram' => isset($opts['instagram']) ? $opts['instagram'] : '',
                'slogan'    => isset($opts['slogan']) ? $opts['slogan'] : '',
                'site'      => [
                    'name'        => get_bloginfo('name'),
                    'description' => get_bloginfo('description'),
                ],
                'lastUpdated' => current_time('mysql'),
            ];

            // Optional: Cache for 5 minutes at the server level
            return new WP_REST_Response($payload, 200, [
                'Cache-Control' => 'public, max-age=300',
            ]);
        },
    ]);
});

// ---- 4) (Optional) CORS for headless domain ----
// If your Nginx already handles CORS, you can drop this.
// Replace the domain below with your frontend origin.
add_action('rest_api_init', function () {
    add_filter('rest_pre_serve_request', function ($served, $result, $request, $server) {
        $origin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '';
        $allowed = [
            'https://toutefois.arianeguay.ca', // your React site
            'http://localhost:3000',           // dev
        ];
        if (in_array($origin, $allowed, true)) {
            header('Access-Control-Allow-Origin: ' . $origin);
            header('Vary: Origin');
            header('Access-Control-Allow-Methods: GET, OPTIONS');
            header('Access-Control-Allow-Headers: Authorization, Content-Type');
        }
        return $served;
    }, 10, 4);
});

<?php
/**
 * Theme Options for Toutefois.
 */

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly.
}

// 1. Add Theme Options Page
function toutefois_add_options_page() {
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
function toutefois_register_settings() {
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
}
add_action('admin_init', 'toutefois_register_settings');

// 3. Render Options Page HTML
function toutefois_options_page_html() {
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
            </table>
            <?php submit_button(); ?>
        </form>
    </div>
    <?php
}

// 4. Register REST API Endpoint for Options
function toutefois_register_options_route() {
    register_rest_route('toutefois/v1', '/options', [
        'methods' => 'GET',
        'callback' => 'toutefois_get_options',
        'permission_callback' => '__return_true',
    ]);
}
add_action('rest_api_init', 'toutefois_register_options_route');

function toutefois_get_options() {
    $options = [
        'error_title' => get_option('toutefois_error_title', 'Erreur'),
        'error_message' => get_option('toutefois_error_message', 'Une erreur est survenue.'),
    ];
    return new WP_REST_Response($options, 200);
}

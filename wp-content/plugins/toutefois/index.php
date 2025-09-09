<?php

/**
 * Plugin Name: Toutefois - Custom Post Type
 * Description: Adds a custom post type for "Projets" with custom fields and changes the default post type to "Nouvelles".
 * Version: 1.0
 * Author: Ariane Guay
 */

if (! defined('ABSPATH')) {
    exit; // Exit if accessed directly.
}

// 1. Reverse Proxy Awareness
// The following lines are crucial for making WordPress work correctly behind a reverse proxy.
// They ensure that WordPress knows its correct public-facing address (HTTPS) and generates
// the right URLs for REST API calls, which is essential for the Gutenberg editor.
if (isset($_SERVER['HTTP_X_FORWARDED_PROTO']) && $_SERVER['HTTP_X_FORWARDED_PROTO'] === 'https') {
    $_SERVER['HTTPS'] = 'on';
}

if (isset($_SERVER['HTTP_X_FORWARDED_HOST'])) {
    $_SERVER['HTTP_HOST'] = $_SERVER['HTTP_X_FORWARDED_HOST'];
}

define('FORCE_SSL_ADMIN', true);

// Include Components
require_once plugin_dir_path(__FILE__) . 'components/featured-carousel.php';
require_once plugin_dir_path(__FILE__) . 'components/projects-list.php';
require_once plugin_dir_path(__FILE__) . 'components/news-list.php';
require_once plugin_dir_path(__FILE__) . 'components/projects-page-grid.php';
require_once plugin_dir_path(__FILE__) . 'projects.php';
require_once plugin_dir_path(__FILE__) . 'news.php';
require_once plugin_dir_path(__FILE__) . 'collaborateurs.php';

// 8. Expose menu to REST API
function get_top_nav_menu()
{
    $menu = wp_get_nav_menu_items('top-nav');
    $result = [];
    foreach ($menu as $item) {
        // Default values
        $main_color = '';
        $preview_image_url = '';

        // If menu item points to a page, fetch its meta
        if ($item->object === 'page' && !empty($item->object_id)) {
            $page_id = intval($item->object_id);
            $main_color = get_post_meta($page_id, 'main_color', true);
            $preview_id = intval(get_post_meta($page_id, 'preview_image_id', true));
            if ($preview_id) {
                $preview_image_url = wp_get_attachment_image_url($preview_id, 'full');
            }
            // Fallback to featured image if no custom preview image
            if (!$preview_image_url) {
                $featured = get_the_post_thumbnail_url($page_id, 'full');
                if (!empty($featured)) {
                    $preview_image_url = $featured;
                }
            }
        }

        $my_item = [
            'name' => $item->title,
            'href' => $item->url,
            'mainColor' => $main_color,
            'previewImage' => $preview_image_url
        ];
        $result[] = $my_item;
    }
    return $result;
}

function special_projects_menu()
{
    $menu = wp_get_nav_menu_items('special-projects');
    $result = [];
    foreach ($menu as $item) {
        // Default values
        $main_color = '';
        $preview_image_url = '';

        // If menu item points to a page, fetch its meta
        if ($item->object === 'page' && !empty($item->object_id)) {
            $page_id = intval($item->object_id);
            $main_color = get_post_meta($page_id, 'main_color', true);
            $preview_id = intval(get_post_meta($page_id, 'preview_image_id', true));
            if ($preview_id) {
                $preview_image_url = wp_get_attachment_image_url($preview_id, 'full');
            }
            // Fallback to featured image if no custom preview image
            if (!$preview_image_url) {
                $featured = get_the_post_thumbnail_url($page_id, 'full');
                if (!empty($featured)) {
                    $preview_image_url = $featured;
                }
            }
        }

        $my_item = [
            'name' => $item->title,
            'href' => $item->url,
            'mainColor' => $main_color,
            'previewImage' => $preview_image_url
        ];
        $result[] = $my_item;
    }
    return $result;
}

add_action('rest_api_init', function () {
    register_rest_route('toutefois/v1', '/menu', array(
        'methods' => 'GET',
        'callback' => 'get_top_nav_menu',
        'permission_callback' => '__return_true' // Make public
    ));

    register_rest_route('toutefois/v1', '/special-projects', array(
        'methods' => 'GET',
        'callback' => 'special_projects_menu',
        'permission_callback' => '__return_true' // Make public
    ));
});

// 9. Add CORS support for the REST API
function add_cors_headers()
{
    // Always enable CORS for REST API requests
    if (strpos($_SERVER['REQUEST_URI'], '/wp-json/') === false) {
        return;
    }

    $allowed_origins = array(
        'https://toutefois.arianeguay.ca',
        'https://admin.toutefois.arianeguay.ca',
        'http://localhost:3000',
        'http://localhost:5173'
    );

    $origin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '';

    // If origin is in allowed list, use that origin
    if (in_array($origin, $allowed_origins)) {
        header('Access-Control-Allow-Origin: ' . $origin);
    } else {
        // Fallback to the main site URL for production
        header('Access-Control-Allow-Origin: https://toutefois.arianeguay.ca');
    }

    // Set standard CORS headers
    header('Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE');
    header('Access-Control-Allow-Headers: Authorization, Content-Type, X-Requested-With');
    header('Access-Control-Expose-Headers: X-WP-Total, X-WP-TotalPages');

    // Explicitly disable credentials since we're using 'omit' in the frontend
    header('Access-Control-Allow-Credentials: false');

    // Handle preflight requests
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        status_header(200);
        exit();
    }
}

// Hook into WordPress to add CORS headers
add_action('init', 'add_cors_headers', 1);
add_action('rest_api_init', 'add_cors_headers', 1);



// 11. Register Gutenberg Blocks
function toutefois_register_blocks()
{
    $block_folders = glob(plugin_dir_path(__FILE__) . 'build/*', GLOB_ONLYDIR);
    foreach ($block_folders as $block_folder) {
        register_block_type($block_folder);
    }
}
add_action('init', 'toutefois_register_blocks');

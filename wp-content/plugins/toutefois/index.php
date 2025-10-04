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


require_once plugin_dir_path(__FILE__) . 'components/featured-carousel.php';
require_once plugin_dir_path(__FILE__) . 'components/projects-list.php';
require_once plugin_dir_path(__FILE__) . 'components/news-list.php';
require_once plugin_dir_path(__FILE__) . 'components/collaborators.php';
require_once plugin_dir_path(__FILE__) . 'components/projects-page-grid.php';
require_once plugin_dir_path(__FILE__) . 'components/projects-category-row.php';
require_once plugin_dir_path(__FILE__) . 'projects.php';
require_once plugin_dir_path(__FILE__) . 'news.php';
require_once plugin_dir_path(__FILE__) . 'cpt-collaborateurs.php';
require_once plugin_dir_path(__FILE__) . 'footer.php';
require_once plugin_dir_path(__FILE__) . 'inc/theme-options.php';
require_once plugin_dir_path(__FILE__) . 'inc/main-projects.php';
// Facebook sync (imports Facebook posts as WordPress news with cron and REST trigger)
require_once plugin_dir_path(__FILE__) . 'facebook-sync.php';


// Add custom page templates
function toutefois_add_page_templates($templates, $theme, $post)
{
    if ($post && in_array($post->post_type, ['page', 'projet'])) {
        $templates['template-no-margin.php'] = __('No Margin', 'toutefois');
        $templates['template-banner.php'] = __('With Banner', 'toutefois');
        $templates['template-title.php'] = __('With Title', 'toutefois');
    }
    return $templates;
}
add_filter('theme_templates', 'toutefois_add_page_templates', 10, 3);


// Expose page template to REST API
function toutefois_register_template_meta()
{
    register_post_meta('page', '_wp_page_template', array(
        'show_in_rest' => true,
        'single' => true,
        'type' => 'string',
        'auth_callback' => function () {
            return current_user_can('edit_posts');
        }
    ));
    // starting side meta
    register_post_meta('page', 'splashes_starting_side', array(
        'show_in_rest' => array(
            'schema' => array(
                'type' => 'string',
                'enum' => array('left', 'right'),
            )
        ),
        'single' => true,
        'type' => 'string',
        'auth_callback' => function () {
            return current_user_can('edit_posts');
        }
    ));
}
add_action('rest_api_init', 'toutefois_register_template_meta');

// Expose Facebook origin meta for posts in REST
function toutefois_register_fb_meta_rest()
{
    $fields = array('_fb_post_id', '_fb_permalink', '_fb_page_id', '_fb_page_name');
    foreach ($fields as $field) {
        register_post_meta('post', $field, array(
            'show_in_rest' => true,
            'single' => true,
            'type' => 'string',
            'auth_callback' => '__return_true',
        ));
    }
}
add_action('init', 'toutefois_register_fb_meta_rest');

// Register custom page meta: splashes (CSV string) and expose via REST
function toutefois_register_splashes_meta()
{
    register_post_meta('page', 'splashes', array(
        'show_in_rest' => array(
            'schema' => array(
                'type' => 'string', // stored as CSV string e.g. "Splash1,Splash2"
            )
        ),
        'single' => true,
        'type' => 'string',
        'auth_callback' => function () {
            return current_user_can('edit_posts');
        }
    ));
}
add_action('init', 'toutefois_register_splashes_meta');

// Add a meta box to choose background splashes for pages
function toutefois_add_splashes_metabox()
{
    add_meta_box(
        'toutefois_splashes',
        __('Background Splashes', 'toutefois'),
        'toutefois_render_splashes_metabox',
        'page',
        'side',
        'default'
    );
}
add_action('add_meta_boxes', 'toutefois_add_splashes_metabox');

function toutefois_render_splashes_metabox($post)
{
    wp_nonce_field('toutefois_save_splashes', 'toutefois_splashes_nonce');
    $value = get_post_meta($post->ID, 'splashes', true);
    $selected = array_filter(array_map('trim', explode(',', (string)$value)));
    $options = array('Splash1', 'Splash2', 'Splash3');
    $starting_side = get_post_meta($post->ID, 'splashes_starting_side', true);
    if ($starting_side !== 'left' && $starting_side !== 'right') {
        $starting_side = '';
    }
    echo '<p>' . esc_html__('Choose and order decorative splashes. Checked items will render in the order shown.', 'toutefois') . '</p>';
    echo '<ul id="toutefois_splashes_list" style="list-style:none;margin:0;padding:0;">';
    // Ensure list shows selected items first in their saved order, then the rest
    $ordered = array_unique(array_merge($selected, $options));
    foreach ($ordered as $opt) {
        if (!in_array($opt, $options, true)) continue;
        $checked = in_array($opt, $selected, true) ? 'checked' : '';
        echo '<li style="display:flex;align-items:center;gap:.5rem;margin:.25rem 0;" data-name="' . esc_attr($opt) . '">';
        echo '<input type="checkbox" class="tfs-item" value="' . esc_attr($opt) . '" ' . $checked . ' /> ' . esc_html($opt);
        echo '<span style="margin-left:auto;display:inline-flex;gap:.25rem;">';
        echo '<button type="button" class="button tfs-up">' . esc_html__('Up', 'toutefois') . '</button>';
        echo '<button type="button" class="button tfs-down">' . esc_html__('Down', 'toutefois') . '</button>';
        echo '</span>';
        echo '</li>';
    }
    echo '</ul>';
    echo '<input type="hidden" id="toutefois_splashes_order" name="toutefois_splashes_order" value="' . esc_attr(implode(',', $selected)) . '" />';
    echo '<p style="margin-top:.75rem;">' . esc_html__('Starting side', 'toutefois') . '</p>';
    echo '<select name="toutefois_splashes_starting_side" style="width:100%">';
    echo '<option value="" ' . selected($starting_side, '', false) . '>' . esc_html__('Theme default', 'toutefois') . '</option>';
    echo '<option value="left" ' . selected($starting_side, 'left', false) . '>' . esc_html__('Left', 'toutefois') . '</option>';
    echo '<option value="right" ' . selected($starting_side, 'right', false) . '>' . esc_html__('Right', 'toutefois') . '</option>';
    echo '</select>';
    echo '<script>(function(){
      const list = document.getElementById("toutefois_splashes_list");
      const hidden = document.getElementById("toutefois_splashes_order");
      if(!list||!hidden) return;
      function updateHidden(){
        const items = Array.from(list.querySelectorAll("li"));
        const chosen = items
          .filter(li=>li.querySelector(".tfs-item").checked)
          .map(li=>li.getAttribute("data-name"));
        hidden.value = chosen.join(",");
      }
      list.addEventListener("click", function(e){
        const btn = e.target;
        if(!(btn instanceof HTMLButtonElement)) return;
        const li = btn.closest("li");
        if(!li) return;
        if(btn.classList.contains("tfs-up") && li.previousElementSibling){
          li.parentNode.insertBefore(li, li.previousElementSibling);
          updateHidden();
        }
        if(btn.classList.contains("tfs-down") && li.nextElementSibling){
          li.parentNode.insertBefore(li.nextElementSibling, li);
          updateHidden();
        }
      });
      list.addEventListener("change", function(e){
        if(e.target && e.target.classList.contains("tfs-item")) updateHidden();
      });
      updateHidden();
    })();</script>';
}

function toutefois_save_splashes_metabox($post_id)
{
    if (!isset($_POST['toutefois_splashes_nonce']) || !wp_verify_nonce($_POST['toutefois_splashes_nonce'], 'toutefois_save_splashes')) {
        return;
    }
    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
        return;
    }
    if (!current_user_can('edit_post', $post_id)) {
        return;
    }
    // Prefer ordered CSV from hidden field if present
    $ordered_csv = isset($_POST['toutefois_splashes_order']) ? sanitize_text_field((string)$_POST['toutefois_splashes_order']) : '';
    $ordered = array_filter(array_map('trim', explode(',', $ordered_csv)));
    $allowed = array('Splash1', 'Splash2', 'Splash3');
    // If not present, fallback to checkbox array order
    if (empty($ordered)) {
        $ordered = isset($_POST['toutefois_splashes']) && is_array($_POST['toutefois_splashes']) ? array_map('sanitize_text_field', (array)$_POST['toutefois_splashes']) : array();
    }
    // Sanitize and dedupe while preserving order
    $clean = array();
    foreach ($ordered as $o) {
        if (in_array($o, $allowed, true) && !in_array($o, $clean, true)) {
            $clean[] = $o;
        }
    }
    update_post_meta($post_id, 'splashes', implode(',', $clean));
    // Save starting side
    $side = isset($_POST['toutefois_splashes_starting_side']) ? sanitize_text_field((string)$_POST['toutefois_splashes_starting_side']) : '';
    if ($side !== 'left' && $side !== 'right') {
        $side = '';
    }
    update_post_meta($post_id, 'splashes_starting_side', $side);
}
add_action('save_post_page', 'toutefois_save_splashes_metabox');


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
        if (!empty($item->object_id)) {
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
        'https://admin.toutefois.ca',
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
add_action('init', 'toutefois_register_blocks', 20);

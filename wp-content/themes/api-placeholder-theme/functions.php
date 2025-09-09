<?php

/**
 * API Placeholder Theme functions and definitions
 *
 * @package API_Placeholder_Theme
 */

/**
 * Register custom theme colors for Gutenberg editor
 */

add_theme_support('menus');


function api_placeholder_theme_colors()
{
    add_theme_support('editor-color-palette', array(
        array(
            'name'  => __('Toutefois Red', 'api-placeholder-theme'),
            'slug'  => 'toutefois-red',
            'color' => '#862331',
        ),
        array(
            'name'  => __('Toutefois Purple', 'api-placeholder-theme'),
            'slug'  => 'toutefois-purple',
            'color' => '#5A3D55',
        ),
        array(
            'name'  => __('Toutefois Dark', 'api-placeholder-theme'),
            'slug'  => 'toutefois-dark',
            'color' => '#333333',
        ),
        array(
            'name'  => __('Toutefois Teal', 'api-placeholder-theme'),
            'slug'  => 'toutefois-teal',
            'color' => '#588B8B',
        ),
        array(
            'name'  => __('Toutefois Primary Text', 'api-placeholder-theme'),
            'slug'  => 'toutefois-primary-text',
            'color' => '#2F2C58',
        ),
        array(
            'name'  => __('Toutefois Secondary Text', 'api-placeholder-theme'),
            'slug'  => 'toutefois-secondary-text',
            'color' => '#6B1E2C',
        ),
        array(
            'name'  => __('Toutefois Light Text', 'api-placeholder-theme'),
            'slug'  => 'toutefois-light-text',
            'color' => '#F5F3EE',
        )
    ));
}
add_action('after_setup_theme', 'api_placeholder_theme_colors');

/**
 * Ensure proper REST API functionality
 */
function api_placeholder_theme_setup()
{
    // Make sure REST API is enabled
    add_filter('rest_enabled', '__return_true');
    add_filter('rest_jsonp_enabled', '__return_true');

    // Ensure proper REST URL
    add_filter('rest_url_prefix', function ($prefix) {
        return 'wp-json';
    });
}
add_action('after_setup_theme', 'api_placeholder_theme_setup');

/**
 * Register custom meta for Pages (MainColor and Preview Image)
 */
function api_placeholder_register_page_meta()
{
    // Main color as string, single value
    register_post_meta('page', 'main_color', array(
        'type' => 'string',
        'single' => true,
        'show_in_rest' => true,
        'sanitize_callback' => function ($value) {
            // Accept hex like #RRGGBB or #RGB, fallback to empty string
            if (is_string($value) && preg_match('/^#([A-Fa-f0-9]{3}|[A-Fa-f0-9]{6})$/', trim($value))) {
                return strtoupper(trim($value));
            }
            return '';
        },
        'auth_callback' => function () {
            return current_user_can('edit_posts');
        }
    ));

    // Preview image as attachment ID (integer)
    register_post_meta('page', 'preview_image_id', array(
        'type' => 'integer',
        'single' => true,
        'show_in_rest' => true,
        'sanitize_callback' => function ($value) {
            return intval($value);
        },
        'auth_callback' => function () {
            return current_user_can('edit_posts');
        }
    ));
}
add_action('init', 'api_placeholder_register_page_meta');

/**
 * Admin meta box to edit Page MainColor and Preview Image
 */
function api_placeholder_add_page_meta_box()
{
    add_meta_box(
        'api_placeholder_page_meta',
        __('Page Presentation', 'api-placeholder-theme'),
        'api_placeholder_render_page_meta_box',
        'page',
        'side',
        'default'
    );
}
add_action('add_meta_boxes', 'api_placeholder_add_page_meta_box');

function api_placeholder_render_page_meta_box($post)
{
    wp_nonce_field('api_placeholder_save_page_meta', 'api_placeholder_page_meta_nonce');
    $main_color = get_post_meta($post->ID, 'main_color', true);
    $preview_id = intval(get_post_meta($post->ID, 'preview_image_id', true));
    $preview_url = $preview_id ? wp_get_attachment_image_url($preview_id, 'medium') : '';
?>
    <p>
        <label for="api_placeholder_main_color"><strong><?php _e('Main Color (hex)', 'api-placeholder-theme'); ?></strong></label><br />
        <input type="text" id="api_placeholder_main_color" name="api_placeholder_main_color" value="<?php echo esc_attr($main_color); ?>" placeholder="#862331" style="width:100%;" />
    </p>
    <p>
        <label for="api_placeholder_preview_image_id"><strong><?php _e('Preview Image', 'api-placeholder-theme'); ?></strong></label><br />
        <input type="number" id="api_placeholder_preview_image_id" name="api_placeholder_preview_image_id" value="<?php echo esc_attr($preview_id); ?>" placeholder="<?php esc_attr_e('Attachment ID', 'api-placeholder-theme'); ?>" style="width:100%;" />
        <div style="margin-top:8px; display:flex; gap:8px;">
            <button type="button" class="button" id="api_placeholder_select_image"><?php _e('Select Image', 'api-placeholder-theme'); ?></button>
            <button type="button" class="button" id="api_placeholder_remove_image"><?php _e('Remove', 'api-placeholder-theme'); ?></button>
        </div>
        <br />
        <img id="api_placeholder_preview_image_preview" src="<?php echo esc_url($preview_url); ?>" alt="" style="max-width:100%;height:auto;margin-top:8px;border:1px solid #ddd; <?php echo $preview_url ? '' : 'display:none;'; ?>" />
        <small><?php _e('Use the button to choose an image from the Media Library, or enter an attachment ID. (Optional)', 'api-placeholder-theme'); ?></small>
    </p>
    <script type="text/javascript">
        jQuery(function ($) {
            var frame;
            var idInput = $('#api_placeholder_preview_image_id');
            var img = $('#api_placeholder_preview_image_preview');

            $('#api_placeholder_select_image').on('click', function (e) {
                e.preventDefault();
                if (frame) {
                    frame.open();
                    return;
                }
                frame = wp.media({
                    title: '<?php echo esc_js(__('Select or Upload Preview Image', 'api-placeholder-theme')); ?>',
                    button: { text: '<?php echo esc_js(__('Use this image', 'api-placeholder-theme')); ?>' },
                    library: { type: 'image' },
                    multiple: false
                });
                frame.on('select', function () {
                    var attachment = frame.state().get('selection').first().toJSON();
                    idInput.val(attachment.id);
                    var url = (attachment.sizes && (attachment.sizes.medium || attachment.sizes.full) ? (attachment.sizes.medium || attachment.sizes.full).url : attachment.url);
                    img.attr('src', url).show();
                });
                frame.open();
            });

            $('#api_placeholder_remove_image').on('click', function (e) {
                e.preventDefault();
                idInput.val('');
                img.attr('src', '').hide();
            });
        });
    </script>
<?php
}

function api_placeholder_save_page_meta($post_id)
{
    if (!isset($_POST['api_placeholder_page_meta_nonce']) || !wp_verify_nonce($_POST['api_placeholder_page_meta_nonce'], 'api_placeholder_save_page_meta')) {
        return;
    }
    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
        return;
    }
    if (!current_user_can('edit_post', $post_id)) {
        return;
    }

    if (isset($_POST['api_placeholder_main_color'])) {
        $val = sanitize_text_field($_POST['api_placeholder_main_color']);
        if (preg_match('/^#([A-Fa-f0-9]{3}|[A-Fa-f0-9]{6})$/', $val)) {
            update_post_meta($post_id, 'main_color', strtoupper($val));
        } else {
            delete_post_meta($post_id, 'main_color');
        }
    }

    if (isset($_POST['api_placeholder_preview_image_id'])) {
        $id = intval($_POST['api_placeholder_preview_image_id']);
        if ($id > 0) {
            update_post_meta($post_id, 'preview_image_id', $id);
        } else {
            delete_post_meta($post_id, 'preview_image_id');
        }
    }
}
add_action('save_post_page', 'api_placeholder_save_page_meta');

/**
 * Enqueue media scripts on Page edit screens
 */
function api_placeholder_admin_enqueue($hook)
{
    // Only load on post.php (edit) and post-new.php (add new)
    if ($hook !== 'post.php' && $hook !== 'post-new.php') {
        return;
    }
    $screen = get_current_screen();
    if ($screen && $screen->post_type === 'page') {
        wp_enqueue_media();
    }
}
add_action('admin_enqueue_scripts', 'api_placeholder_admin_enqueue');


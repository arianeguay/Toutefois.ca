<?php

/**
 * API Placeholder Theme functions and definitions
 * @package API_Placeholder_Theme
 */

// Basic theme supports
add_action('after_setup_theme', function () {
    // Core niceties
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('menus');
    add_theme_support('html5', ['search-form', 'comment-form', 'comment-list', 'gallery', 'caption', 'style', 'script']);

    // Block editor
    add_theme_support('wp-block-styles');
    add_theme_support('responsive-embeds');
    add_theme_support('align-wide');               // enables “Wide” + “Full width”
    add_theme_support('editor-styles');            // allow editor styles
    add_editor_style('editor.css');                // your editor stylesheet (already created)

    // Optional: let WP manage duotone, spacing, etc. via theme.json
    add_theme_support('custom-line-height');
    add_theme_support('custom-units');             // e.g. clamp, %, etc.
    add_theme_support('appearance-tools');         // border radius, spacing, etc. from theme.json
});

/**
 * Load editor-only assets (fonts) without leaking to front-end unnecessarily.
 * editor.css already @imports the Google Fonts, but this is a safer alternative if you prefer.
 */
add_action('enqueue_block_editor_assets', function () {
    // If you prefer: enqueue fonts here instead of @import in editor.css
    wp_enqueue_style('tfx-editor-fonts', 'https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap', [], null);
    wp_enqueue_style('tfx-editor-fonts-2', 'https://fonts.cdnfonts.com/css/gagalin', [], null);
});

/**
 * Keep your custom meta (Page: main_color, preview_image_id)
 */
function api_placeholder_register_page_meta()
{
    register_post_meta('page', 'main_color', [
        'type'              => 'string',
        'single'            => true,
        'show_in_rest'      => true,
        'sanitize_callback' => function ($value) {
            $value = trim((string)$value);
            return preg_match('/^#([A-Fa-f0-9]{3}|[A-Fa-f0-9]{6})$/', $value) ? strtoupper($value) : '';
        },
        'auth_callback'     => function () {
            return current_user_can('edit_posts');
        }
    ]);

    register_post_meta('page', 'preview_image_id', [
        'type'              => 'integer',
        'single'            => true,
        'show_in_rest'      => true,
        'sanitize_callback' => 'intval',
        'auth_callback'     => function () {
            return current_user_can('edit_posts');
        }
    ]);
}
add_action('init', 'api_placeholder_register_page_meta');

/**
 * Admin meta box for Page Presentation
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
    $preview_id = (int) get_post_meta($post->ID, 'preview_image_id', true);
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
    <script>
        jQuery(function($) {
            let frame;
            const idInput = $('#api_placeholder_preview_image_id');
            const img = $('#api_placeholder_preview_image_preview');

            $('#api_placeholder_select_image').on('click', function(e) {
                e.preventDefault();
                if (frame) return frame.open();
                frame = wp.media({
                    title: '<?php echo esc_js(__('Select or Upload Preview Image', 'api-placeholder-theme')); ?>',
                    button: {
                        text: '<?php echo esc_js(__('Use this image', 'api-placeholder-theme')); ?>'
                    },
                    library: {
                        type: 'image'
                    },
                    multiple: false
                });
                frame.on('select', function() {
                    const attachment = frame.state().get('selection').first().toJSON();
                    idInput.val(attachment.id);
                    const size = attachment.sizes && (attachment.sizes.medium || attachment.sizes.full);
                    img.attr('src', size ? size.url : attachment.url).show();
                });
                frame.open();
            });

            $('#api_placeholder_remove_image').on('click', function(e) {
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
    if (!isset($_POST['api_placeholder_page_meta_nonce']) || !wp_verify_nonce($_POST['api_placeholder_page_meta_nonce'], 'api_placeholder_save_page_meta')) return;
    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) return;
    if (!current_user_can('edit_post', $post_id)) return;

    if (isset($_POST['api_placeholder_main_color'])) {
        $val = sanitize_text_field($_POST['api_placeholder_main_color']);
        if (preg_match('/^#([A-Fa-f0-9]{3}|[A-Fa-f0-9]{6})$/', $val)) {
            update_post_meta($post_id, 'main_color', strtoupper($val));
        } else {
            delete_post_meta($post_id, 'main_color');
        }
    }

    if (isset($_POST['api_placeholder_preview_image_id'])) {
        $id = (int) $_POST['api_placeholder_preview_image_id'];
        if ($id > 0) update_post_meta($post_id, 'preview_image_id', $id);
        else delete_post_meta($post_id, 'preview_image_id');
    }
}
add_action('save_post_page', 'api_placeholder_save_page_meta');

/**
 * Enqueue media only on Page edit screens
 */
add_action('admin_enqueue_scripts', function ($hook) {
    if ($hook !== 'post.php' && $hook !== 'post-new.php') return;
    $screen = get_current_screen();
    if ($screen && $screen->post_type === 'page') {
        wp_enqueue_media();
    }
});

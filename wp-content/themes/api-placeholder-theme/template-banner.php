<?php
/**
 * Template Name: Banner Template
 * Description: A page template that starts with a banner block
 *
 * @package API_Placeholder_Theme
 */

get_header();

// Check if we're using the block editor
if (function_exists('has_blocks') && has_blocks()) {
    // If this is a block-enabled page, we'll let the content render normally
    // but we'll add a banner block at the top if it doesn't already have one
    
    $post_content = get_the_content();
    
    // Check if the content already contains a banner block
    $has_banner = strpos($post_content, '<!-- wp:toutefois/banner') !== false;
    
    if (!$has_banner) {
        // Create default banner attributes
        $default_banner = [
            'title' => get_the_title(),
            'description' => '',
            'verticalAlignment' => 'center',
            'horizontalAlignment' => 'center',
            'objectPosition' => '50% 50%',
            'textColor' => '#FFFFFF',
            'bigTextShadow' => false,
            'textShadowColor' => 'rgba(0,0,0,0.5)',
            'blurredBackground' => true,
            'template' => 'default',
        ];
        
        // Get featured image if available
        if (has_post_thumbnail()) {
            $featured_img_id = get_post_thumbnail_id();
            $featured_img_url = wp_get_attachment_image_url($featured_img_id, 'full');
            $default_banner['image'] = [
                'id' => $featured_img_id,
                'url' => $featured_img_url,
            ];
        }

        // Render the banner using the plugin's render function
        if (function_exists('render_block_toutefois_banner')) {
            echo render_block_toutefois_banner($default_banner, '');
        } else {
            // Fallback if the banner rendering function doesn't exist
            include_once(WP_PLUGIN_DIR . '/toutefois/src/banner/render.php');
            ?>
            <div class="wp-block-toutefois-banner">
                <?php
                // The render.php file from the plugin expects $attributes to be set
                $attributes = $default_banner;
                include(WP_PLUGIN_DIR . '/toutefois/src/banner/render.php');
                ?>
            </div>
            <?php
        }
    }
    
    // Now render the regular content
    ?>
    <div class="entry-content">
        <?php the_content(); ?>
    </div>
    <?php
} else {
    // For classic editor, we'll manually create a banner
    ?>
    <div class="wp-block-toutefois-banner">
        <?php
        // Set up default attributes for the banner
        $attributes = [
            'title' => get_the_title(),
            'description' => '',
            'verticalAlignment' => 'center',
            'horizontalAlignment' => 'center',
            'objectPosition' => '50% 50%',
            'textColor' => '#FFFFFF',
            'bigTextShadow' => false,
            'textShadowColor' => 'rgba(0,0,0,0.5)',
            'blurredBackground' => true,
            'template' => 'default',
        ];
        
        // Get featured image if available
        if (has_post_thumbnail()) {
            $featured_img_id = get_post_thumbnail_id();
            $featured_img_url = wp_get_attachment_image_url($featured_img_id, 'full');
            $attributes['image'] = [
                'id' => $featured_img_id,
                'url' => $featured_img_url,
            ];
        }
        
        // Include the banner render file
        include(WP_PLUGIN_DIR . '/toutefois/src/banner/render.php');
        ?>
    </div>
    
    <div class="entry-content">
        <?php the_content(); ?>
    </div>
    <?php
}

get_footer();

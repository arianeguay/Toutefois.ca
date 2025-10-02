<?php
/**
 * Template Name: Carousel Template
 * Description: A page template that features a carousel at the top
 *
 * @package API_Placeholder_Theme
 */

get_header();

// Check if we're using the block editor
if (function_exists('has_blocks') && has_blocks()) {
    // Check if the content already contains a featured carousel block
    $post_content = get_the_content();
    $has_carousel = strpos($post_content, '<!-- wp:toutefois/featured-carousel') !== false;
    
    if (!$has_carousel) {
        // Add a placeholder for the featured carousel if it doesn't exist in the content
        echo '<div class="wp-block-toutefois-featured-carousel"></div>';
    }
}
?>

<div class="entry-content">
    <?php the_content(); ?>
</div>

<?php
get_footer();
?>

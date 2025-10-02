<?php
/**
 * Template Name: Projects Template
 * Description: A page template for displaying projects with category rows
 *
 * @package API_Placeholder_Theme
 */

get_header();
?>

<div class="wp-block-toutefois-title-section">
    <div class="container">
        <h1 class="entry-title"><?php the_title(); ?></h1>
    </div>
</div>

<?php
// Check if we have any project categories
$project_categories = get_terms(array(
    'taxonomy' => 'project_category',
    'hide_empty' => true,
));

if (!is_wp_error($project_categories) && !empty($project_categories)) {
    foreach ($project_categories as $category) {
        // Output a projects row block for each category
        echo sprintf(
            '<div class="wp-block-toutefois-projects-category-row" data-category="%1$s" data-title="%2$s"></div>',
            esc_attr($category->term_id),
            esc_attr($category->name)
        );
    }
}
?>

<div class="entry-content">
    <?php the_content(); ?>
</div>

<?php
get_footer();
?>

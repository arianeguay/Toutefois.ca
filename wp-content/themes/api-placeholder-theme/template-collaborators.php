<?php
/**
 * Template Name: Collaborators Template
 * Description: A page template for showcasing team members or collaborators
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
// Default props for the collaborators block
$default_props = [
    'title' => '',
    'description' => '',
    'showFilters' => true,
    'layout' => 'grid',
    'columns' => 3
];

// Output the collaborators block
echo '<div class="toutefois-collaborators-block-react-root" data-props="' . esc_attr(json_encode($default_props)) . '"></div>';
?>

<div class="entry-content">
    <?php the_content(); ?>
</div>

<?php
get_footer();
?>

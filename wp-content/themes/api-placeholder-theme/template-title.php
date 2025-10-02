<?php
/**
 * Template Name: Title Template
 * Description: A page template that displays the title prominently at the top
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

<div class="entry-content">
    <?php the_content(); ?>
</div>

<?php
get_footer();
?>

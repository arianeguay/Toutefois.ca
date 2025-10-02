<?php
$featured_projects = get_featured_projects()->get_data();
$count = is_array($featured_projects) ? count($featured_projects) : 0;
$wrapper_attributes = get_block_wrapper_attributes([
    'class' => 'wp-block-toutefois-featured-carousel',
    'data-count' => (string) $count,
]);
?>
<div <?php echo $wrapper_attributes; ?>>
    <?php if (!empty($featured_projects)) : ?>
        <h2 class="toutefois-featured-carousel__heading">Featured Projects</h2>
        <div class="toutefois-featured-carousel__list">
            <?php foreach ($featured_projects as $project) : ?>
                <div class="toutefois-featured-carousel__item">
                    <h3 class="toutefois-featured-carousel__title"><?php echo esc_html($project['title']); ?></h3>
                    <?php if (!empty($project['featured_image_url'])) : ?>
                        <img class="toutefois-featured-carousel__image" src="<?php echo esc_url($project['featured_image_url']); ?>" alt="<?php echo esc_attr($project['title']); ?>">
                    <?php endif; ?>
                    <p class="toutefois-featured-carousel__excerpt"><?php echo esc_html($project['excerpt']); ?></p>
                </div>
            <?php endforeach; ?>
        </div>
    <?php else : ?>
        <p class="toutefois-featured-carousel__empty">No featured projects found.</p>
    <?php endif; ?>
</div>

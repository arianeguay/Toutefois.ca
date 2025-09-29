<?php
$featured_projects = get_featured_projects()->get_data();
$wrapper_attributes = get_block_wrapper_attributes();
?>
<div <?php echo $wrapper_attributes; ?>>
    <?php if (!empty($featured_projects)) : ?>
        <h2>Featured Projects</h2>
        <div class="featured-carousel-content">
            <?php foreach ($featured_projects as $project) : ?>
                <div>
                    <h3><?php echo esc_html($project['title']); ?></h3>
                    <?php if (!empty($project['featured_image_url'])) : ?>
                        <img src="<?php echo esc_url($project['featured_image_url']); ?>" alt="<?php echo esc_attr($project['title']); ?>">
                    <?php endif; ?>
                    <p><?php echo esc_html($project['excerpt']); ?></p>
                </div>
            <?php endforeach; ?>
        </div>
    <?php else : ?>
        <p>No featured projects found.</p>
    <?php endif; ?>
</div>

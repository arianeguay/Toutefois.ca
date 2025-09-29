<?php
$all_projects = get_all_projects()->get_data();

if (!empty($all_projects)) :
?>
    <div <?php echo get_block_wrapper_attributes(); ?>>
        <h2>All Projects</h2>
        <ul>
            <?php foreach ($all_projects as $project) : ?>
                <li>
                    <h3><?php echo esc_html($project['title']); ?></h3>
                    <?php if (!empty($project['featured_image_url'])) : ?>
                        <img src="<?php echo esc_url($project['featured_image_url']); ?>" alt="<?php echo esc_attr($project['title']); ?>">
                    <?php endif; ?>
                    <p><?php echo esc_html($project['excerpt']); ?></p>
                </li>
            <?php endforeach; ?>
        </ul>
    </div>
<?php
else :
?>
    <div <?php echo get_block_wrapper_attributes(); ?>>
        <p>No projects found.</p>
    </div>
<?php
endif;

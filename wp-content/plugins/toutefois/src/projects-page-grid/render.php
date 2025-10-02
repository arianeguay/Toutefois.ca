<?php
// Get current page from URL query, default to 1
$current_page = isset($_GET['paged']) ? max(1, intval($_GET['paged'])) : 1;

// Create a mock request to pass to our function
$request = new WP_REST_Request('GET', '/toutefois/v1/projects-grid');
$request->set_query_params(['page' => $current_page, 'per_page' => 9]);

$response = get_projects_for_grid($request);
$projects = $response->get_data();
$total_pages = $response->get_headers()['X-WP-TotalPages'];

if (!empty($projects)) :
    $wrapper_attributes = get_block_wrapper_attributes([
        'class' => 'wp-block-toutefois-projects-page-grid',
    ]);
?>
    <div <?php echo $wrapper_attributes; ?> >
        <ul class="projects-grid">
            <?php foreach ($projects as $project) : ?>
                <li class="project-item">
                    <h3><?php echo esc_html($project['title']); ?></h3>
                    <?php if (!empty($project['featured_image_url'])) : ?>
                        <img src="<?php echo esc_url($project['featured_image_url']); ?>" alt="<?php echo esc_attr($project['title']); ?>">
                    <?php endif; ?>
                    <div><?php echo wp_kses_post($project['excerpt']); ?></div>
                </li>
            <?php endforeach; ?>
        </ul>

        <div class="pagination">
            <?php if ($current_page > 1) : ?>
                <a href="<?php echo esc_url(add_query_arg('paged', $current_page - 1)); ?>">Previous</a>
            <?php endif; ?>

            <?php if ($current_page < $total_pages) : ?>
                <a href="<?php echo esc_url(add_query_arg('paged', $current_page + 1)); ?>">Next</a>
            <?php endif; ?>
        </div>
    </div>
<?php
else :
?>
    <div <?php echo get_block_wrapper_attributes(['class' => 'wp-block-toutefois-projects-page-grid']); ?>>
        <p>No projects found.</p>
    </div>
<?php
endif;

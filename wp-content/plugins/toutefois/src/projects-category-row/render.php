<?php
// Get current page from URL query, default to 1
$current_page = isset($_GET['paged']) ? max(1, intval($_GET['paged'])) : 1;

// Get category from attributes, which is required by the API.
$category = isset($attributes['category']) ? $attributes['category'] : '';

$title = isset($attributes['title']) ? $attributes['title'] : '';
// Optional background color hex chosen in editor
$background_color = isset($attributes['backgroundColor']) ? $attributes['backgroundColor'] : '';
// Create a mock request to pass to our function
$request = new WP_REST_Request('GET', '/toutefois/v1/projects-category-row');
$request->set_query_params([
    'page'     => $current_page,
    'per_page' => 9,
    'category' => $category
]);

$response = toutefois_get_projects_by_category($request);
$projects = $response->get_data();
$total_pages = $response->get_headers()['X-WP-TotalPages'];

if (!empty($projects)) :
?>
    <div <?php echo get_block_wrapper_attributes(); ?>
        data-title="<?php echo esc_attr($title); ?>"
        data-category="<?php echo esc_attr($category); ?>"
        data-background-color="<?php echo esc_attr($background_color); ?>">
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
    <div <?php echo get_block_wrapper_attributes(); ?>>
        <p>No projects found.</p>
    </div>
<?php
endif;

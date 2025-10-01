<?php

/**
 * Content Carousel Block Template.
 */

// Get attributes
$content_type = isset($attributes['contentType']) ? $attributes['contentType'] : 'mixed';
$title = isset($attributes['title']) ? $attributes['title'] : '';
$description = isset($attributes['description']) ? $attributes['description'] : '';
$view_all_url = isset($attributes['viewAllUrl']) ? $attributes['viewAllUrl'] : '';
$view_all_text = isset($attributes['viewAllText']) ? $attributes['viewAllText'] : '';
$limit = isset($attributes['limit']) ? intval($attributes['limit']) : 10;
$no_content_text = isset($attributes['noContentText']) ? $attributes['noContentText'] : 'No content found.';
// New attributes for news source selection
$news_source = isset($attributes['newsSource']) ? $attributes['newsSource'] : 'both';
$facebook_page_id = isset($attributes['facebookPageId']) ? $attributes['facebookPageId'] : '';


// Fetch content based on type
$items = array();

if ($content_type === 'project' || $content_type === 'mixed') {
    $projects = function_exists('get_all_projects') ? get_all_projects()->get_data() : array();
    $items = array_merge($items, $projects);
}

if ($content_type === 'news' || $content_type === 'mixed') {
    $news = function_exists('get_all_news') ? get_all_news()->get_data() : array();
    $items = array_merge($items, $news);
}

// Sort by date
usort($items, function ($a, $b) {
    $date_a = isset($a['date']) ? strtotime($a['date']) : 0;
    $date_b = isset($b['date']) ? strtotime($b['date']) : 0;
    return $date_b - $date_a;
});

// Apply limit
$items = array_slice($items, 0, $limit);

// Output HTML
if (!empty($items)) :
    // Generate one unique ID to use for both elements
    $unique_id = uniqid('cc-');
?>
    <div <?php echo get_block_wrapper_attributes(); ?>>
        <!-- This div will be used as a React mount point for the ContentCarousel component -->
        <div
            id="content-carousel-<?php echo $unique_id; ?>"
            class="content-carousel-block"
            data-content-type="<?php echo esc_attr($content_type); ?>"
            data-title="<?php echo esc_attr($title); ?>"
            data-description="<?php echo esc_attr($description); ?>"
            data-view-all-url="<?php echo esc_attr($view_all_url); ?>"
            data-view-all-text="<?php echo esc_attr($view_all_text); ?>"
            data-limit="<?php echo esc_attr($limit); ?>"
            data-no-content-text="<?php echo esc_attr($no_content_text); ?>"
            data-news-source="<?php echo esc_attr($news_source); ?>"
            data-facebook-page-id="<?php echo esc_attr($facebook_page_id); ?>">
            <!-- Fallback content for non-JS environments -->
            <h2><?php echo esc_html($title); ?></h2>
            <ul>
                <?php foreach ($items as $item) : ?>
                    <li>
                        <h3><?php echo esc_html($item['title']); ?></h3>
                        <?php if (!empty($item['featured_image_url'])) : ?>
                            <img src="<?php echo esc_url($item['featured_image_url']); ?>" alt="<?php echo esc_attr($item['title']); ?>">
                        <?php endif; ?>
                        <p><?php echo esc_html($item['excerpt']); ?></p>
                    </li>
                <?php endforeach; ?>
            </ul>
            <a href="<?php echo esc_url($view_all_url); ?>"><?php echo esc_html($view_all_text); ?></a>
        </div>
    </div>
<?php
else :
?>
    <div <?php echo get_block_wrapper_attributes(); ?>>
        <p><?php echo esc_html($no_content_text); ?></p>
    </div>
<?php
endif;

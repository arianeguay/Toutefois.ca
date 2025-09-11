<?php
/**
 * Content Carousel Block Template.
 */

// Get attributes
$content_type = isset($attributes['contentType']) ? $attributes['contentType'] : 'mixed';
$title = isset($attributes['title']) ? $attributes['title'] : '';
$view_all_url = isset($attributes['viewAllUrl']) ? $attributes['viewAllUrl'] : '';
$view_all_text = isset($attributes['viewAllText']) ? $attributes['viewAllText'] : '';
$limit = isset($attributes['limit']) ? intval($attributes['limit']) : 10;

// Set default values if empty
if (empty($title)) {
    if ($content_type === 'project') {
        $title = 'Nos projets';
    } elseif ($content_type === 'news') {
        $title = 'Quoi de neuf?';
    } else {
        $title = 'Contenu récent';
    }
}

if (empty($view_all_url)) {
    if ($content_type === 'project') {
        $view_all_url = '/projets';
    } elseif ($content_type === 'news') {
        $view_all_url = '/actualites';
    } else {
        $view_all_url = '/';
    }
}

if (empty($view_all_text)) {
    if ($content_type === 'project') {
        $view_all_text = 'Voir tous les projets';
    } elseif ($content_type === 'news') {
        $view_all_text = 'Voir tous les articles';
    } else {
        $view_all_text = 'Voir tout';
    }
}

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
usort($items, function($a, $b) {
    $date_a = isset($a['date']) ? strtotime($a['date']) : 0;
    $date_b = isset($b['date']) ? strtotime($b['date']) : 0;
    return $date_b - $date_a;
});

// Apply limit
$items = array_slice($items, 0, $limit);

// Output HTML
if (!empty($items)) :
?>
    <div <?php echo get_block_wrapper_attributes(); ?>>
        <!-- This div will be used as a React mount point for the ContentCarousel component -->
        <div 
            id="content-carousel-<?php echo uniqid(); ?>" 
            class="content-carousel-block"
            data-content-type="<?php echo esc_attr($content_type); ?>"
            data-title="<?php echo esc_attr($title); ?>"
            data-view-all-url="<?php echo esc_attr($view_all_url); ?>"
            data-view-all-text="<?php echo esc_attr($view_all_text); ?>"
            data-limit="<?php echo esc_attr($limit); ?>"
        >
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
        <p>No content found.</p>
    </div>
<?php
endif;

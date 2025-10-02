<?php

/**
 * Content Carousel Block Template.
 * 
 * Matches React components structure for consistent display in non-JS environments.
 */

// Safety check for escaping functions (for lint purposes)
if (!function_exists('esc_attr')) {
    function esc_attr($text) {
        return htmlspecialchars($text, ENT_QUOTES, 'UTF-8');
    }
}

if (!function_exists('esc_html')) {
    function esc_html($text) {
        return htmlspecialchars($text, ENT_QUOTES, 'UTF-8');
    }
}

if (!function_exists('esc_url')) {
    function esc_url($url) {
        return filter_var($url, FILTER_SANITIZE_URL);
    }
}

// Get attributes
$content_type = isset($attributes['contentType']) ? $attributes['contentType'] : 'mixed';
$title = isset($attributes['title']) ? $attributes['title'] : '';
$description = isset($attributes['description']) ? $attributes['description'] : '';
$view_all_url = isset($attributes['viewAllUrl']) ? $attributes['viewAllUrl'] : '';
$view_all_text = isset($attributes['viewAllText']) ? $attributes['viewAllText'] : '';
$limit = isset($attributes['limit']) ? intval($attributes['limit']) : 10;
$no_content_text = isset($attributes['noContentText']) ? $attributes['noContentText'] : 'No content found.';
// News source selection
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

// Get current date format for compatibility with dayjs formatting in React
function format_date_for_react($date_string) {
    if (empty($date_string)) return '';
    $timestamp = strtotime($date_string);
    if (!$timestamp) return '';
    
    // Format as "D MMMM YYYY" to match React's dayjs locale('fr') format
    // Use French month names
    $months = [
        'janvier', 'février', 'mars', 'avril', 'mai', 'juin',
        'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'
    ];
    $day = date('j', $timestamp);
    $month = $months[date('n', $timestamp) - 1];
    $year = date('Y', $timestamp);
    
    return $day . ' ' . $month . ' ' . $year;
}

// Function to determine content type similar to the React component
function get_item_type($item, $content_type) {
    if (isset($item['type']) && $item['type'] === 'facebook') {
        return 'facebook';
    }
    
    // If specific content type is set
    if ($content_type === 'project' || $content_type === 'news') {
        return $content_type;
    }
    
    // For mixed content
    if (isset($item['type']) && $item['type'] === 'wordpress') {
        return 'news';
    }
    
    // Default to project
    return 'project';
}

// Output HTML
if (!empty($items)) :
    // Generate one unique ID
    $unique_id = uniqid('cc-');
?>
    <div <?php echo get_block_wrapper_attributes(array('class' => 'toutefois-content-carousel-block')); ?>>
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
            
            <!-- Fallback content matching React structure -->
            <div class="content-list-header">
                <?php if (!empty($title)) : ?>
                <h2 class="content-carousel-title"><?php echo esc_html($title); ?></h2>
                <?php endif; ?>
                
                <?php if (!empty($description)) : ?>
                <p class="content-carousel-description"><?php echo esc_html($description); ?></p>
                <?php endif; ?>
            </div>
            
            <!-- Swiper-like container -->
            <div class="content-carousel-swiper">
                <div class="content-carousel-slides">
                    <?php foreach ($items as $item) : 
                        $item_type = get_item_type($item, $content_type);
                        $item_date = format_date_for_react($item['date'] ?? '');
                        $permalink = '';
                        $permalink_type = 'internal';
                        
                        if ($item_type === 'facebook') {
                            $permalink = $item['permalink_url'] ?? '';
                            $permalink_type = 'external';
                        } elseif ($item_type === 'project') {
                            $permalink = '/projets/' . ($item['slug'] ?? '');
                        } elseif ($item_type === 'news') {
                            $permalink = '/actualites/' . ($item['slug'] ?? '');
                        }
                    ?>
                    <div class="content-card-slide">
                        <!-- Card container based on type -->
                        <div class="content-card-container <?php echo esc_attr($item_type); ?>-card">
                            <!-- Link wrapper -->
                            <<?php echo $permalink_type === 'external' ? 'a href="'.esc_url($permalink).'" target="_blank" rel="noopener noreferrer"' : 'a href="'.esc_url($permalink).'"'; ?> class="content-card-link">
                                <!-- Card Cover -->
                                <div class="content-card-cover">
                                    <?php if (!empty($item['featured_image_url'] ?? $item['picture'] ?? '')) : ?>
                                    <img 
                                        class="content-card-image" 
                                        src="<?php echo esc_url($item['featured_image_url'] ?? $item['picture'] ?? ''); ?>" 
                                        alt="<?php echo esc_attr($item['title'] ?? $item['message'] ?? ''); ?>"
                                        onerror="this.src='/Logo.png'; this.style.objectFit='contain';"
                                    >
                                    <?php endif; ?>
                                </div>
                                
                                <!-- Card Content -->
                                <div class="content-card-content <?php echo esc_attr($item_type); ?>-content">
                                    <div class="content-body-content">
                                        <div class="content-body-heading">
                                            <?php if (!empty($item_date)) : ?>
                                            <p class="content-card-date"><?php echo esc_html($item_date); ?></p>
                                            <?php endif; ?>
                                            
                                            <h3 class="content-card-title"><?php echo esc_html($item['title'] ?? $item['message'] ?? ''); ?></h3>
                                        </div>
                                        
                                        <?php if (!empty($item['excerpt'] ?? $item['message'] ?? '')) : ?>
                                        <div class="content-body-description">
                                            <p><?php echo esc_html($item['excerpt'] ?? $item['message'] ?? ''); ?></p>
                                        </div>
                                        <?php endif; ?>
                                    </div>
                                    
                                    <!-- Card action button -->
                                    <div class="content-card-button">
                                        <button class="btn btn-tertiary btn-sm">En savoir plus</button>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                    <?php endforeach; ?>
                </div>
                
                <!-- Navigation buttons -->
                <div class="content-carousel-navigation">
                    <button class="carousel-prev">Précédent</button>
                    <button class="carousel-next">Suivant</button>
                </div>
            </div>
            
            <!-- View all button -->
            <?php if (!empty($view_all_url)) : ?>
            <div class="content-carousel-footer">
                <a href="<?php echo esc_url($view_all_url); ?>" class="btn btn-primary btn-lg">
                    <?php echo esc_html($view_all_text ?: 'Voir tout'); ?>
                </a>
            </div>
            <?php endif; ?>
        </div>
    </div>
<?php
else :
?>
    <div <?php echo get_block_wrapper_attributes(); ?>>
        <p class="content-carousel-empty"><?php echo esc_html($no_content_text); ?></p>
    </div>
<?php
endif;

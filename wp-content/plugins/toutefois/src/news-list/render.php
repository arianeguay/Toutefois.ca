<?php
$all_news = get_all_news()->get_data();

if (!empty($all_news)) :
    $wrapper_attributes = get_block_wrapper_attributes([
        'class' => 'wp-block-toutefois-news-list',
    ]);
?>
    <div <?php echo $wrapper_attributes; ?>>
        <h2 class="toutefois-news-list__title">News</h2>
        <ul class="news-grid">
            <?php foreach ($all_news as $news_item) : ?>
                <li class="news-item">
                    <h3><?php echo esc_html($news_item['title']); ?></h3>
                    <?php if (!empty($news_item['featured_image_url'])) : ?>
                        <img src="<?php echo esc_url($news_item['featured_image_url']); ?>" alt="<?php echo esc_attr($news_item['title']); ?>">
                    <?php endif; ?>
                    <p><?php echo esc_html($news_item['excerpt']); ?></p>
                </li>
            <?php endforeach; ?>
        </ul>
    </div>
<?php
else :
?>
    <div <?php echo get_block_wrapper_attributes(['class' => 'wp-block-toutefois-news-list']); ?>>
        <p>No news found.</p>
    </div>
<?php
endif;

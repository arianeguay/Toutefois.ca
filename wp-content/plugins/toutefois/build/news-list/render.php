<?php
$all_news = get_all_news()->get_data();

if (!empty($all_news)) :
?>
    <div <?php echo get_block_wrapper_attributes(); ?>>
        <h2>News</h2>
        <ul>
            <?php foreach ($all_news as $news_item) : ?>
                <li>
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
    <div <?php echo get_block_wrapper_attributes(); ?>>
        <p>No news found.</p>
    </div>
<?php
endif;

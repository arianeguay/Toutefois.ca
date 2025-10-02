<?php
$all_projects = get_all_projects()->get_data();

$src = isset($attributes['src']) ? $attributes['src'] : '';
$height = isset($attributes['height']) ? (int) $attributes['height'] : 1200;
if (!empty($all_projects)) :
    $wrapper_attributes = get_block_wrapper_attributes([
        'class' => 'wp-block-toutefois-zeffy',
        'data-height' => (string) $height,
    ]);
?>
    <div <?php echo $wrapper_attributes; ?>>
        <div class="toutefois-zeffy__frame" style="position: relative; width: 100%; min-height: <?php echo $height; ?>px; display: flex;">
            <iframe
                title="Zeffy Shop"
                src="<?php echo esc_url($src); ?>"
                style="width: 100%; height: auto; border: 0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade" />
        </div>
    </div>
<?php
endif;

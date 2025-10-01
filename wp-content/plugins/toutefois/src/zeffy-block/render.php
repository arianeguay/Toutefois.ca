<?php
$all_projects = get_all_projects()->get_data();

$src = isset($attributes['src']) ? $attributes['src'] : '';
$height = isset($attributes['height']) ? $attributes['height'] : 1200;
if (!empty($all_projects)) :
?>
    <div <?php echo get_block_wrapper_attributes(); ?>>
        <div style="position: relative; width: 100%; min-height: <?php echo $height; ?>px; display: flex;">
            <iframe
                title="Zeffy Shop"
                src="<?php echo $src; ?>"
                style="width: 100%; height: auto; border: 0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade" />
        </div>
    </div>
<?php
endif;

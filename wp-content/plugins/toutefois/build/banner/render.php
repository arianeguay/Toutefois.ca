<?php
/**
 * Banner Block
 *
 * @package Toutefois
 * @since 0.1.0
 */

$title = isset($attributes['title']) ? $attributes['title'] : '';
$description = isset($attributes['description']) ? $attributes['description'] : '';
$image = isset($attributes['image']) ? $attributes['image'] : null;
$font = isset($attributes['font']) ? $attributes['font'] : 'Poppins';
$vertical_alignment = isset($attributes['verticalAlignment']) ? $attributes['verticalAlignment'] : 'center';
$horizontal_alignment = isset($attributes['horizontalAlignment']) ? $attributes['horizontalAlignment'] : 'center';
$full_width = isset($attributes['fullWidth']) ? $attributes['fullWidth'] : true;

$wrapper_attributes = get_block_wrapper_attributes([
    'data-title' => esc_attr($title),
    'data-description' => esc_attr($description),
    'data-image' => esc_url($image ? $image['url'] : ''),
    'data-font' => esc_attr($font),
    'data-vertical-alignment' => esc_attr($vertical_alignment),
    'data-horizontal-alignment' => esc_attr($horizontal_alignment),
    'data-full-width' => esc_attr($full_width ? 'true' : 'false'),
]);

?>

<div <?php echo $wrapper_attributes; ?>>
    <?php if ($title) : ?>
        <h2><?php echo esc_html($title); ?></h2>
    <?php endif; ?>
    <?php if ($description) : ?>
        <p><?php echo esc_html($description); ?></p>
    <?php endif; ?>
</div>

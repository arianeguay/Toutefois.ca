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
$object_position = isset($attributes['objectPosition']) ? $attributes['objectPosition'] : '50% 50%';
$text_color = isset($attributes['textColor']) ? $attributes['textColor'] : '#FFFFFF';
$big_text_shadow = isset($attributes['bigTextShadow']) ? $attributes['bigTextShadow'] : false;
$text_shadow_color = isset($attributes['textShadowColor']) ? $attributes['textShadowColor'] : 'rgba(0,0,0,0.5)';

// Build inline styles for the container
$container_styles = [
    'position: relative',
    'height: 300px',
    'width: 100%',
];
if ($image && !empty($image['url'])) {
    $container_styles[] = 'background-image: url(' . esc_url($image['url']) . ')';
    $container_styles[] = 'background-size: cover';
    $container_styles[] = 'background-position: ' . esc_attr($object_position);
} else {
    $container_styles[] = 'background-color: #f0f0f0';
    $container_styles[] = 'border: 1px dashed #ccc';
}

// Build inline styles for the content wrapper
$content_styles = [
    'position: absolute',
    'top: 0', 'left: 0', 'right: 0', 'bottom: 0',
    'display: flex',
    'flex-direction: column',
    'align-items: ' . esc_attr($horizontal_alignment),
    'justify-content: ' . esc_attr($vertical_alignment),
    'text-align: ' . (esc_attr($horizontal_alignment) === 'flex-start' ? 'left' : (esc_attr($horizontal_alignment) === 'flex-end' ? 'right' : 'center')),
    'font-family: ' . esc_attr($font) . ', sans-serif',
    'color: ' . esc_attr($text_color),
    'text-shadow: ' . ($big_text_shadow ? '3px 3px 6px ' . esc_attr($text_shadow_color) : '1px 1px 3px ' . esc_attr($text_shadow_color)),
    'padding: 1rem',
];

$wrapper_attributes = get_block_wrapper_attributes([
    'style' => implode('; ', $container_styles),
]);

?>

<div <?php echo $wrapper_attributes; ?>>
    <div style="<?php echo implode('; ', $content_styles); ?>">
        <?php if ($title) : ?>
            <h2><?php echo esc_html($title); ?></h2>
        <?php endif; ?>
        <?php if ($description) : ?>
            <p><?php echo esc_html($description); ?></p>
        <?php endif; ?>
    </div>
</div>

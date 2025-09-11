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

// Build inline styles for the container
$container_styles = [
    'position: relative',
    'height: 300px',
    'width: ' . ($full_width ? '100%' : 'auto'),
    'margin: ' . ($full_width ? '0' : '0 2rem'),
];
if ($image && !empty($image['url'])) {
    $container_styles[] = 'background-image: url(' . esc_url($image['url']) . ')';
    $container_styles[] = 'background-size: cover';
    $container_styles[] = 'background-position: center';
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
    'color: white',
    'text-shadow: 1px 1px 3px rgba(0,0,0,0.5)',
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

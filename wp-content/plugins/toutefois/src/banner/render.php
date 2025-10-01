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
$blurred_background = isset($attributes['blurredBackground']) ? $attributes['blurredBackground'] : true;

// Build inline styles for the container
$container_styles = [
    'position: relative',
    'height: 350px',
    'width: 100%',
    'margin-bottom:24px',
];


$image_style = [
    'width: 100%',
    'height: 100%',
];

if ($image && !empty($image['url'])) {
    $image_style[] = 'background-image: url(' . esc_url($image['url']) . ')';
    $image_style[] = 'background-size: cover';
    $image_style[] = 'background-position: ' . esc_attr($object_position);
    if ($blurred_background) {
        $image_style[] = 'filter: blur(4px)';
    }
} else {
    $image_style[] = 'background-color: #f0f0f0';
    $image_style[] = 'border: 1px dashed #ccc';
}

// Build inline styles for the content wrapper
$content_styles = [
    'position: absolute',
    'top: 0',
    'left: 0',
    'right: 0',
    'bottom: 0',
    'padding: 16px',
];

$body_style = [
    'max-width: 1200px',
    'margin-inline: auto',
    'width: 100%',
    'height: 100%',
    'display: flex',
    'flex-direction: column',
    'align-items: ' . esc_attr($horizontal_alignment),
    'justify-content: ' . esc_attr($vertical_alignment),
    'text-align: ' . (esc_attr($horizontal_alignment) === 'flex-start' ? 'left' : (esc_attr($horizontal_alignment) === 'flex-end' ? 'right' : 'center')),
    'color: ' . esc_attr($text_color),
];

$template = $attributes['template'] ?? 'default';
// Expose alignment and blur as data-attributes for theme CSS to hook into
$wrapper_attributes = get_block_wrapper_attributes([
    'data-template' => $template,
    'data-va' => $vertical_alignment,
    'data-ha' => $horizontal_alignment,
    'data-blurred' => $blurred_background ? '1' : '0',
    'style' => implode('; ', $container_styles),
]);

$heading_style = [
    'width: fit-content',
    'font-family: ' . esc_attr($font) . ', sans-serif',
    'text-shadow: ' . ($big_text_shadow ? '4px 3px 0px ' . esc_attr($text_shadow_color) : '1px 1px 3px ' . esc_attr($text_shadow_color)),
    'margin: 0',
];

?>

<div <?php echo $wrapper_attributes; ?>>
    <div class="toutefois-banner__bg" style="<?php echo implode('; ', $image_style); ?>"></div>
    <div class="toutefois-banner__content" style="<?php echo implode('; ', $content_styles); ?>">
        <div class="toutefois-banner__body" style="<?php echo implode('; ', $body_style); ?>">
            <?php if ($title) : ?>
                <h1 class="toutefois-banner__title" style="<?php echo implode('; ', $heading_style); ?>"><?php echo esc_html($title); ?></h1>
            <?php endif; ?>
            <?php if ($description) : ?>
                <p class="toutefois-banner__description" style="width: fit-content"><?php echo esc_html($description); ?></p>
            <?php endif; ?>
        </div>
    </div>
</div>
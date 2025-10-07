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
$blurred_background = isset($attributes['blurredBackground']) ? $attributes['blurredBackground'] : false;
$height = isset($attributes['height']) ? $attributes['height'] : '350px';
$height_unit = isset($attributes['heightUnit']) ? $attributes['heightUnit'] : 'px';
// New background settings
$background_mode = isset($attributes['backgroundMode']) ? $attributes['backgroundMode'] : 'image';
$background_color = isset($attributes['backgroundColor']) ? $attributes['backgroundColor'] : '#f0f0f0';
$background_svg = isset($attributes['backgroundSvg']) ? $attributes['backgroundSvg'] : '';
$background_svg_color = isset($attributes['backgroundSvgColor']) ? $attributes['backgroundSvgColor'] : '#FFFFFF';

// Build inline styles for the container
$container_styles = [
    'position: relative',
    'height: ' . esc_attr($height),
    'width: 100%',
];


$image_style = [
    'width: 100%',
    'height: 100%',
];

// Determine background rendering based on mode
if ($background_mode === 'image') {
    if ($image && !empty($image['url'])) {
        $image_style[] = 'background-image: url(' . esc_url($image['url']) . ')';
        $image_style[] = 'background-size: cover';
        $image_style[] = 'background-position: ' . esc_attr($object_position);
        if ($blurred_background) {
            $image_style[] = 'filter: blur(4px)';
        }
    } else {
        // Fallback if no image
        $image_style[] = 'background-color: ' . esc_attr($background_color);
        $image_style[] = 'border: 1px dashed #ccc';
    }
} elseif ($background_mode === 'color') {
    $image_style[] = 'background-color: ' . esc_attr($background_color);
} elseif ($background_mode === 'svg') {
    // Base color behind the SVG if provided
    $image_style[] = 'position: relative';
    $image_style[] = 'background-color: ' . esc_attr($background_color);
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
    'data-height' => $height,
    'data-height-unit' => $height_unit,
    'data-background-mode' => $background_mode,
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
    <div class="toutefois-banner__bg" style="<?php echo esc_attr(implode('; ', $image_style)); ?>">
        <?php if ($background_mode === 'svg' && !empty($background_svg)) : ?>
            <div class="toutefois-banner__bg-svg" style="position:absolute; inset:0;  bottom: -20; right: -30; color: <?php echo esc_attr($background_svg_color); ?>;">
                <?php
                // Allow only safe SVG tags/attributes
                $allowed_svg = [
                    'svg' => [
                        'xmlns' => true,
                        'viewBox' => true,
                        'view-box' => true,
                        'width' => true,
                        'height' => true,
                        'preserveAspectRatio' => true,
                        'preserve-aspect-ratio' => true,
                        'style' => true,
                        'fill' => true,
                        'stroke' => true,
                        'stroke-width' => true,
                    ],
                    'path' => [
                        'd' => true,
                        'fill' => true,
                        'stroke' => true,
                        'stroke-width' => true,
                    ],
                    'rect' => [
                        'x' => true,
                        'y' => true,
                        'width' => true,
                        'height' => true,
                        'rx' => true,
                        'ry' => true,
                        'fill' => true,
                        'stroke' => true,
                        'stroke-width' => true,
                    ],
                    'circle' => [
                        'cx' => true,
                        'cy' => true,
                        'r' => true,
                        'fill' => true,
                        'stroke' => true,
                        'stroke-width' => true,
                    ],
                    'g' => [
                        'fill' => true,
                        'stroke' => true,
                        'stroke-width' => true,
                        'opacity' => true,
                    ],
                    'polygon' => [
                        'points' => true,
                        'fill' => true,
                        'stroke' => true,
                        'stroke-width' => true,
                    ],
                    'polyline' => [
                        'points' => true,
                        'fill' => true,
                        'stroke' => true,
                        'stroke-width' => true,
                    ],
                ];
                echo wp_kses($background_svg, $allowed_svg);
                ?>
            </div>
        <?php endif; ?>
    </div>
    <div class="toutefois-banner__content" style="<?php echo esc_attr(implode('; ', $content_styles)); ?>">
        <div class="toutefois-banner__body" style="<?php echo esc_attr(implode('; ', $body_style)); ?>">
            <?php if ($title) : ?>
                <h1 class="toutefois-banner__title" style="<?php echo implode('; ', $heading_style); ?>"><?php echo esc_html($title); ?></h1>
            <?php endif; ?>
            <?php if ($description) : ?>
                <p class="toutefois-banner__description" style="width: fit-content"><?php echo esc_html($description); ?></p>
            <?php endif; ?>
        </div>
    </div>
</div>
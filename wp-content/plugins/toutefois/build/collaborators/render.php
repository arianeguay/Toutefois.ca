<?php
/**
 * Collaborators Block Template.
 */

$layout = isset($attributes['layout']) ? $attributes['layout'] : 'vertical';

$args = [
    'post_type' => 'collaborateur',
    'posts_per_page' => -1,
    'orderby' => 'title',
    'order' => 'ASC',
];

$query = new WP_Query($args);

$collaborators_data = [];
if ($query->have_posts()) {
    while ($query->have_posts()) {
        $query->the_post();
        $post_id = get_the_ID();
        $featured_image_url = get_the_post_thumbnail_url($post_id, 'medium_large');

        $collaborators_data[] = [
            'id' => $post_id,
            'name' => get_the_title(),
            'position' => get_post_meta($post_id, '_collaborateur_poste', true),
            'excerpt' => get_the_excerpt(),
            'photoUrl' => $featured_image_url ? $featured_image_url : '',
            'link' => get_permalink(),
        ];
    }
}

wp_reset_postdata();

$data_attributes = [
    'layout' => $layout,
    'collaborators' => $collaborators_data,
];

$wrapper_attributes = get_block_wrapper_attributes();

echo sprintf(
    '<div %1$s>\n    <div class="toutefois-collaborators-block-react-root" data-props=\'%2$s\'></div>\n</div>',
    $wrapper_attributes,
    esc_attr(wp_json_encode($data_attributes))
);

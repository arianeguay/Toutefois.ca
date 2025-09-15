<?php

/**
 * Collaborators Block Template.
 */

$layout = $attributes['layout'] ?? 'vertical';
$member_status = $attributes['memberStatus'] ?? 'all';
$no_collaborators_text = $attributes['noCollaboratorsText'] ?? 'No collaborators to display.';

$args = [
    'post_type' => 'collaborateur',
    'posts_per_page' => -1,
    'orderby' => [
        'menu_order' => 'ASC',
        'title'      => 'ASC',
    ],
];

if ($member_status === 'members') {
    $args['meta_query'] = [
        [
            'key' => '_collaborateur_is_member',
            'value' => true,
            'compare' => '=',
        ],
    ];
} elseif ($member_status === 'non-members') {
    $args['meta_query'] = [
        'relation' => 'OR',
        [
            'key' => '_collaborateur_is_member',
            'value' => false,
            'compare' => '=',
        ],
        [
            'key' => '_collaborateur_is_member',
            'compare' => 'NOT EXISTS',
        ],
    ];
}

$query = new WP_Query($args);

$collaborators_data = [];
if ($query->have_posts()) {
    while ($query->have_posts()) {
        $query->the_post();
        $post_id = get_the_ID();
        $featured_image_url = get_the_post_thumbnail_url($post_id, 'medium_large');
        $slug = get_post_field('post_name', $post_id);
        $collaborators_data[] = [
            'id' => $post_id,
            'name' => get_the_title(),
            'position' => get_post_meta($post_id, '_collaborateur_poste', true),
            'excerpt' => get_the_content(),
            'photoUrl' => $featured_image_url ? $featured_image_url : '',
            'link' => "/collaborateurs/" . $slug,
        ];
    }
}

wp_reset_postdata();

$data_attributes = [
    'layout' => $layout,
    'collaborators' => $collaborators_data,
    'memberStatus' => $member_status,
    'noCollaboratorsText' => $no_collaborators_text,
];

$wrapper_attributes = get_block_wrapper_attributes();

echo sprintf(
    '<div %1$s><div class="toutefois-collaborators-block-react-root" data-props=\'%2$s\'></div></div>',
    $wrapper_attributes,
    esc_attr(wp_json_encode($data_attributes))
);

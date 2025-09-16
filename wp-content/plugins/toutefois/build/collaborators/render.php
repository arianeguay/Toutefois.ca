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

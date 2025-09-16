<?php

/**
 * Collaborators Block Template.
 */

$layout = $attributes['layout'] ?? 'vertical';
$member_status = $attributes['memberStatus'] ?? 'all';
$no_collaborators_text = $attributes['noCollaboratorsText'] ?? 'No collaborators to display.';



$data_attributes = [
    'layout' => $layout,
    'memberStatus' => $member_status,
    'noCollaboratorsText' => $no_collaborators_text,
];

$wrapper_attributes = get_block_wrapper_attributes();
echo sprintf(
    '<div %1$s><div class="toutefois-collaborators-block-react-root" data-props=\'%2$s\'></div></div>',
    $wrapper_attributes,
    esc_attr(wp_json_encode($data_attributes))
);

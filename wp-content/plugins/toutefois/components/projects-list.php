<?php
/**
 * Projects List Component
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit; // Exit if accessed directly.
}

// 1. Register REST Route
add_action('rest_api_init', function () {
    register_rest_route('toutefois/v1', '/projects', array(
        'methods' => 'GET',
        'callback' => 'get_all_projects',
        'permission_callback' => '__return_true' // Make public
    ));
});

// 2. Callback Function
function get_all_projects() {
    $args = array(
        'post_type' => 'projet',
        'posts_per_page' => -1,
    );

    $query = new WP_Query($args);
    $posts = array();

    if ($query->have_posts()) {
        while ($query->have_posts()) {
            $query->the_post();
            $post_id = get_the_ID();
            $post_meta = get_post_meta($post_id);
            $featured_image_id = get_post_thumbnail_id($post_id);
            $featured_image_url = get_the_post_thumbnail_url($post_id, 'full');

            $posts[] = array(
                'id' => $post_id,
                'title' => get_the_title(),
                'excerpt' => get_the_excerpt(),
                'content' => get_the_content(),
                'meta' => $post_meta,
                'featured_image_url' => $featured_image_url
            );
        }
        wp_reset_postdata();
    }

    return new WP_REST_Response($posts, 200);
}

<?php

/**
 * Projects Page Grid Component
 */

if (! defined('ABSPATH')) {
    exit; // Exit if accessed directly.
}

// 1. Register REST Route
add_action('rest_api_init', function () {
    register_rest_route('toutefois/v1', '/projects-grid', array(
        'methods' => 'GET',
        'callback' => 'get_projects_for_grid',
        'permission_callback' => '__return_true', // Make public
        'args' => array(
            'page' => array(
                'validate_callback' => function ($param, $request, $key) {
                    return is_numeric($param);
                }
            ),
            'per_page' => array(
                'validate_callback' => function ($param, $request, $key) {
                    return is_numeric($param);
                }
            ),
        ),
    ));
});

// 2. Callback Function
function get_projects_for_grid($request)
{
    $page = $request->get_param('page') ? (int)$request->get_param('page') : 1;
    $per_page = $request->get_param('per_page') ? (int)$request->get_param('per_page') : 9;

    $args = array(
        'post_type' => 'projet',
        'posts_per_page' => $per_page,
        'paged' => $page,
    );

    $query = new WP_Query($args);
    $posts = array();

    if ($query->have_posts()) {
        while ($query->have_posts()) {
            $query->the_post();
            $post_id = get_the_ID();
            $post_meta = get_post_meta($post_id);

            $slug = get_post_field('post_name', $post_id);
            $featured_image_url = get_the_post_thumbnail_url($post_id, 'large');
            $image_id = get_post_meta($post_id, '_projet_image_id', true);
            $image_url = wp_get_attachment_image_url($image_id, 'large');


            $posts[] = array(
                'id' => $post_id,
                'title' => get_the_title(),
                'slug' => $slug,
                'excerpt' => get_the_excerpt(),
                'content' => get_the_content(),
                'meta' => $post_meta,
                'featured_image_url' => $image_url
            );
        }
    }

    $total_posts = $query->found_posts;
    $total_pages = $query->max_num_pages;

    wp_reset_postdata();

    $response = new WP_REST_Response($posts, 200);
    $response->header('X-WP-Total', $total_posts);
    $response->header('X-WP-TotalPages', $total_pages);

    return $response;
}

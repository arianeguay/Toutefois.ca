<?php

/**
 * News List Component
 */

if (! defined('ABSPATH')) {
    exit; // Exit if accessed directly.
}

// 1. Register REST Route
add_action('rest_api_init', function () {
    register_rest_route('toutefois/v1', '/news', array(
        'methods' => 'GET',
        'callback' => 'get_all_news',
        'permission_callback' => '__return_true', // Make public
        'args' => array(
            'main_project' => array(
                'description' => 'Filter posts associated to a main project (ID or slug). Uses _main_project_id meta.',
                'type'        => 'string',
                'required'    => false,
            ),
        )
    ));
});

// 2. Callback Function
function get_all_news(?WP_REST_Request $request = null)
{
    $args = array(
        'post_type' => 'post',
        'posts_per_page' => 6,
        'order' => 'DESC',
        'orderby' => 'date',
    );

    $main_param = null;
    if ($request instanceof WP_REST_Request) {
        $main_param = $request->get_param('main_project');
    }
    if ($main_param) {
        if (function_exists('toutefois_resolve_main_project_id')) {
            $main_id = toutefois_resolve_main_project_id($main_param);
        } else {
            $main_id = ctype_digit((string)$main_param) ? (int)$main_param : 0;
        }
        if ($main_id > 0) {
            $args['meta_query'] = array(
                array(
                    'key'     => '_main_project_id',
                    'value'   => (string)$main_id,
                    'compare' => '=',
                )
            );
        }
    }

    $query = new WP_Query($args);
    $posts = array();

    if ($query->have_posts()) {
        while ($query->have_posts()) {
            $query->the_post();
            $post_id = get_the_ID();
            $post_meta = get_post_meta($post_id);
            $featured_image_url = get_the_post_thumbnail_url($post_id, 'full');

            $date = get_the_date();

            $posts[] = array(
                'id' => $post_id,
                'title' => get_the_title(),
                'excerpt' => get_the_excerpt(),
                'content' => get_the_content(),
                'slug' => get_post_field('post_name', $post_id),
                'date' => $date,
                'meta' => $post_meta,
                'featured_image_url' => $featured_image_url
            );
        }
        wp_reset_postdata();
    }

    return new WP_REST_Response($posts, 200);
}

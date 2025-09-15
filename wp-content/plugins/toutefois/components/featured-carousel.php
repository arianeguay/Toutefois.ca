<?php

/**
 * Featured Carousel Component
 */

if (! defined('ABSPATH')) {
    exit; // Exit if accessed directly.
}

// 1. Register REST Route
add_action('rest_api_init', function () {
    register_rest_route('toutefois/v1', '/featured-projects', array(
        'methods' => 'GET',
        'callback' => 'get_featured_projects',
        'permission_callback' => '__return_true' // Make public
    ));
});

// 2. Callback Function
function get_featured_projects()
{
    $args = array(
        'post_type' => 'projet',
        'posts_per_page' => -1,
        'meta_query' => array(
            array(
                'key' => '_projet_is_featured',
                'value' => '1',
                'compare' => '=='
            )
        )
    );

    $query = new WP_Query($args);
    $posts = array();

    if ($query->have_posts()) {
        while ($query->have_posts()) {
            $query->the_post();
            $post_id = get_the_ID();
            $post_meta = get_post_meta($post_id);
            $featured_image_url = get_the_post_thumbnail_url($post_id, 'full');

            $categories = get_the_category($post_id);
            $child = null;

            if (! empty($categories)) {
                foreach ($categories as $cat) {
                    // If this category has a parent, it’s a child
                    if ($cat->parent != 0) {
                        $child = $cat;
                        break; // stop at the first child found
                    }
                }
            }

            if ($child) {
                $type = $child->name; // Child category name
            } else {
                $type = $categories[0]->name; // fallback if no child
            }
            $posts[] = array(
                'id' => $post_id,
                'title' => get_the_title(),
                'excerpt' => get_the_excerpt(),
                'content' => get_the_content(),
                'meta' => $post_meta,
                'featured_image_url' => $featured_image_url,
                'projet_date_debut' => $post_meta['_projet_date_debut'][0],
                'projet_date_fin' => $post_meta['_projet_date_fin'][0],
                'type' => $type,
                'lien_de_reservation' => $post_meta['_projet_lien'][0],
            );
        }
        wp_reset_postdata();
    }

    return new WP_REST_Response($posts, 200);
}

<?php

/**
 * Projects List Component
 */

if (! defined('ABSPATH')) {
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
function get_all_projects()
{
    $args = array(
        'post_type' => 'projet',
        'posts_per_page' => 6,
        'order' => 'DESC',
        'orderby' => 'date',
    );

    $query = new WP_Query($args);
    $posts = array();

    if ($query->have_posts()) {
        while ($query->have_posts()) {
            $query->the_post();
            $post_id = get_the_ID();
            $post_meta = get_post_meta($post_id);
            $featured_image_url = get_the_post_thumbnail_url($post_id, 'full');
            $slug = get_post_field('post_name', $post_id);

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
                'slug' => $slug,
                'date' => get_the_date(),
                'type' => $type,
                'projet_date_debut' => $post_meta['_projet_date_debut'][0],
                'projet_date_fin' => $post_meta['_projet_date_fin'][0],
                'lien_de_reservation' => $post_meta['_projet_lien'][0],

            );
        }
        wp_reset_postdata();
    }

    return new WP_REST_Response($posts, 200);
}

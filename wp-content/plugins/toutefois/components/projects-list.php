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
        'permission_callback' => '__return_true', // Make public
        'args' => array(
            'main_project' => array(
                'description' => 'Filter by main project (ID or slug). Returns sub-projects where post_parent = main project ID.',
                'type'        => 'string',
                'required'    => false,
            ),
        )
    ));
});

// 2. Callback Function
function get_all_projects(?WP_REST_Request $request = null)
{
    $args = array(
        'post_type' => 'projet',
        'posts_per_page' => 6,
        // Sort: end date desc, then modified desc
        'meta_key'   => '_projet_date_fin',
        'meta_type'  => 'DATE',
        'orderby'    => array(
            'meta_value' => 'DESC',
            'modified'   => 'DESC',
        ),
    );

    $main_param = null;
    if ($request instanceof WP_REST_Request) {
        $main_param = $request->get_param('main_project');
    }
    $posts = array();
    $queried_ids = array();

    if ($main_param) {
        if (function_exists('toutefois_resolve_main_project_id')) {
            $main_id = toutefois_resolve_main_project_id($main_param);
        } else {
            // Fallback: accept numeric only
            $main_id = ctype_digit((string)$main_param) ? (int)$main_param : 0;
        }
        if ($main_id > 0) {
            // Query A: direct children via post_parent
            $children_q = new WP_Query(array_merge($args, array('post_parent' => $main_id)));
            if ($children_q->have_posts()) {
                while ($children_q->have_posts()) {
                    $children_q->the_post();
                    $queried_ids[] = get_the_ID();
                }
                wp_reset_postdata();
            }

            // Query B: associated via _main_project_id meta
            $meta_q = new WP_Query(array_merge($args, array(
                'post_parent' => '', // avoid forcing parent filter
                'meta_query' => array(
                    array(
                        'key'     => '_main_project_id',
                        'value'   => (string)$main_id,
                        'compare' => '=',
                    )
                ),
            )));
            if ($meta_q->have_posts()) {
                while ($meta_q->have_posts()) {
                    $meta_q->the_post();
                    $queried_ids[] = get_the_ID();
                }
                wp_reset_postdata();
            }

            // Deduplicate while preserving order
            $queried_ids = array_values(array_unique($queried_ids));

            // If we have IDs, load them in order
            if (!empty($queried_ids)) {
                $final_q = new WP_Query(array(
                    'post_type' => 'projet',
                    'post__in' => $queried_ids,
                    'orderby' => 'post__in',
                    'posts_per_page' => $args['posts_per_page'],
                ));
                if ($final_q->have_posts()) {
                    while ($final_q->have_posts()) {
                        $final_q->the_post();
                        $post_id = get_the_ID();
                        $post_meta = get_post_meta($post_id);
                        $featured_image_url = get_the_post_thumbnail_url($post_id, 'full');
                        $slug = get_post_field('post_name', $post_id);

                        $categories = get_the_category($post_id);
                        $child = null;
                        if (! empty($categories)) {
                            foreach ($categories as $cat) {
                                if ($cat->parent != 0) {
                                    $child = $cat;
                                    break;
                                }
                            }
                        }
                        $type = $child ? $child->name : ($categories[0]->name ?? '');

                        $date_debut = $post_meta['_projet_date_debut'][0] ?? '';
                        $date_fin   = $post_meta['_projet_date_fin'][0] ?? '';
                        // Computed display/sort date: prefer end date, else modified date
                        $computed_date = !empty($date_fin) ? $date_fin : get_the_modified_date('Y-m-d');

                        $posts[] = array(
                            'id' => $post_id,
                            'title' => get_the_title(),
                            'excerpt' => get_the_excerpt(),
                            'content' => get_the_content(),
                            'meta' => $post_meta,
                            'featured_image_url' => $featured_image_url,
                            'slug' => $slug,
                            'date' => $computed_date,
                            'type' => $type,
                            'projet_date_debut' => $date_debut,
                            'projet_date_fin' => $date_fin,
                            'lien_de_reservation' => $post_meta['_projet_lien'][0] ?? '',
                        );
                    }
                    wp_reset_postdata();
                }

                return new WP_REST_Response($posts, 200);
            }
            // If no IDs found, fall through to generic query below
        }
    }

    // Generic (no main project) or fallback
    $query = new WP_Query($args);

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
            $date_debut = $post_meta['_projet_date_debut'][0] ?? '';
            $date_fin   = $post_meta['_projet_date_fin'][0] ?? '';
            $computed_date = !empty($date_fin) ? $date_fin : get_the_modified_date('Y-m-d');

            $posts[] = array(
                'id' => $post_id,
                'title' => get_the_title(),
                'excerpt' => get_the_excerpt(),
                'content' => get_the_content(),
                'meta' => $post_meta,
                'featured_image_url' => $featured_image_url,
                'slug' => $slug,
                'date' => $computed_date,
                'type' => $type,
                'projet_date_debut' => $date_debut,
                'projet_date_fin' => $date_fin,
                'lien_de_reservation' => $post_meta['_projet_lien'][0] ?? '',

            );
        }
        wp_reset_postdata();
    }

    return new WP_REST_Response($posts, 200);
}

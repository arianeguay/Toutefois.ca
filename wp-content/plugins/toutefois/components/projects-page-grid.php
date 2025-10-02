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
    $per_page = $request->get_param('per_page') ? (int)$request->get_param('per_page') : -1; // -1 to get all projects

    // Get all parent categories (categories with no parent)
    $parent_categories = get_categories(array(
        'taxonomy' => 'category',
        'hide_empty' => true,
        'parent' => 0, // Only get top-level categories
    ));

    $projects_by_category = array();
    $all_projects = array();
    $total_posts = 0;

    // For each parent category
    foreach ($parent_categories as $parent_cat) {
        // Get child categories of this parent
        $child_categories = get_categories(array(
            'taxonomy' => 'category',
            'hide_empty' => false,
            'parent' => $parent_cat->term_id,
        ));

        // Create array of all category IDs (parent and children)
        $category_ids = array($parent_cat->term_id);
        foreach ($child_categories as $child_cat) {
            $category_ids[] = $child_cat->term_id;
        }

        // Query projects that belong to any of these categories
        $args = array(
            'post_type' => 'projet',
            'posts_per_page' => -1, // Get all projects for this category
            'tax_query' => array(
                array(
                    'taxonomy' => 'category',
                    'field' => 'term_id',
                    'terms' => $category_ids,
                )
            ),
            // Sort: end date desc, then modified desc
            'meta_key'   => '_projet_date_fin',
            'meta_type'  => 'DATE',
            'orderby'    => array(
                'meta_value' => 'DESC',
                'modified'   => 'DESC',
            ),
        );

        $query = new WP_Query($args);
        $category_posts = array();

        if ($query->have_posts()) {
            while ($query->have_posts()) {
                $query->the_post();
                $post_id = get_the_ID();
                $post_meta = get_post_meta($post_id);

                $slug = get_post_field('post_name', $post_id);
                $featured_image_url = get_the_post_thumbnail_url($post_id, 'full');

                // Get all categories for this post
                $post_categories = wp_get_post_categories($post_id, array('fields' => 'all'));
                $post_category = null;
                $found_child = false;

                // First try to find a child category of our parent category
                foreach ($post_categories as $cat) {
                    if ($cat->parent == $parent_cat->term_id) {
                        $post_category = array(
                            'id' => $cat->term_id,
                            'name' => $cat->name,
                            'slug' => $cat->slug,
                            'parent_id' => $cat->parent,
                            'is_child' => true
                        );
                        $found_child = true;
                        break;
                    }
                }

                // If no child category was found, use the parent
                if (!$found_child) {
                    $post_category = array(
                        'id' => $parent_cat->term_id,
                        'name' => $parent_cat->name,
                        'slug' => $parent_cat->slug,
                        'parent_id' => 0,
                        'is_child' => false
                    );
                }

                $date_debut = $post_meta['_projet_date_debut'][0] ?? '';
                $date_fin   = $post_meta['_projet_date_fin'][0] ?? '';
                $computed_date = !empty($date_fin)
                    ? $date_fin
                    : (!empty($date_debut) ? $date_debut : get_the_modified_date('Y-m-d'));

                $project = array(
                    'id' => $post_id,
                    'title' => get_the_title(),
                    'slug' => $slug,
                    'excerpt' => get_the_excerpt(),
                    'content' => get_the_content(),
                    'meta' => $post_meta,
                    'featured_image_url' => $featured_image_url,
                    'category' => $post_category,
                    'projet_date_debut' => $date_debut,
                    'projet_date_fin'   => $date_fin,
                    'date' => $computed_date,
                );

                $category_posts[] = $project;
                $all_projects[] = $project;
                $total_posts++;
            }

            wp_reset_postdata();
        }

        // Sort posts within this category by computed date desc
        if (!empty($category_posts)) {
            usort($category_posts, function ($a, $b) {
                $da = isset($a['projet_date_fin']) && $a['projet_date_fin'] !== '' ? strtotime($a['projet_date_fin']) : (isset($a['date']) ? strtotime($a['date']) : 0);
                $db = isset($b['projet_date_fin']) && $b['projet_date_fin'] !== '' ? strtotime($b['projet_date_fin']) : (isset($b['date']) ? strtotime($b['date']) : 0);
                return $db <=> $da;
            });
        }

        // Add this category and its posts to the result
        if (!empty($category_posts)) {
            $projects_by_category[] = array(
                'category' => array(
                    'id' => $parent_cat->term_id,
                    'name' => $parent_cat->name,
                    'slug' => $parent_cat->slug
                ),
                'projects' => $category_posts
            );
        }
    }

    // Sort the overall list as well by end date then modified
    if (!empty($all_projects)) {
        usort($all_projects, function ($a, $b) {
            $da = isset($a['projet_date_fin']) && $a['projet_date_fin'] !== '' ? strtotime($a['projet_date_fin']) : (isset($a['date']) ? strtotime($a['date']) : 0);
            $db = isset($b['projet_date_fin']) && $b['projet_date_fin'] !== '' ? strtotime($b['projet_date_fin']) : (isset($b['date']) ? strtotime($b['date']) : 0);
            return $db <=> $da;
        });
    }

    // Apply pagination to the final result
    $result = array(
        'by_category' => $projects_by_category,
        'all_projects' => $per_page > 0 ? array_slice($all_projects, ($page - 1) * $per_page, $per_page) : $all_projects
    );

    $total_pages = $per_page > 0 ? ceil($total_posts / $per_page) : 1;

    $response = new WP_REST_Response($result, 200);
    $response->header('X-WP-Total', $total_posts);
    $response->header('X-WP-TotalPages', $total_pages);

    return $response;
}

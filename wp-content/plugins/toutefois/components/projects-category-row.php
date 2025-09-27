<?php

/**
 * REST: /toutefois/v1/projects-category-row
 * Returns "projet" posts under a parent category (and its children).
 */

if (! defined('ABSPATH')) exit;

/** Register Route */
add_action('rest_api_init', function () {
    register_rest_route('toutefois/v1', '/projects-category-row', [
        'methods'             => 'GET',
        'callback'            => 'toutefois_get_projects_by_category',
        'permission_callback' => '__return_true',
        'args'                => [
            'page' => [
                'type'              => 'integer',
                'default'           => 1,
                'minimum'           => 1,
                'sanitize_callback' => 'absint',
                'validate_callback' => function ($value) {
                    return $value >= 1;
                },
            ],
            'per_page' => [
                'type'              => 'integer',
                'default'           => 12,        // sensible default
                'minimum'           => -1,
                'maximum'           => 100,       // cap abuse
                'sanitize_callback' => function ($v) {
                    $v = intval($v);
                    if ($v === 0) $v = 12;
                    return max(-1, min(100, $v));
                },
            ],
            'category' => [
                'type'              => 'string',
                'required'          => true,
                'sanitize_callback' => 'sanitize_text_field',
                'validate_callback' => function ($value) {
                    return is_string($value) && $value !== '';
                },
                'description'       => 'Parent category (slug, ID, or name).',
            ],
            'main_project' => [
                'type'              => 'string',
                'required'          => false,
                'sanitize_callback' => 'sanitize_text_field',
                'description'       => 'Filter by Main Project (ID or slug). Limits results to sub-projects with post_parent = main project.',
            ],
        ],
    ]);
});

/** Resolve a category param (slug, ID, or name) to a WP_Term for taxonomy "category". */
function toutefois_resolve_parent_category($raw)
{
    // Try ID
    if (ctype_digit((string)$raw)) {
        $term = get_term((int)$raw, 'category');
        if ($term && !is_wp_error($term)) return $term;
    }
    // Try slug
    $term = get_term_by('slug', $raw, 'category');
    if ($term && !is_wp_error($term)) return $term;

    // Try name (last resort)
    $term = get_term_by('name', $raw, 'category');
    if ($term && !is_wp_error($term)) return $term;

    return null;
}

/** Main callback */
function toutefois_get_projects_by_category(WP_REST_Request $request)
{
    $page         = (int) $request->get_param('page');
    $per_page     = (int) $request->get_param('per_page');
    $cat_arg      = $request->get_param('category');
    $main_param   = $request->get_param('main_project');

    $main_parent_id = 0;
    if ($main_param) {
        if (function_exists('toutefois_resolve_main_project_id')) {
            $main_parent_id = toutefois_resolve_main_project_id($main_param);
        } elseif (ctype_digit((string)$main_param)) {
            $main_parent_id = (int) $main_param;
        }
    }

    $parent_cat = toutefois_resolve_parent_category($cat_arg);
    if (!$parent_cat) {
        return new WP_Error('invalid_category', 'Category not found.', ['status' => 400]);
    }

    // Build the full category ID list: parent + children
    $child_terms = get_terms([
        'taxonomy'   => 'category',
        'hide_empty' => false,
        'parent'     => $parent_cat->term_id,
        'fields'     => 'ids',
    ]);
    if (is_wp_error($child_terms)) $child_terms = [];

    $category_ids = array_unique(array_merge([$parent_cat->term_id], $child_terms));

    // Cache key (invalidate by changing code/version or using `last_changed`)
    $cache_key = sprintf(
        'toutefois_proj_catrow:%d:%d:%d',
        (int) $parent_cat->term_id,
        (int) $page,
        (int) $per_page
    );
    $cached = get_transient($cache_key);
    if ($cached !== false) {
        $response = new WP_REST_Response($cached['items'], 200);
        $response->header('X-WP-Total', (int) $cached['total']);
        $response->header('X-WP-TotalPages', (int) $cached['total_pages']);
    }

    // Optimize query: when not paginating (per_page = -1), disable SQL_CALC_FOUND_ROWS
    $no_found_rows = ($per_page === -1);

    $args = [
        'post_type'           => 'projet',
        'post_status'         => 'publish',
        'posts_per_page'      => $per_page,
        'paged'               => max(1, $page),
        'no_found_rows'       => $no_found_rows,
        'update_post_meta_cache' => false,
        'update_post_term_cache' => true,
        'tax_query' => [[
            'taxonomy' => 'category',
            'field'    => 'term_id',
            'terms'    => $category_ids,
            'include_children' => false, // we already expanded children
        ]],
    ];
    if ($main_parent_id > 0) {
        $args['post_parent'] = $main_parent_id;
    }

    $q = new WP_Query($args);

    $items = [];
    if ($q->have_posts()) {
        while ($q->have_posts()) {
            $q->the_post();
            $post_id = get_the_ID();

            // find the most specific category (prefer direct child of parent, else parent)
            $post_terms = wp_get_post_terms($post_id, 'category');
            $chosen     = null;

            if (!is_wp_error($post_terms)) {
                foreach ($post_terms as $t) {
                    if ((int)$t->parent === (int)$parent_cat->term_id) {
                        $chosen = $t;
                        break;
                    }
                }
            }
            if (!$chosen) $chosen = $parent_cat;

            $items[] = [
                'id'                 => $post_id,
                'title'              => get_the_title(),
                'slug'               => get_post_field('post_name', $post_id),
                'excerpt'            => wp_strip_all_tags(get_the_excerpt($post_id)),
                // Avoid dumping full content by default for perf; fetch lazily if needed
                // 'content'         => apply_filters('the_content', get_post_field('post_content', $post_id)),
                'featured_image_url' => get_the_post_thumbnail_url($post_id, 'large'),
                'category'           => [
                    'id'        => (int) $chosen->term_id,
                    'name'      => $chosen->name,
                    'slug'      => $chosen->slug,
                    'parent_id' => (int) $chosen->parent,
                    'is_child'  => ((int)$chosen->term_id !== (int)$parent_cat->term_id),
                ],
                // If you truly need ALL meta, keep; else cherry-pick for smaller payloads.
                // 'meta' => get_post_meta($post_id),
            ];
        }
        wp_reset_postdata();
    }

    // Accurate totals/pages when paginating; otherwise synthesize.
    $total       = $no_found_rows ? count($items) : (int) $q->found_posts;
    $total_pages = ($per_page > 0) ? (int) ceil($total / $per_page) : 1;

    $payload = ['items' => $items, 'total' => $total, 'total_pages' => $total_pages];

    // Short cache to avoid thundering herd; adjust to your needs (e.g., 60–300s)
    set_transient($cache_key, $payload, 120);

    $response = new WP_REST_Response($items, 200);
    $response->header('X-WP-Total', $total);
    $response->header('X-WP-TotalPages', $total_pages);

    return $response;
}

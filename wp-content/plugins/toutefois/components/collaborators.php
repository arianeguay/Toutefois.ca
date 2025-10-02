<?php

/**
 * Collaborators REST API
 */

if (! defined('ABSPATH')) {
    exit;
}

/**
 * Register REST Routes
 */
add_action('rest_api_init', function () {
    // List / filtered
    register_rest_route('toutefois/v1', '/collaborators', array(
        'methods'             => WP_REST_Server::READABLE,
        'callback'            => 'get_collaborators',
        'permission_callback' => '__return_true',
        'args'                => array(
            'is_member' => array(
                'description' => 'Filter by membership (_collaborateur_is_member).',
                'type'        => 'boolean',
                'required'    => false,
            ),
            'main_project' => array(
                'description' => 'Filter collaborators associated to a main project (ID or slug). Uses _main_project_id meta.',
                'type'        => 'string',
                'required'    => false,
            ),
        ),
    ));

    // Single by slug
    register_rest_route('toutefois/v1', '/collaborators/(?P<slug>[\w-]+)', array(
        'methods'             => WP_REST_Server::READABLE,
        'callback'            => 'get_collaborator_by_slug',
        'permission_callback' => '__return_true',
        'args'                => array(
            'slug' => array(
                'description' => 'Collaborator post_name (slug).',
                'type'        => 'string',
                'required'    => true,
            ),
        ),
    ));
});

/**
 * Serialize one collaborator (uses loop globals)
 */
function prepare_collaborator()
{
    $post_id            = get_the_ID();
    $post_meta          = get_post_meta($post_id);
    $featured_image_url = get_the_post_thumbnail_url($post_id, 'full');
    $is_member = get_post_meta($post_id, '_collaborateur_is_member', true);
    $is_hidden = get_post_meta($post_id, '_collaborateur_is_hidden', true);
    $slug = get_post_field('post_name', $post_id);
    $position = get_post_meta($post_id, '_collaborateur_poste', true);
    $content = apply_filters('the_content', get_the_content());
    $excerpt = get_the_excerpt();
    $name = get_the_title();
    return array(
        'id'                 => $post_id,
        'name'               => $name,
        'excerpt'            => $excerpt,
        'content'            => $content,
        'meta'               => $post_meta,
        'photoUrl'           => $featured_image_url,
        'position'           => $position,
        'slug'               => $slug,
        'is_member'          => $is_member,
        'is_hidden'          => (bool) $is_hidden,
    );
}

/**
 * GET /collaborators (with optional ?is_member=true|false)
 */
function get_collaborators(WP_REST_Request $request)
{
    $member_status = $request->get_param('member_status')   ?? 'all';

    $args = array(
        'post_type'      => 'collaborateur',
        'posts_per_page' => -1,
        'post_status'    => 'publish',
        'order'          => 'ASC',
    );


    if ($member_status === 'members') {
        $args['meta_query'] = [
            [
                'key' => '_collaborateur_is_member',
                'value' => true,
                'compare' => '=',
            ],
        ];
    } elseif ($member_status === 'non-members') {
        $args['meta_query'] = [
            'relation' => 'OR',
            [
                'key' => '_collaborateur_is_member',
                'value' => false,
                'compare' => '=',
            ],
            [
                'key' => '_collaborateur_is_member',
                'compare' => 'NOT EXISTS',
            ],
        ];
    }


    // Optional boolean filter on _collaborateur_is_member
    $is_member_param = $request->get_param('is_member');
    if (null !== $is_member_param) {
        // Normalize to 1/0 (WP usually stores boolean meta as "1"/"0")
        $is_member_bool = filter_var($is_member_param, FILTER_VALIDATE_BOOLEAN, FILTER_NULL_ON_FAILURE);
        if ($is_member_bool !== null) {
            $args['meta_query'] = array(
                array(
                    'key'     => '_collaborateur_is_member',
                    'value'   => $is_member_bool ? '1' : '0',
                    'compare' => '=',
                ),
            );
        }
    }

    // Optional filter by main project association via _main_project_id meta
    $main_param = $request->get_param('main_project');
    if ($main_param) {
        if (function_exists('toutefois_resolve_main_project_id')) {
            $main_id = toutefois_resolve_main_project_id($main_param);
        } else {
            $main_id = ctype_digit((string)$main_param) ? (int)$main_param : 0;
        }
        if ($main_id > 0) {
            if (!isset($args['meta_query'])) {
                $args['meta_query'] = array();
            }
            $args['meta_query'][] = array(
                'key'     => '_main_project_id',
                'value'   => (string)$main_id,
                'compare' => '=',
            );
        }
    }

    // Exclude hidden collaborators by default (unless main_project filter is used)
    if (!$main_param) {
        if (!isset($args['meta_query'])) {
            $args['meta_query'] = array();
        }
        // Use '!=' so posts with value '1' are excluded, and posts without the key are included.
        $args['meta_query'][] = array(
            'key'     => '_collaborateur_is_hidden',
            'value'   => '1',
            'compare' => '!=',
        );
    }

    $query = new WP_Query($args);
    $posts = array();

    if ($query->have_posts()) {
        while ($query->have_posts()) {
            $query->the_post();
            $posts[] = prepare_collaborator();
        }
        wp_reset_postdata();
    }

    return new WP_REST_Response($posts, 200);
}

/**
 * GET /collaborators/{slug}
 */
function get_collaborator_by_slug(WP_REST_Request $request)
{
    $slug = sanitize_title($request['slug']);

    // Query by name (slug)
    $args = array(
        'name'           => $slug,             // <-- correct arg for slug lookup
        'post_type'      => 'collaborateur',
        'posts_per_page' => 1,
        'post_status'    => 'publish',
    );

    $query = new WP_Query($args);

    if (! $query->have_posts()) {
        return new WP_Error(
            'collaborator_not_found',
            'Collaborator not found.',
            array('status' => 404)
        );
    }

    $query->the_post();
    $data = prepare_collaborator();
    wp_reset_postdata();

    return new WP_REST_Response($data, 200);
}

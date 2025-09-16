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

    return array(
        'id'                 => $post_id,
        'name'              => get_the_title(),
        'excerpt'            => get_the_excerpt(),
        'content'            => apply_filters('the_content', get_the_content()),
        'meta'               => $post_meta,
        'photoUrl' => $featured_image_url,
        'position'           => get_post_meta($post_id, '_collaborateur_position', true),
        'slug'               => get_post_field('post_name', $post_id),
    );
}

/**
 * GET /collaborators (with optional ?is_member=true|false)
 */
function get_collaborators(WP_REST_Request $request)
{
    $args = array(
        'post_type'      => 'collaborateur',
        'posts_per_page' => -1,
        'post_status'    => 'publish',
    );

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

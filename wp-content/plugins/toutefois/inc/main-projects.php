<?php
if (!defined('ABSPATH')) {
    exit;
}
/**
 * Main Projects: meta, admin UI, and helpers
 */

// Register meta for marking a Projet as Main and associating items to a Main Project
function toutefois_register_main_project_meta()
{
    // Mark a projet as a main project
    register_post_meta('projet', '_projet_is_main', [
        'show_in_rest' => true,
        'single'       => true,
        'type'         => 'boolean',
        'auth_callback' => '__return_true', // expose publicly for frontend
    ]);

    // Hide from generic queries: only display when a main project context is provided
    // (i.e., when filtering/associating by _main_project_id)
    register_post_meta('projet', '_projet_only_in_main', [
        'show_in_rest' => true,
        'single'       => true,
        'type'         => 'boolean',
        'auth_callback' => '__return_true',
    ]);

    // Generic: hide posts and collaborators from generic queries unless in main context
    register_post_meta('post', '_only_in_main', [
        'show_in_rest'  => true,
        'single'        => true,
        'type'          => 'boolean',
        'auth_callback' => '__return_true',
    ]);
    register_post_meta('collaborateur', '_only_in_main', [
        'show_in_rest'  => true,
        'single'        => true,
        'type'          => 'boolean',
        'auth_callback' => '__return_true',
    ]);

    // Association to a main project
    // posts and projets: single association
    $assoc_single = [
        'show_in_rest' => true,
        'single'       => true,
        'type'         => 'integer',
        'auth_callback' => '__return_true',
    ];
    register_post_meta('post', '_main_project_id', $assoc_single);
    register_post_meta('projet', '_main_project_id', $assoc_single); // sub-projects

    // collaborateurs: multiple associations (store multiple meta rows)
    $assoc_multi = [
        'show_in_rest' => true,
        'single'       => false, // multiple values allowed
        'type'         => 'integer',
        'auth_callback' => '__return_true',
    ];
    register_post_meta('collaborateur', '_main_project_id', $assoc_multi);
}
add_action('init', 'toutefois_register_main_project_meta');

/**
 * Admin UI: Meta boxes
 */
function toutefois_get_main_projects_dropdown()
{
    // Fetch only projets flagged as main
    $projects = get_posts([
        'post_type'      => 'projet',
        'posts_per_page' => -1,
        'post_status'    => ['publish', 'draft', 'pending'],
        'meta_query'     => [[
            'key'     => '_projet_is_main',
            'value'   => '1',
            'compare' => '=',
        ]],
        'orderby'        => 'title',
        'order'          => 'ASC',
        'fields'         => 'ids',
    ]);
    return $projects;
}

function toutefois_main_project_meta_box_render($post)
{
    wp_nonce_field('toutefois_main_project_meta', 'toutefois_main_project_meta_nonce');

    $is_main = get_post_meta($post->ID, '_projet_is_main', true);
    $assoc   = intval(get_post_meta($post->ID, '_main_project_id', true));

    // Only show the "Main Project" checkbox on projet post type
    if ($post->post_type === 'projet') {
        echo '<p><label><input type="checkbox" name="_projet_is_main" value="1" ' . checked($is_main, '1', false) . ' /> ' . esc_html__('Main Project', 'toutefois') . '</label></p>';

        // Only show inside a Main Project context
        $only_in_main = get_post_meta($post->ID, '_projet_only_in_main', true);
        echo '<p><label><input type="checkbox" name="_projet_only_in_main" value="1" ' . checked($only_in_main, '1', false) . ' /> ' . esc_html__('Show only inside its Main Project context', 'toutefois') . '</label></p>';
    } else {
        // For posts and collaborators: generic only-in-main flag
        $only_in_main_generic = get_post_meta($post->ID, '_only_in_main', true);
        echo '<p><label><input type="checkbox" name="_only_in_main" value="1" ' . checked($only_in_main_generic, '1', false) . ' /> ' . esc_html__('Show only inside its Main Project context', 'toutefois') . '</label></p>';
    }

    // Association UI
    $options = toutefois_get_main_projects_dropdown();
    if ($post->post_type === 'collaborateur') {
        // Multi-select for collaborators
        $assoc_values = get_post_meta($post->ID, '_main_project_id', false); // all values
        echo '<p><label for="_main_project_id[]">' . esc_html__('Associated Main Projects', 'toutefois') . '</label><br />';
        echo '<select multiple size="6" name="_main_project_id[]" id="_main_project_id" style="width:100%">';
        foreach ($options as $proj_id) {
            $title = get_the_title($proj_id);
            $selected_attr = in_array((string)$proj_id, array_map('strval', (array)$assoc_values), true) ? ' selected' : '';
            echo '<option value="' . esc_attr($proj_id) . '"' . $selected_attr . '>' . esc_html($title) . '</option>';
        }
        echo '</select></p>';
        echo '<p class="description">' . esc_html__('Hold Ctrl/Cmd to select multiple projects.', 'toutefois') . '</p>';
    } else {
        // Single select for posts and projets
        echo '<p><label for="_main_project_id">' . esc_html__('Associated Main Project', 'toutefois') . '</label><br />';
        echo '<select name="_main_project_id" id="_main_project_id">';
        echo '<option value="">' . esc_html__('— None —', 'toutefois') . '</option>';
        foreach ($options as $proj_id) {
            $title = get_the_title($proj_id);
            echo '<option value="' . esc_attr($proj_id) . '" ' . selected($assoc, $proj_id, false) . '>' . esc_html($title) . '</option>';
        }
        echo '</select></p>';
    }

    if ($post->post_type === 'projet') {
        echo '<p class="description">' . esc_html__('If this Projet is a sub-project, selecting a Main Project here will also set its post_parent.', 'toutefois') . '</p>';
    }
}

function toutefois_add_main_project_meta_box()
{
    $screens = ['post', 'collaborateur', 'projet'];
    foreach ($screens as $screen) {
        add_meta_box(
            'toutefois_main_project_meta',
            __('Main Project', 'toutefois'),
            'toutefois_main_project_meta_box_render',
            $screen,
            'side',
            'high'
        );
    }
}
add_action('add_meta_boxes', 'toutefois_add_main_project_meta_box');

/**
 * Save handler
 */
function toutefois_save_main_project_meta($post_id, $post, $update)
{
    // Prevent recursion and irrelevant saves
    static $toutefois_saving = false;
    if ($toutefois_saving) return;
    if (!isset($_POST['toutefois_main_project_meta_nonce']) || !wp_verify_nonce($_POST['toutefois_main_project_meta_nonce'], 'toutefois_main_project_meta')) {
        return;
    }
    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) return;
    if (!current_user_can('edit_post', $post_id)) return;
    if (!in_array($post->post_type, ['post', 'collaborateur', 'projet'], true)) return;

    // Save association meta across all screens
    if (isset($_POST['_main_project_id'])) {
        if ($post->post_type === 'collaborateur') {
            // Expect an array of IDs
            $ids = (array) $_POST['_main_project_id'];
            $ids = array_values(array_unique(array_map('absint', $ids)));
            // Reset existing and add new
            delete_post_meta($post_id, '_main_project_id');
            foreach ($ids as $mid) {
                if ($mid > 0) add_post_meta($post_id, '_main_project_id', $mid, false);
            }
        } elseif ($_POST['_main_project_id'] !== '') {
            $main_id = absint($_POST['_main_project_id']);
            update_post_meta($post_id, '_main_project_id', $main_id);
        } else {
            delete_post_meta($post_id, '_main_project_id');
        }
        // If saving a projet that is not the main itself, sync post_parent
        if ($post->post_type === 'projet' && (int)$post_id !== (int)$main_id) {
            // Ensure main_id is a projet and marked as main
            $is_main = get_post_meta($main_id, '_projet_is_main', true);
            $current_parent = (int) get_post_field('post_parent', $post_id);
            if ($is_main && $current_parent !== (int)$main_id) {
                $toutefois_saving = true;
                remove_action('save_post', 'toutefois_save_main_project_meta', 10);
                wp_update_post([
                    'ID' => $post_id,
                    'post_parent' => $main_id,
                ]);
                add_action('save_post', 'toutefois_save_main_project_meta', 10, 3);
                $toutefois_saving = false;
            }
        }
    } else {
        // No field sent
        if ($post->post_type === 'collaborateur') {
            delete_post_meta($post_id, '_main_project_id');
        } else {
            delete_post_meta($post_id, '_main_project_id');
        }
        // If projet and not marked as main, clear parent
        if ($post->post_type === 'projet') {
            $current_parent = (int) get_post_field('post_parent', $post_id);
            if ($current_parent !== 0) {
                $toutefois_saving = true;
                remove_action('save_post', 'toutefois_save_main_project_meta', 10);
                wp_update_post([
                    'ID' => $post_id,
                    'post_parent' => 0,
                ]);
                add_action('save_post', 'toutefois_save_main_project_meta', 10, 3);
                $toutefois_saving = false;
            }
        }
    }

    // Save is_main checkbox (only for projet)
    if ($post->post_type === 'projet') {
        $is_main_val = isset($_POST['_projet_is_main']) ? '1' : '';
        if ($is_main_val === '1') {
            update_post_meta($post_id, '_projet_is_main', '1');
            // Main projects must not have a parent
            $current_parent = (int) get_post_field('post_parent', $post_id);
            if ($current_parent !== 0) {
                $toutefois_saving = true;
                remove_action('save_post', 'toutefois_save_main_project_meta', 10);
                wp_update_post([
                    'ID' => $post_id,
                    'post_parent' => 0,
                ]);
                add_action('save_post', 'toutefois_save_main_project_meta', 10, 3);
                $toutefois_saving = false;
            }
        } else {
            delete_post_meta($post_id, '_projet_is_main');
        }

        // Save only_in_main checkbox
        $only_in_main_val = isset($_POST['_projet_only_in_main']) ? '1' : '';
        if ($only_in_main_val === '1') {
            update_post_meta($post_id, '_projet_only_in_main', '1');
        } else {
            delete_post_meta($post_id, '_projet_only_in_main');
        }
    } else {
        // Save generic only_in_main for posts and collaborators
        $only_in_main_generic = isset($_POST['_only_in_main']) ? '1' : '';
        if ($only_in_main_generic === '1') {
            update_post_meta($post_id, '_only_in_main', '1');
        } else {
            delete_post_meta($post_id, '_only_in_main');
        }
    }
}
add_action('save_post', 'toutefois_save_main_project_meta', 10, 3);

/**
 * Filter queries to hide projets flagged as "only in main" unless a main project context is present.
 * Context is considered present if:
 *  - The query meta_query includes key '_main_project_id', or
 *  - The request includes a 'main_project' parameter (REST or normal request), or
 *  - Explicit meta_key is '_main_project_id', or
 *  - The query meta_query includes key '_only_in_main'.
 */
function toutefois_filter_only_in_main_projets($query) {
    // Only affect frontend and REST, not admin screens
    if (is_admin()) {
        return;
    }

    if (!$query->is_main_query() && !defined('REST_REQUEST')) {
        return;
    }

    // Restrict to targeted post types
    $post_type = $query->get('post_type');
    $targets = ['projet', 'post', 'collaborateur'];
    if ($post_type) {
        if (is_array($post_type)) {
            $intersect = array_intersect($targets, $post_type);
            if (empty($intersect)) return;
        } else {
            if (!in_array($post_type, $targets, true)) return;
        }
    }

    // Determine if a main project context is present
    $has_main_context = false;

    // Check meta_query for _main_project_id
    $mq = $query->get('meta_query');
    if (is_array($mq)) {
        foreach ($mq as $cond) {
            if (is_array($cond) && isset($cond['key']) && $cond['key'] === '_main_project_id') {
                $has_main_context = true;
                break;
            }
        }
    }

    // Check direct meta_key usage
    if (!$has_main_context && $query->get('meta_key') === '_main_project_id') {
        $has_main_context = true;
    }

    // Check request parameter (covers REST routes that pass ?main_project=...)
    if (!$has_main_context) {
        $main_param = isset($_GET['main_project']) ? $_GET['main_project'] : null;
        if ($main_param !== null && $main_param !== '') {
            $has_main_context = true;
        }
    }

    // If no main context: exclude items marked as only-in-main
    if (!$has_main_context) {
        // Pick the right meta key per post type
        $meta_key = '_projet_only_in_main';
        if ($post_type === 'post' || (is_array($post_type) && in_array('post', $post_type, true))) {
            $meta_key = '_only_in_main';
        } elseif ($post_type === 'collaborateur' || (is_array($post_type) && in_array('collaborateur', $post_type, true))) {
            $meta_key = '_only_in_main';
        }

        $exclude_meta = [
            'relation' => 'OR',
            [
                'key'     => $meta_key,
                'compare' => 'NOT EXISTS',
            ],
            [
                'key'     => $meta_key,
                'value'   => '1',
                'compare' => '!=',
            ],
        ];

        // Merge with existing meta_query using a top-level AND
        if (!is_array($mq) || empty($mq)) {
            $query->set('meta_query', $exclude_meta);
        } else {
            $new_mq = ['relation' => 'AND'];
            // If existing has a relation, preserve by nesting
            if (isset($mq['relation'])) {
                $new_mq[] = $mq; // keep existing group as-is
            } else {
                foreach ($mq as $cond) {
                    $new_mq[] = $cond;
                }
            }
            $new_mq[] = $exclude_meta;
            $query->set('meta_query', $new_mq);
        }
    }
}
add_action('pre_get_posts', 'toutefois_filter_only_in_main_projets');

/**
 * Helper: resolve a projet ID from slug or ID
 */
function toutefois_resolve_main_project_id($raw)
{
    if (!$raw) return 0;
    // numeric ID
    if (ctype_digit((string)$raw)) {
        return (int)$raw;
    }
    // slug lookup
    $q = get_posts([
        'name'           => sanitize_title($raw),
        'post_type'      => 'projet',
        'posts_per_page' => 1,
        'post_status'    => 'any',
        'fields'         => 'ids',
    ]);
    return $q ? (int)$q[0] : 0;
}

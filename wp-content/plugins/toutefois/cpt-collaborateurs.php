<?php

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly.
}

// 1. Register Custom Post Type and Meta Fields
function collaborateurs_cpt_and_meta_init()
{
    $labels = [
        'name' => _x('Collaborateurs', 'Post Type General Name', 'text_domain'),
        'singular_name' => _x('Collaborateur', 'Post Type Singular Name', 'text_domain'),
        'menu_name' => __('Collaborateurs', 'text_domain'),
    ];

    $args = [
        'label' => __('Collaborateur', 'text_domain'),
        'description' => __('Contenu de type Collaborateur', 'text_domain'),
        'labels' => $labels,
        'supports' => ['title', 'editor', 'excerpt', 'thumbnail', 'page-attributes'],
        'hierarchical' => false,
        'public' => true,
        'show_ui' => true,
        'show_in_menu' => true,
        'menu_position' => 5,
        'menu_icon' => 'dashicons-groups',
        'show_in_rest' => true,
        'has_archive' => true,
        'rewrite'               => array(
            'slug'       => 'collaborateurs',                   // single posts at /projets/%postname%
            'with_front' => false,
        ),
    ];
    register_post_type('collaborateur', $args);

    // Register Meta Fields for REST API
    register_post_meta('collaborateur', '_collaborateur_poste', [
        'show_in_rest' => true,
        'single' => true,
        'type' => 'string',
    ]);

    register_post_meta('collaborateur', '_collaborateur_is_member', [
        'show_in_rest' => true,
        'single' => true,
        'type' => 'boolean',
    ]);
}
add_action('init', 'collaborateurs_cpt_and_meta_init', 0);

// 2. Add Meta Boxes
function collaborateurs_add_meta_boxes()
{
    add_meta_box(
        'collaborateurs_custom_fields',
        'Détails du Collaborateur',
        'collaborateurs_meta_box_callback',
        'collaborateur',
        'normal',
        'high'
    );
}
add_action('add_meta_boxes', 'collaborateurs_add_meta_boxes');

// 3. Meta Box Callback
function collaborateurs_meta_box_callback($post)
{
    wp_nonce_field('collaborateurs_save_meta_box_data', 'collaborateurs_meta_box_nonce');

    $poste = get_post_meta($post->ID, '_collaborateur_poste', true);
    $is_member = get_post_meta($post->ID, '_collaborateur_is_member', true);

    echo '<p><label for="collaborateur_poste"><strong>Poste :</strong></label><br/><input type="text" id="collaborateur_poste" name="collaborateur_poste" value="' . esc_attr($poste) . '" size="25" /></p>';
    echo "<p><label for=\"collaborateur_is_member\"><input type=\"checkbox\" id=\"collaborateur_is_member\" name=\"collaborateur_is_member\" value=\"1\" " . checked($is_member, 1, false) . " /> Membre de l'équipe</label></p>";
    echo "<p><em>Pour l'image du collaborateur, veuillez utiliser l'option \"Image à la une\" sur le côté droit de l'éditeur.</em></p>";
}

// 4. Save Meta Box Data
function collaborateurs_save_meta_box_data($post_id)
{
    if (!isset($_POST['collaborateurs_meta_box_nonce']) || !wp_verify_nonce($_POST['collaborateurs_meta_box_nonce'], 'collaborateurs_save_meta_box_data')) {
        return;
    }
    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
        return;
    }
    if (!current_user_can('edit_post', $post_id)) {
        return;
    }

    if (isset($_POST['collaborateur_poste'])) {
        update_post_meta($post_id, '_collaborateur_poste', sanitize_text_field($_POST['collaborateur_poste']));
    }

    $is_member = isset($_POST['collaborateur_is_member']) ? true : false;
    update_post_meta($post_id, '_collaborateur_is_member', $is_member);
}
add_action('save_post_collaborateur', 'collaborateurs_save_meta_box_data');

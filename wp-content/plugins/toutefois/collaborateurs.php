<?php

/**
 * Description: Adds a custom post type for "Collaborateurs" with custom fields.
 * Version: 1.0
 * Author: Ariane Guay
 */

if (! defined('ABSPATH')) {
    exit; // Exit if accessed directly.
}

// 1. Register Custom Post Type and Meta Fields
function collaborateurs_cpt_and_meta_init()
{

    // CPT Labels
    $labels = array(
        'name'                  => _x('Collaborateurs', 'Post Type General Name', 'text_domain'),
        'singular_name'         => _x('Collaborateur', 'Post Type Singular Name', 'text_domain'),
        'menu_name'             => __('Collaborateurs', 'text_domain'),
        'name_admin_bar'        => __('Collaborateur', 'text_domain'),
        'archives'              => __('Archives des Collaborateurs', 'text_domain'),
        'attributes'            => __('Attributs du Collaborateur', 'text_domain'),
        'parent_item_colon'     => __('Collaborateur Parent :', 'text_domain'),
        'all_items'             => __('Tous les Collaborateurs', 'text_domain'),
        'add_new_item'          => __('Ajouter un nouveau Collaborateur', 'text_domain'),
        'add_new'               => __('Ajouter', 'text_domain'),
        'new_item'              => __('Nouveau Collaborateur', 'text_domain'),
        'edit_item'             => __('Modifier le Collaborateur', 'text_domain'),
        'update_item'           => __('Mettre à jour le Collaborateur', 'text_domain'),
        'view_item'             => __('Voir le Collaborateur', 'text_domain'),
        'view_items'            => __('Voir les Collaborateurs', 'text_domain'),
        'search_items'          => __('Rechercher un Collaborateur', 'text_domain'),
        'not_found'             => __('Non trouvé', 'text_domain'),
        'not_found_in_trash'    => __('Non trouvé dans la corbeille', 'text_domain'),
        'featured_image'        => __('Image à la une', 'text_domain'),
        'set_featured_image'    => __('Définir l’image à la une', 'text_domain'),
        'remove_featured_image' => __('Supprimer l’image à la une', 'text_domain'),
        'use_featured_image'    => __('Utiliser comme image à la une', 'text_domain'),
        'insert_into_item'      => __('Insérer dans le Collaborateur', 'text_domain'),
        'uploaded_to_this_item' => __('Téléversé sur ce Collaborateur', 'text_domain'),
        'items_list'            => __('Liste des Collaborateurs', 'text_domain'),
        'items_list_navigation' => __('Navigation de la liste des Collaborateurs', 'text_domain'),
        'filter_items_list'     => __('Filtrer la liste des Collaborateurs', 'text_domain'),
    );

    // CPT Arguments
    $args = array(
        'label'                 => __('Collaborateur', 'text_domain'),
        'description'           => __('Contenu de type Collaborateur', 'text_domain'),
        'labels'                => $labels,
        'supports'              => array('title', 'editor', 'excerpt', 'thumbnail'),
        'taxonomies'            => array('category', 'post_tag'),
        'hierarchical'          => false,
        'public'                => true,
        'show_ui'               => true,
        'show_in_menu'          => true,
        'menu_position'         => 5,
        'menu_icon'             => 'dashicons-portfolio',
        'show_in_admin_bar'     => true,
        'show_in_nav_menus'     => true,
        'can_export'            => true,
        'has_archive'           => true,
        'exclude_from_search'   => false,
        'publicly_queryable'    => true,
        'capability_type'       => 'post',
        'show_in_rest'          => true, // Important for React
    );
    register_post_type('collaborateur', $args);

    // Register Meta Fields for REST API
    register_post_meta('collaborateur', '_collaborateur_poste', array(
        'show_in_rest' => true,
        'single' => true,
        'type' => 'string',
    ));
    register_post_meta('collaborateur', '_collaborateur_bio', array(
        'show_in_rest' => true,
        'single' => true,
        'type' => 'string',
    ));
    register_post_meta('collaborateur', '_collaborateur_is_member', array(
        'show_in_rest' => true,
        'single' => true,
        'type' => 'boolean',
    ));
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
    $bio = get_post_meta($post->ID, '_collaborateur_bio', true);
    $is_member = get_post_meta($post->ID, '_collaborateur_is_member', true);

    echo '<style> .projet-field { display: grid; grid-template-columns: 150px 1fr; gap: 10px; margin-bottom: 15px; align-items: center; } .projet-field label { font-weight: bold; } .projet-field input, .projet-field textarea { width: 100%; } </style>';

    echo '<div class="projet-field"><label for="collaborateur_poste">Poste :</label><input type="text" id="collaborateur_poste" name="collaborateur_poste" value="' . esc_attr($poste) . '" size="25" /></div>';
    echo '<div class="projet-field"><label for="collaborateur_bio">Bio :</label><textarea id="collaborateur_bio" name="collaborateur_bio" rows="4">' . esc_textarea($bio) . '</textarea></div>';
    echo '<div class="projet-field"><label for="collaborateur_is_member">Membre :</label><input type="checkbox" id="collaborateur_is_member" name="collaborateur_is_member" value="1" ' . checked($is_member, 1, false) . ' /></div>';

    echo '<p>Pour l\'image du collaborateur, veuillez utiliser l\'option "Image à la une" sur le côté droit de l\'éditeur.</p>';
}

// 4. Save Meta Box Data
function collaborateurs_save_meta_box_data($post_id)
{
    if (! isset($_POST['collaborateurs_meta_box_nonce']) || ! wp_verify_nonce($_POST['collaborateurs_meta_box_nonce'], 'collaborateurs_save_meta_box_data')) {
        return;
    }
    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
        return;
    }
    if (! current_user_can('edit_post', $post_id)) {
        return;
    }

    $fields = [
        'collaborateur_poste' => 'sanitize_text_field',
        'collaborateur_bio' => 'sanitize_textarea_field',
        'collaborateur_is_member' => 'boolval',
    ];

    foreach ($fields as $key => $sanitize_callback) {
        if (isset($_POST[$key])) {
            $value = call_user_func($sanitize_callback, $_POST[$key]);
            update_post_meta($post_id, '_' . $key, $value);
        } else {
            delete_post_meta($post_id, '_' . $key);
        }
    }
}
add_action('save_post_collaborateur', 'collaborateurs_save_meta_box_data');

add_post_type_support('collaborateur', 'thumbnail');

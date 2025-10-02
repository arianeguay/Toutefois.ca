<?php

/**
 * Description: Adds a custom post type for "Projets" with custom fields.
 * Version: 1.0
 * Author: Ariane Guay
 */

if (! defined('ABSPATH')) {
    exit; // Exit if accessed directly.
}

add_post_type_support('projet', 'thumbnail');


// 1. Register Custom Post Type and Meta Fields
function projets_cpt_and_meta_init()
{

    // CPT Labels
    $labels = array(
        'name'                  => _x('Projets', 'Post Type General Name', 'text_domain'),
        'singular_name'         => _x('Projet', 'Post Type Singular Name', 'text_domain'),
        'menu_name'             => __('Projets', 'text_domain'),
        'name_admin_bar'        => __('Projet', 'text_domain'),
        'archives'              => __('Archives des Projets', 'text_domain'),
        'attributes'            => __('Attributs du Projet', 'text_domain'),
        'parent_item_colon'     => __('Projet Parent :', 'text_domain'),
        'all_items'             => __('Tous les Projets', 'text_domain'),
        'add_new_item'          => __('Ajouter un nouveau Projet', 'text_domain'),
        'add_new'               => __('Ajouter', 'text_domain'),
        'new_item'              => __('Nouveau Projet', 'text_domain'),
        'edit_item'             => __('Modifier le Projet', 'text_domain'),
        'update_item'           => __('Mettre à jour le Projet', 'text_domain'),
        'view_item'             => __('Voir le Projet', 'text_domain'),
        'view_items'            => __('Voir les Projets', 'text_domain'),
        'search_items'          => __('Rechercher un Projet', 'text_domain'),
        'not_found'             => __('Non trouvé', 'text_domain'),
        'not_found_in_trash'    => __('Non trouvé dans la corbeille', 'text_domain'),
        'featured_image'        => __('Image à la une', 'text_domain'),
        'set_featured_image'    => __('Définir l’image à la une', 'text_domain'),
        'remove_featured_image' => __('Supprimer l’image à la une', 'text_domain'),
        'use_featured_image'    => __('Utiliser comme image à la une', 'text_domain'),
        'insert_into_item'      => __('Insérer dans le Projet', 'text_domain'),
        'uploaded_to_this_item' => __('Téléversé sur ce Projet', 'text_domain'),
        'items_list'            => __('Liste des Projets', 'text_domain'),
        'items_list_navigation' => __('Navigation de la liste des Projets', 'text_domain'),
        'filter_items_list'     => __('Filtrer la liste des Projets', 'text_domain'),
    );

    // CPT Arguments
    $args = array(
        'label'                 => __('Projet', 'text_domain'),
        'description'           => __('Contenu de type Projet', 'text_domain'),
        'labels'                => $labels,
        'supports'              => array('title', 'editor', 'excerpt', 'thumbnail', 'page-attributes'),
        'taxonomies'            => array('category', 'post_tag'),
        'hierarchical'          => true,
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
        'has_archive'           => 'projets',             // archive at /projets
        'rewrite'               => array(
            'slug'       => 'projets',                   // single posts at /projets/%postname%
            'with_front' => false,
        ),
    );
    register_post_type('projet', $args);

    // Register Meta Fields for REST API

    register_post_meta('projet', '_projet_date_debut', array(
        'show_in_rest' => true,
        'single' => true,
        'type' => 'string',
        'auth_callback' => function () {
            return true;
        }, // allow public read

    ));
    register_post_meta('projet', '_projet_date_fin', array(
        'show_in_rest' => true,
        'single' => true,
        'type' => 'string',
        'auth_callback' => function () {
            return true;
        }, // allow public read

    ));
    register_post_meta('projet', '_projet_lien', array(
        'show_in_rest' => true,
        'single' => true,
        'type' => 'string',
        'auth_callback' => function () {
            return true;
        }, // allow public read

    ));
    register_post_meta('projet', '_projet_is_featured', array(
        'show_in_rest' => true,
        'single' => true,
        'type' => 'boolean',
    ));

    register_post_meta('projet', '_wp_page_template', array(
        'show_in_rest' => true,
        'single' => true,
        'type' => 'string',
    ));
    
    // Ajouter les nouveaux champs pour couleur principale et image de prévisualisation
    register_post_meta('projet', 'main_color', array(
        'show_in_rest' => true,
        'single' => true,
        'type' => 'string',
        'auth_callback' => function () {
            return true;
        }, // allow public read
    ));
    
    register_post_meta('projet', 'preview_image_id', array(
        'show_in_rest' => true,
        'single' => true,
        'type' => 'integer',
        'auth_callback' => function () {
            return true;
        }, // allow public read
    ));

    register_rest_field('projet', 'toutefois_meta', [
        'get_callback'    => function ($obj) {
            $post_id = (int) $obj['id'];
            return [
                '_projet_is_main'     => (bool) get_post_meta($post_id, '_projet_is_main', true),
                '_projet_date_debut'  => (string) get_post_meta($post_id, '_projet_date_debut', true),
                '_projet_date_fin'    => (string) get_post_meta($post_id, '_projet_date_fin', true),
                '_projet_lien'        => (string) get_post_meta($post_id, '_projet_lien', true),
                '_projet_is_featured' => (bool) get_post_meta($post_id, '_projet_is_featured', true),
                '_main_project_id'    => (int)  get_post_meta($post_id, '_main_project_id', true),
                'main_color'          => (string) get_post_meta($post_id, 'main_color', true),
                'preview_image_id'    => (int) get_post_meta($post_id, 'preview_image_id', true),
                'preview_image_url'   => wp_get_attachment_image_url(get_post_meta($post_id, 'preview_image_id', true), 'full') ?: get_the_post_thumbnail_url($post_id, 'full'),
            ];
        },
        'schema' => null,
    ]);
}
add_action('init', 'projets_cpt_and_meta_init', 0);

// 2. Add Meta Boxes
function projets_add_meta_boxes()
{
    add_meta_box(
        'projets_custom_fields',
        'Détails du Projet',
        'projets_meta_box_callback',
        'projet',
        'normal',
        'high'
    );
}
add_action('add_meta_boxes', 'projets_add_meta_boxes');

// 3. Meta Box Callback
function projets_meta_box_callback($post)
{
    wp_nonce_field('projets_save_meta_box_data', 'projets_meta_box_nonce');

    $date_debut = get_post_meta($post->ID, '_projet_date_debut', true);
    $date_fin = get_post_meta($post->ID, '_projet_date_fin', true);
    $lien = get_post_meta($post->ID, '_projet_lien', true);
    $is_featured = get_post_meta($post->ID, '_projet_is_featured', true);
    $main_color = get_post_meta($post->ID, 'main_color', true);
    $preview_image_id = get_post_meta($post->ID, 'preview_image_id', true);

    echo '<style> .projet-field { display: grid; grid-template-columns: 150px 1fr; gap: 10px; margin-bottom: 15px; align-items: center; } .projet-field label { font-weight: bold; } .projet-field input, .projet-field textarea { width: 100%; } </style>';

    echo '<div class="projet-field"><label for="projet_date_debut">Date de début :</label><input type="date" id="projet_date_debut" name="projet_date_debut" value="' . esc_attr($date_debut) . '" /></div>';
    echo '<div class="projet-field"><label for="projet_date_fin">Date de fin :</label><input type="date" id="projet_date_fin" name="projet_date_fin" value="' . esc_attr($date_fin) . '" /></div>';
    echo '<div class="projet-field"><label for="projet_lien">Lien de réservation :</label><input type="url" id="projet_lien" name="projet_lien" value="' . esc_attr($lien) . '" size="25" /></div>';
    echo '<div class="projet-field"><label for="projet_is_featured">Projet vedette :</label><input type="checkbox" id="projet_is_featured" style="width:20px; height:20px;" name="projet_is_featured" value="1" ' . checked($is_featured, 1, false) . ' /></div>';
    
    // Nouveaux champs pour la couleur et l'image de prévisualisation
    echo '<hr style="margin: 20px 0;" />';
    echo '<h3>Apparence</h3>';
    echo '<div class="projet-field"><label for="main_color">Couleur principale :</label><input type="color" id="main_color" name="main_color" value="' . esc_attr($main_color ?: '#862331') . '" /></div>';
    
    // Champ d'image de prévisualisation avec prévisualisation
    $image_preview = '';
    if ($preview_image_id) {
        $image_preview = wp_get_attachment_image($preview_image_id, 'thumbnail');
    }
    
    echo '<div class="projet-field">';
    echo '<label for="preview_image_id">Image de prévisualisation :</label>';
    echo '<div>';
    echo '<div id="preview-image-container" style="margin-bottom: 10px;">' . $image_preview . '</div>';
    echo '<input type="hidden" id="preview_image_id" name="preview_image_id" value="' . esc_attr($preview_image_id) . '" />';
    echo '<button type="button" id="upload_preview_image" class="button">Choisir une image</button> ';
    echo '<button type="button" id="remove_preview_image" class="button"' . ($preview_image_id ? '' : ' style="display:none;"') . '>Supprimer l\'image</button>';
    echo '</div></div>';
    
    // Script pour le sélecteur d'image
    echo '<script type="text/javascript">
    jQuery(document).ready(function($) {
        var mediaUploader;
        $("#upload_preview_image").on("click", function(e) {
            e.preventDefault();
            if (mediaUploader) {
                mediaUploader.open();
                return;
            }
            mediaUploader = wp.media({
                title: "Choisir une image de prévisualisation",
                button: {
                    text: "Utiliser cette image"
                },
                multiple: false
            });
            mediaUploader.on("select", function() {
                var attachment = mediaUploader.state().get("selection").first().toJSON();
                $("#preview_image_id").val(attachment.id);
                $("#preview-image-container").html("<img src=\"" + attachment.sizes.thumbnail.url + "\" alt=\"Preview\" />");
                $("#remove_preview_image").show();
            });
            mediaUploader.open();
        });
        $("#remove_preview_image").on("click", function(e) {
            e.preventDefault();
            $("#preview_image_id").val("");
            $("#preview-image-container").html("");
            $(this).hide();
        });
    });
    </script>';
}

// 4. Save Meta Box Data
function projets_save_meta_box_data($post_id)
{
    if (! isset($_POST['projets_meta_box_nonce']) || ! wp_verify_nonce($_POST['projets_meta_box_nonce'], 'projets_save_meta_box_data')) {
        return;
    }
    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
        return;
    }
    if (! current_user_can('edit_post', $post_id)) {
        return;
    }

    $fields = [
        'projet_date_debut' => 'sanitize_text_field',
        'projet_date_fin' => 'sanitize_text_field',
        'projet_lien' => 'esc_url_raw',
        'projet_is_featured' => 'boolval',
    ];
    
    // Champs additionnels sans préfixe '_'
    $additional_fields = [
        'main_color' => 'sanitize_text_field',
        'preview_image_id' => 'absint',
    ];

    foreach ($fields as $key => $sanitize_callback) {
        if (isset($_POST[$key])) {
            $value = call_user_func($sanitize_callback, $_POST[$key]);
            update_post_meta($post_id, '_' . $key, $value);
        } else {
            delete_post_meta($post_id, '_' . $key);
        }
    }
    
    // Traitement des champs additionnels (sans préfixe '_')
    foreach ($additional_fields as $key => $sanitize_callback) {
        if (isset($_POST[$key])) {
            $value = call_user_func($sanitize_callback, $_POST[$key]);
            update_post_meta($post_id, $key, $value);
        } else {
            delete_post_meta($post_id, $key);
        }
    }
}
add_action('save_post_projet', 'projets_save_meta_box_data');

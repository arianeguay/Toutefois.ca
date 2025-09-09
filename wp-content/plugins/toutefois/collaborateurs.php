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
    register_post_meta('collaborateur', '_collaborateur_type', array(
        'show_in_rest' => true,
        'single' => true,
        'type' => 'string',
    ));
    register_post_meta('collaborateur', '_collaborateur_image_id', array(
        'show_in_rest' => true,
        'single' => true,
        'type' => 'integer',
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

    $type = get_post_meta($post->ID, '_collaborateur_type', true);
    $bio = get_post_meta($post->ID, '_collaborateur_bio', true);
    $is_member = get_post_meta($post->ID, '_collaborateur_is_member', true);
    $image_id = get_post_meta($post->ID, '_collaborateur_image_id', true);
    echo '<style> .projet-field { display: grid; grid-template-columns: 150px 1fr; gap: 10px; margin-bottom: 15px; align-items: center; } .projet-field label { font-weight: bold; } .projet-field input, .projet-field textarea { width: 100%; } </style>';

    echo '<div class="projet-field"><label for="collaborateur_type">Type :</label><input type="text" id="collaborateur_type" name="collaborateur_type" value="' . esc_attr($type) . '" size="25" /></div>';
    echo '<div class="projet-field"><label for="collaborateur_bio">Bio :</label><textarea id="collaborateur_bio" name="collaborateur_bio" rows="4">' . esc_textarea($bio) . '</textarea></div>';
    echo '<div class="projet-field"><label for="collaborateur_is_member">Membre :</label><input type="checkbox" id="collaborateur_is_member" name="collaborateur_is_member" value="1" ' . checked($is_member, 1, false) . ' /></div>';

    echo '<div class="projet-field"><label for="collaborateur_image">Image :</label><div>';
    echo '<input type="hidden" name="collaborateur_image_id" id="collaborateur_image_id" value="' . esc_attr($image_id) . '" />';
    echo '<div id="collaborateur_image_preview">';
    if ($image_id) {
        echo wp_get_attachment_image($image_id, 'medium');
    }
    echo '</div>';
    echo '<input type="button" id="upload_image_button" class="button" value="' . __('Choisir une image', 'text_domain') . '" />';
    echo '<input type="button" id="remove_image_button" class="button" value="' . __('Supprimer l’image', 'text_domain') . '" />';
    echo '</div></div>';
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
        'collaborateur_type' => 'sanitize_text_field',
        'collaborateur_bio' => 'sanitize_textarea_field',
        'collaborateur_is_member' => 'boolval',
        'collaborateur_image_id' => 'intval',
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

// 5. Enqueue WordPress media scripts
function collaborateurs_enqueue_media_scripts()
{
    wp_enqueue_media();
}
add_action('admin_enqueue_scripts', 'collaborateurs_enqueue_media_scripts');

// 6. Inline script for media uploader
function collaborateurs_add_inline_media_script()
{
?>
    <script type="text/javascript">
        jQuery(document).ready(function($) {
            var mediaUploader;
            $('body').on('click', '#upload_image_button', function(e) {
                e.preventDefault();
                if (mediaUploader) {
                    mediaUploader.open();
                    return;
                }
                mediaUploader = wp.media.frames.file_frame = wp.media({
                    title: 'Choisir une image',
                    button: {
                        text: 'Choisir cette image'
                    },
                    multiple: false
                });
                mediaUploader.on('select', function() {
                    var attachment = mediaUploader.state().get('selection').first().toJSON();
                    $('#collaborateur_image_id').val(attachment.id);
                    $('#collaborateur_image_preview').html('<img src="' + attachment.url + '" style="max-width:100%;height:auto;">');
                });
                mediaUploader.open();
            });
            $('body').on('click', '#remove_image_button', function(e) {
                e.preventDefault();
                $('#collaborateur_image_id').val('');
                $('#collaborateur_image_preview').html('');
            });
        });
    </script>
<?php
}
add_action('admin_footer', 'collaborateurs_add_inline_media_script');
add_post_type_support('collaborateur', 'thumbnail');

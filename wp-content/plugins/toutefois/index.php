<?php
/**
 * Plugin Name: Toutefois - Custom Post Type
 * Description: Adds a custom post type for "Projets" with custom fields and changes the default post type to "Nouvelles".
 * Version: 1.0
 * Author: Ariane Guay
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit; // Exit if accessed directly.
}

// 1. Reverse Proxy Awareness
// The following lines are crucial for making WordPress work correctly behind a reverse proxy.
// They ensure that WordPress knows its correct public-facing address (HTTPS) and generates
// the right URLs for REST API calls, which is essential for the Gutenberg editor.
if (isset($_SERVER['HTTP_X_FORWARDED_PROTO']) && $_SERVER['HTTP_X_FORWARDED_PROTO'] === 'https') {
    $_SERVER['HTTPS'] = 'on';
}

if (isset($_SERVER['HTTP_X_FORWARDED_HOST'])) {
    $_SERVER['HTTP_HOST'] = $_SERVER['HTTP_X_FORWARDED_HOST'];
}

// Define site URLs to prevent misconfiguration issues.
// This hardcodes the correct URLs, avoiding potential errors where WordPress might guess the wrong ones.
if (!defined('WP_HOME')) {
    define('WP_HOME', 'https://admin.toutefois.arianeguay.ca');
}
if (!defined('WP_SITEURL')) {
    define('WP_SITEURL', 'https://admin.toutefois.arianeguay.ca');
}

// Include Components
require_once plugin_dir_path(__FILE__) . 'components/featured-carousel.php';
require_once plugin_dir_path(__FILE__) . 'components/projects-list.php';
require_once plugin_dir_path(__FILE__) . 'components/news-list.php';
require_once plugin_dir_path(__FILE__) . 'components/projects-page-grid.php';

// 1. Register Custom Post Type and Meta Fields
function projets_cpt_and_meta_init() {

    // CPT Labels
    $labels = array(
        'name'                  => _x( 'Projets', 'Post Type General Name', 'text_domain' ),
        'singular_name'         => _x( 'Projet', 'Post Type Singular Name', 'text_domain' ),
        'menu_name'             => __( 'Projets', 'text_domain' ),
        'name_admin_bar'        => __( 'Projet', 'text_domain' ),
        'archives'              => __( 'Archives des Projets', 'text_domain' ),
        'attributes'            => __( 'Attributs du Projet', 'text_domain' ),
        'parent_item_colon'     => __( 'Projet Parent :', 'text_domain' ),
        'all_items'             => __( 'Tous les Projets', 'text_domain' ),
        'add_new_item'          => __( 'Ajouter un nouveau Projet', 'text_domain' ),
        'add_new'               => __( 'Ajouter', 'text_domain' ),
        'new_item'              => __( 'Nouveau Projet', 'text_domain' ),
        'edit_item'             => __( 'Modifier le Projet', 'text_domain' ),
        'update_item'           => __( 'Mettre à jour le Projet', 'text_domain' ),
        'view_item'             => __( 'Voir le Projet', 'text_domain' ),
        'view_items'            => __( 'Voir les Projets', 'text_domain' ),
        'search_items'          => __( 'Rechercher un Projet', 'text_domain' ),
        'not_found'             => __( 'Non trouvé', 'text_domain' ),
        'not_found_in_trash'    => __( 'Non trouvé dans la corbeille', 'text_domain' ),
        'featured_image'        => __( 'Image à la une', 'text_domain' ),
        'set_featured_image'    => __( 'Définir l’image à la une', 'text_domain' ),
        'remove_featured_image' => __( 'Supprimer l’image à la une', 'text_domain' ),
        'use_featured_image'    => __( 'Utiliser comme image à la une', 'text_domain' ),
        'insert_into_item'      => __( 'Insérer dans le Projet', 'text_domain' ),
        'uploaded_to_this_item' => __( 'Téléversé sur ce Projet', 'text_domain' ),
        'items_list'            => __( 'Liste des Projets', 'text_domain' ),
        'items_list_navigation' => __( 'Navigation de la liste des Projets', 'text_domain' ),
        'filter_items_list'     => __( 'Filtrer la liste des Projets', 'text_domain' ),
    );

    // CPT Arguments
    $args = array(
        'label'                 => __( 'Projet', 'text_domain' ),
        'description'           => __( 'Contenu de type Projet', 'text_domain' ),
        'labels'                => $labels,
        'supports'              => array( 'title', 'editor', 'excerpt', 'thumbnail' ),
        'taxonomies'            => array( 'category', 'post_tag' ),
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
    register_post_type( 'projet', $args );

    // Register Meta Fields for REST API
    register_post_meta( 'projet', '_projet_type', array(
        'show_in_rest' => true,
        'single' => true,
        'type' => 'string',
    ) );
    register_post_meta( 'projet', '_projet_credits', array(
        'show_in_rest' => true,
        'single' => true,
        'type' => 'string',
    ) );
    register_post_meta( 'projet', '_projet_personnes', array(
        'show_in_rest' => true,
        'single' => true,
        'type' => 'string',
    ) );
    register_post_meta( 'projet', '_projet_date_debut', array(
        'show_in_rest' => true,
        'single' => true,
        'type' => 'string',
    ) );
    register_post_meta( 'projet', '_projet_date_fin', array(
        'show_in_rest' => true,
        'single' => true,
        'type' => 'string',
    ) );
    register_post_meta( 'projet', '_projet_lien', array(
        'show_in_rest' => true,
        'single' => true,
        'type' => 'string',
    ) );
    register_post_meta( 'projet', '_projet_image_id', array(
        'show_in_rest' => true,
        'single' => true,
        'type' => 'integer',
    ) );
    register_post_meta( 'projet', '_projet_is_featured', array(
        'show_in_rest' => true,
        'single' => true,
        'type' => 'boolean',
    ) );
}
add_action( 'init', 'projets_cpt_and_meta_init', 0 );

// 2. Add Meta Boxes
function projets_add_meta_boxes() {
    add_meta_box(
        'projets_custom_fields',
        'Détails du Projet',
        'projets_meta_box_callback',
        'projet',
        'normal',
        'high'
    );
}
add_action( 'add_meta_boxes', 'projets_add_meta_boxes' );

// 3. Meta Box Callback
function projets_meta_box_callback( $post ) {
    wp_nonce_field( 'projets_save_meta_box_data', 'projets_meta_box_nonce' );

    $type = get_post_meta( $post->ID, '_projet_type', true );
    $credits = get_post_meta( $post->ID, '_projet_credits', true );
    $personnes = get_post_meta( $post->ID, '_projet_personnes', true );
    $date_debut = get_post_meta( $post->ID, '_projet_date_debut', true );
    $date_fin = get_post_meta( $post->ID, '_projet_date_fin', true );
    $lien = get_post_meta( $post->ID, '_projet_lien', true );
    $image_id = get_post_meta( $post->ID, '_projet_image_id', true );
    $is_featured = get_post_meta( $post->ID, '_projet_is_featured', true );

    echo '<style> .projet-field { display: grid; grid-template-columns: 150px 1fr; gap: 10px; margin-bottom: 15px; align-items: center; } .projet-field label { font-weight: bold; } .projet-field input, .projet-field textarea { width: 100%; } </style>';

    echo '<div class="projet-field"><label for="projet_type">Type :</label><input type="text" id="projet_type" name="projet_type" value="' . esc_attr( $type ) . '" size="25" /></div>';
    echo '<div class="projet-field"><label for="projet_credits">Crédits :</label><textarea id="projet_credits" name="projet_credits" rows="4">' . esc_textarea( $credits ) . '</textarea></div>';
    echo '<div class="projet-field"><label for="projet_personnes">Personnes impliquées :</label><textarea id="projet_personnes" name="projet_personnes" rows="4">' . esc_textarea( $personnes ) . '</textarea></div>';
    echo '<div class="projet-field"><label for="projet_date_debut">Date de début :</label><input type="date" id="projet_date_debut" name="projet_date_debut" value="' . esc_attr( $date_debut ) . '" /></div>';
    echo '<div class="projet-field"><label for="projet_date_fin">Date de fin :</label><input type="date" id="projet_date_fin" name="projet_date_fin" value="' . esc_attr( $date_fin ) . '" /></div>';
    echo '<div class="projet-field"><label for="projet_lien">Lien de réservation :</label><input type="url" id="projet_lien" name="projet_lien" value="' . esc_attr( $lien ) . '" size="25" /></div>';
    echo '<div class="projet-field"><label for="projet_is_featured">Projet vedette :</label><input type="checkbox" id="projet_is_featured" name="projet_is_featured" value="1" ' . checked( $is_featured, 1, false ) . ' /></div>';

    echo '<div class="projet-field"><label for="projet_image">Image :</label><div>';
    echo '<input type="hidden" name="projet_image_id" id="projet_image_id" value="' . esc_attr( $image_id ) . '" />';
    echo '<div id="projet_image_preview">';
    if ( $image_id ) { echo wp_get_attachment_image( $image_id, 'medium' ); }
    echo '</div>';
    echo '<input type="button" id="upload_image_button" class="button" value="' . __( 'Choisir une image', 'text_domain' ) . '" />';
    echo '<input type="button" id="remove_image_button" class="button" value="' . __( 'Supprimer l’image', 'text_domain' ) . '" />';
    echo '</div></div>';
}

// 4. Save Meta Box Data
function projets_save_meta_box_data( $post_id ) {
    if ( ! isset( $_POST['projets_meta_box_nonce'] ) || ! wp_verify_nonce( $_POST['projets_meta_box_nonce'], 'projets_save_meta_box_data' ) ) {
        return;
    }
    if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
        return;
    }
    if ( ! current_user_can( 'edit_post', $post_id ) ) {
        return;
    }

    $fields = [
        'projet_type' => 'sanitize_text_field',
        'projet_credits' => 'sanitize_textarea_field',
        'projet_personnes' => 'sanitize_textarea_field',
        'projet_date_debut' => 'sanitize_text_field',
        'projet_date_fin' => 'sanitize_text_field',
        'projet_lien' => 'esc_url_raw',
        'projet_image_id' => 'intval',
        'projet_is_featured' => 'boolval',
    ];

    foreach ( $fields as $key => $sanitize_callback ) {
        if ( isset( $_POST[$key] ) ) {
            $value = call_user_func( $sanitize_callback, $_POST[$key] );
            update_post_meta( $post_id, '_' . $key, $value );
        } else {
            delete_post_meta( $post_id, '_' . $key );
        }
    }
}
add_action( 'save_post_projet', 'projets_save_meta_box_data' );

// 5. Enqueue WordPress media scripts
function projets_enqueue_media_scripts() {
    wp_enqueue_media();
}
add_action( 'admin_enqueue_scripts', 'projets_enqueue_media_scripts' );

// 6. Inline script for media uploader
function projets_add_inline_media_script() {
    ?>
    <script type="text/javascript">
        jQuery(document).ready(function($){
            var mediaUploader;
            $('body').on('click', '#upload_image_button', function(e) {
                e.preventDefault();
                if (mediaUploader) {
                    mediaUploader.open();
                    return;
                }
                mediaUploader = wp.media.frames.file_frame = wp.media({
                    title: 'Choisir une image',
                    button: { text: 'Choisir cette image' },
                    multiple: false
                });
                mediaUploader.on('select', function() {
                    var attachment = mediaUploader.state().get('selection').first().toJSON();
                    $('#projet_image_id').val(attachment.id);
                    $('#projet_image_preview').html('<img src="' + attachment.url + '" style="max-width:100%;height:auto;">');
                });
                mediaUploader.open();
            });
            $('body').on('click', '#remove_image_button', function(e) {
                e.preventDefault();
                $('#projet_image_id').val('');
                $('#projet_image_preview').html('');
            });
        });
    </script>
    <?php
}
add_action( 'admin_footer', 'projets_add_inline_media_script' );

// 7. Rename Posts to "Nouvelles"
function rename_posts_to_nouvelles() {
    global $wp_post_types;

    $labels = &$wp_post_types['post']->labels;
    $labels->name = 'Nouvelles';
    $labels->singular_name = 'Nouvelle';
    $labels->add_new = 'Ajouter';
    $labels->add_new_item = 'Ajouter une Nouvelle';
    $labels->edit_item = 'Modifier la Nouvelle';
    $labels->new_item = 'Nouvelle';
    $labels->view_item = 'Voir la Nouvelle';
    $labels->search_items = 'Rechercher une Nouvelle';
    $labels->not_found = 'Aucune nouvelle trouvée';
    $labels->not_found_in_trash = 'Aucune nouvelle trouvée dans la corbeille';
    $labels->all_items = 'Toutes les Nouvelles';
    $labels->menu_name = 'Nouvelles';
    $labels->name_admin_bar = 'Nouvelle';
}
add_action( 'init', 'rename_posts_to_nouvelles' );

// 8. Expose menu to REST API
function get_menu() {
    // Replace 'primary' with your menu location if different
    $menu_name = 'primary';
    $locations = get_nav_menu_locations();
    if (isset($locations[$menu_name])) {
        $menu = wp_get_nav_menu_object($locations[$menu_name]);
        $menu_items = wp_get_nav_menu_items($menu->term_id);
        return $menu_items;
    }
    return [];
}

add_action('rest_api_init', function () {
    register_rest_route('toutefois/v1', '/menu', array(
        'methods' => 'GET',
        'callback' => 'get_menu',
        'permission_callback' => '__return_true' // Make public
    ));
});

// 9. Add CORS headers for REST API
function add_cors_http_header() {
    // Allow requests from your frontend domain
    $allowed_origins = array(
        'https://toutefois.arianeguay.ca',
        'http://localhost:3000', // For development
        'http://localhost:5173'  // For Vite dev server
    );
    
    $origin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '';
    
    if (in_array($origin, $allowed_origins)) {
        header("Access-Control-Allow-Origin: $origin");
    }
    
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization, X-WP-Nonce");
    header("Access-Control-Allow-Credentials: true");
    
    // Handle preflight OPTIONS requests
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        status_header(200);
        exit();
    }
}
add_action('init', 'add_cors_http_header');

// 10. Add CORS headers specifically for REST API requests
function add_cors_rest_headers($response, $handler, $request) {
    $allowed_origins = array(
        'https://toutefois.arianeguay.ca',
        'http://localhost:3000',
        'http://localhost:5173'
    );
    
    $origin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '';
    
    if (in_array($origin, $allowed_origins)) {
        $response->header('Access-Control-Allow-Origin', $origin);
    }
    
    $response->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    $response->header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-WP-Nonce');
    $response->header('Access-Control-Allow-Credentials', 'true');
    
    return $response;
}
add_filter('rest_pre_serve_request', 'add_cors_rest_headers', 10, 3);

// 11. Register Gutenberg Blocks
function toutefois_register_blocks() {
    $block_folders = glob(plugin_dir_path(__FILE__) . 'build/*', GLOB_ONLYDIR);
    foreach ($block_folders as $block_folder) {
        register_block_type($block_folder);
    }
}
add_action('init', 'toutefois_register_blocks');



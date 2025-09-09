<?php

/**
 * Description: Changes the default post type to "Nouvelles".
 * Version: 1.0
 * Author: Ariane Guay
 */

function rename_posts_to_nouvelles()
{
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
add_action('init', 'rename_posts_to_nouvelles');

# Guide d'édition du contenu

Ce guide explique comment éditer le contenu du site Toutefois en utilisant l'éditeur WordPress (Gutenberg) et les blocs personnalisés.

## Connexion à WordPress

1. Accédez à `https://admin.toutefois.arianeguay.ca/wp-admin`
2. Entrez votre nom d'utilisateur et mot de passe
3. Vous arriverez sur le tableau de bord WordPress

<SCREENSHOT> Écran de connexion WordPress
<SCREENSHOT> Tableau de bord et menu de gauche

## L'éditeur Gutenberg

WordPress utilise un éditeur appelé Gutenberg qui fonctionne avec des "blocs" de contenu. Cela ressemble à l'assemblage de blocs Lego pour construire vos pages.

Liens utiles WordPress:
- Éditeur de blocs (Gutenberg): https://wordpress.org/documentation/article/wordpress-block-editor/
- Vue d’ensemble de l’éditeur: https://wordpress.org/documentation/article/block-editor-screen-overview/

### Principes de base de Gutenberg

1. **Blocs** : Chaque élément (texte, image, vidéo, liste, etc.) est un bloc individuel
2. **Ajouter des blocs** : Cliquez sur le "+" en haut à gauche de l'éditeur
3. **Déplacer des blocs** : Utilisez les flèches ou glissez-déposez
4. **Supprimer des blocs** : Sélectionnez et appuyez sur Supprimer/Backspace

<SCREENSHOT> Bouton "+" pour ajouter un bloc
<VIDEO> Déplacer des blocs (glisser-déposer) et supprimer un bloc

## Blocs standards utiles

### Paragraphe
Pour le texte normal. Options : taille, couleur, style.

### Titre
Pour les titres et sous-titres (H2, H3, H4, etc.).

### Image
Pour ajouter des images. Options : taille, alignement, légende.

Documentation WordPress:
- Bibliothèque des médias: https://wordpress.org/documentation/article/media-library-screen/
- Téléverser des médias: https://wordpress.org/documentation/article/media-add-new-screen/

<SCREENSHOT> Insertion d’une image via la Bibliothèque des médias

### Galerie
Pour ajouter plusieurs images en grille.

### Liste
Pour créer des listes à puces ou numérotées.

### Citation
Pour mettre en évidence une citation.

### Bouton
Pour ajouter un bouton cliquable avec lien.

## Blocs personnalisés Toutefois

Le site dispose de blocs personnalisés spécifiques à Toutefois :

### Bloc Carousel de contenu

Affiche un carrousel de projets, nouvelles ou contenu mixte.

**Comment l'utiliser :**
1. Ajoutez un bloc "Content Carousel"
2. Dans les paramètres à droite, choisissez :
   - Type de contenu (Projets, Nouvelles, Mixte)
   - Titre du carrousel
   - Nombre d'éléments à afficher
   - URL "Voir tout"
3. Vous pouvez également ajouter une description

<SCREENSHOT> Réglages du bloc « Content Carousel » dans la colonne de droite
<VIDEO> Création d’un carousel: ajout, configuration, mise à jour

### Bloc Liste de projets

Affiche une liste ou grille de projets.

**Comment l'utiliser :**
1. Ajoutez un bloc "Projects List"
2. Configurez les options :
   - Affichage (Grille ou Liste)
   - Filtres de catégories
   - Nombre de projets
   - Ordre d'affichage

<SCREENSHOT> Réglages du bloc « Projects List »

### Bloc Liste de nouvelles

Affiche les dernières actualités.

**Comment l'utiliser :**
1. Ajoutez un bloc "News List"
2. Configurez :
   - Source (WordPress, Facebook, ou les deux)
   - Nombre d'articles
   - Style d'affichage

<SCREENSHOT> Réglages du bloc « News List »

### Bloc Collaborateurs

Affiche les membres de l'équipe.

**Comment l'utiliser :**
1. Ajoutez un bloc "Collaborators"
2. Choisissez :
   - Type de collaborateurs (Permanents, Invités, etc.)
   - Style d'affichage
   - Ordre (alphabétique, par rôle, etc.)

<SCREENSHOT> Réglages du bloc « Collaborators »

## Conseils pour l'édition

### Images

- **Tailles recommandées** :
  - Images de projets : 1200 × 800 pixels minimum
  - Photos de collaborateurs : 800 × 800 pixels (carrées)
  - Bannières : 1920 × 600 pixels

- **Optimisation** :
  - Utilisez des formats JPG pour les photos
  - Utilisez des formats PNG pour les graphiques avec transparence
  - Compressez les images avant de les téléverser (via TinyPNG par exemple)

Liens utiles WordPress:
- Images à la Une: https://wordpress.org/documentation/article/featured-images/

### Texte

- Utilisez les niveaux de titres de façon cohérente :
  - H2 pour les sections principales
  - H3 pour les sous-sections
  - H4 pour les points spécifiques
- Évitez les paragraphes trop longs
- Utilisez les listes à puces pour améliorer la lisibilité

### Liens

- Donnez des noms descriptifs aux liens (évitez "cliquez ici")
- Vérifiez que les liens externes s'ouvrent dans un nouvel onglet
- Assurez-vous que tous les liens fonctionnent

## Prévisualisation et publication

1. **Prévisualisation** : Cliquez sur "Aperçu" en haut à droite pour voir les changements avant publication
2. **Brouillon** : Enregistrez en brouillon si vous n'avez pas terminé
3. **Publication** : Cliquez sur "Publier" quand tout est prêt

La publication d'un contenu le rend immédiatement visible sur le site public (après un court délai de mise à jour).

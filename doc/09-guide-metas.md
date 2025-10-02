# Guide très détaillé: Mettre à jour les métadonnées (metas)

Ce guide pas-à-pas s’adresse à des personnes avec très peu d’expérience informatique. Il explique où cliquer et quoi faire pour mettre à jour les « métadonnées » d’un contenu sur WordPress.

Les métadonnées sont des informations supplémentaires qui ne sont pas dans le texte principal, par exemple: dates, couleur principale, image de prévisualisation, projet principal, etc.

---

## Où sont les métadonnées?

Les métadonnées se trouvent dans des encadrés (boîtes) sur la page d’édition d’un contenu dans WordPress. Selon le type de contenu, vous verrez des sections différentes.

- Pour **Projets**: vous verrez une boîte « Détails du Projet » et une section « Apparence ». Vous verrez aussi une boîte « Main Project » dans la colonne de droite.
- Pour **Articles (Nouvelles)**: vous verrez la boîte « Main Project » dans la colonne de droite (pour associer l’article à un projet principal).
- Pour **Collaborateurs**: vous verrez la boîte « Main Project » dans la colonne de droite avec une sélection multiple.

---

## Avant de commencer

1. Connectez-vous à l’administration: `https://admin.toutefois.arianeguay.ca/wp-admin`
2. Dans le menu de gauche, choisissez le type de contenu que vous voulez modifier:
   - Projets: « Projets » → « Tous les Projets », puis cliquez sur le projet.
   - Articles: « Articles » → « Tous les articles », puis cliquez sur l’article.
   - Collaborateurs: « Collaborateurs » → « Tous », puis cliquez sur la personne.

<SCREENSHOT> Écran de connexion WordPress (wp-admin)
<SCREENSHOT> Tableau de bord WordPress et menu de gauche

Liens utiles WordPress:
- Éditeur de blocs (Gutenberg): https://wordpress.org/documentation/article/wordpress-block-editor/
- Vue d’ensemble de l’éditeur: https://wordpress.org/documentation/article/block-editor-screen-overview/

---

## Metas pour les Projets

Quand vous éditez un **Projet**, cherchez les boîtes suivantes:

### 1) Détails du Projet

- **Date de début**: Cliquez dans le champ, choisissez la date dans le calendrier.
- **Date de fin**: Idem. Laissez vide si la fin n’est pas connue.
- **Lien de réservation**: Copiez-collez l’URL (adresse web) vers la billetterie.
- **Projet vedette**: Cochez si ce projet doit être mis en avant (vedette).

Après avoir rempli ces champs, descendez plus bas si besoin.

### 2) Apparence (couleur et image de prévisualisation)

- **Couleur principale**:
  1. Cliquez sur le carré de couleur.
  2. Choisissez une couleur qui représente le projet.
  3. Conseil: gardez un bon contraste avec le texte.

- **Image de prévisualisation**:
  1. Cliquez sur « Choisir une image ».
  2. Dans la fenêtre qui s’ouvre, sélectionnez une image existante OU téléversez-en une nouvelle (onglet « Téléverser des fichiers » → « Déposer des fichiers » ou « Sélectionner des fichiers »).
  3. Cliquez sur « Utiliser cette image ».
  4. Pour supprimer l’image, cliquez sur « Supprimer l’image ».

<SCREENSHOT> Boutons « Choisir une image » et « Supprimer l’image » (section Apparence)
<SCREENSHOT> Fenêtre Bibliothèque des médias (onglets Bibliothèque/Téléverser)
<VIDEO> Sélectionner et téléverser une image dans la Bibliothèque des médias

Documentation WordPress:
- Bibliothèque des médias: https://wordpress.org/documentation/article/media-library-screen/
- Téléverser des médias: https://wordpress.org/documentation/article/media-add-new-screen/

Cette image sert dans certaines listes ou menus pour illustrer le projet.

### 3) Main Project (colonne de droite)

- **Main Project** (case à cocher):
  - Cochez si ce projet est un « Projet principal » (une production phare ou un projet chapeau).
  - Si vous cochez cette case, le projet ne doit pas avoir de « parent » (WordPress s’en occupe automatiquement).

- **Associated Main Project** (liste déroulante):
  - Si votre projet est un **sous-projet**, sélectionnez le **Projet principal** auquel il appartient.
  - Laissez sur « — None — » si ce n’est pas un sous-projet.

- **Show only inside its Main Project context** (option avancée):
  - Laissez décoché si vous n’êtes pas sûr. C’est pour cacher le projet des listes générales et ne l’afficher que dans le contexte d’un Projet principal donné.

<SCREENSHOT> Boîte « Main Project » (case à cocher et liste déroulante)
<VIDEO> Associer un projet à un Projet principal (sélection et enregistrement)

### 4) Image à la Une (colonne de droite)

- Cliquez sur « Définir l’image à la Une ».
- Sélectionnez ou téléversez l’image principale du projet (visuel clé).

<SCREENSHOT> Panneau « Image mise en avant » et bouton « Définir »
<VIDEO> Choisir une image à la Une depuis la Bibliothèque

Documentation WordPress:
- Images à la Une: https://wordpress.org/documentation/article/featured-images/

### 5) Enregistrer

- Cliquez sur **Mettre à jour** (ou **Publier**) en haut à droite.
- Attendez quelques secondes; les changements apparaîtront bientôt sur le site public.

---

## Metas pour les Articles (Nouvelles)

Quand vous éditez un **Article**:

- **Main Project** (colonne de droite):
  - Dans « Associated Main Project », sélectionnez le Projet principal auquel l’article est lié, si applicable.
  - Laissez « — None — » si l’article est général.

- **Show only inside its Main Project context**:
  - Laissez décoché sauf si vous voulez que l’article n’apparaisse que dans la page du Projet principal.

- **Image mise en avant** (colonne de droite):
  - Définissez une image à la Une pour illustrer l’article.

<SCREENSHOT> Panneau « Image mise en avant » pour un Article

Documentation WordPress:
- Images à la Une: https://wordpress.org/documentation/article/featured-images/

- Cliquez sur **Mettre à jour** (ou **Publier**).

---

## Metas pour les Collaborateurs

Quand vous éditez un **Collaborateur**:

- **Associated Main Projects** (sélection multiple dans la boîte « Main Project », colonne de droite):
  1. Cliquez dans la grande liste.
  2. Pour sélectionner plusieurs projets: maintenez la touche **Ctrl** (Windows) ou **Cmd** (Mac) enfoncée et cliquez sur les projets.
  3. Pour désélectionner: refaites un clic en gardant Ctrl/Cmd enfoncé.

<SCREENSHOT> Sélection multiple des Projets principaux (Collaborateur)
<VIDEO> Associer/dissocier plusieurs Projets principaux à un Collaborateur

- **Show only inside its Main Project context**:
  - Laissez décoché sauf si vous voulez que le collaborateur n’apparaisse que sur les pages des projets sélectionnés.

- Ajoutez **Photo** (image à la Une) et **Biographie** dans le contenu principal.

- Cliquez sur **Mettre à jour** (ou **Publier**).

---

## Options du site (lien de don, messages d’erreur)

Certains réglages globaux se trouvent dans **Réglages → Toutefois Options**:

- **Lien de donation**: Collez l’URL de la page « Faire un don ». Elle sera utilisée dans l’en-tête et le pied de page.
- **Titres et messages d’erreur**: Textes utilisés sur les pages d’erreur.

Cliquez sur **Enregistrer les modifications**.

<SCREENSHOT> Page « Toutefois Options » (Réglages)

---

## Conseils pratiques

- **Toujours enregistrer**: Après des changements, cliquez sur « Mettre à jour ».
- **Images**: Préférez des images de bonne qualité mais pas trop lourdes (moins de 500 Ko si possible). Utilisez JPG pour les photos, PNG pour les logos avec transparence.
- **Couleurs**: Choisissez une couleur principale lisible avec le texte; testez l’aperçu.
- **Dates**: Si vous n’avez pas la date de fin, laissez le champ vide.
- **Aperçu**: Utilisez « Aperçu » pour vérifier avant de publier.

---

## Dépannage (si quelque chose ne marche pas)

- **Je ne vois pas les boîtes (métadonnées)**: Dans l’écran d’édition, cliquez sur l’icône en haut à droite (options) et vérifiez les « Préférences » → « Panneaux ». Assurez-vous que les boîtes sont affichées.

Documentation WordPress:
- Préférences de l’éditeur / interface: https://wordpress.org/documentation/article/block-editor-screen-overview/
- **L’image ne s’affiche pas sur le site**: Vérifiez que l’image à la Une est bien définie. Patientez quelques minutes.
- **L’article/le projet n’apparaît pas**: Vérifiez qu’il est **Publié** (pas en Brouillon). Assurez-vous que « Show only inside its Main Project context » n’est pas coché par erreur.
- **Le lien de réservation ne fonctionne pas**: Vérifiez que l’adresse commence par `https://` et est correcte.

---

## Récapitulatif rapide (checklist)

- Projet:
  - [ ] Dates (début/fin)
  - [ ] Lien de réservation
  - [ ] Projet vedette? (si oui)
  - [ ] Couleur principale
  - [ ] Image de prévisualisation
  - [ ] Projet principal associé (si sous-projet)
  - [ ] Image à la Une
  - [ ] Mettre à jour

- Article:
  - [ ] Projet principal associé (facultatif)
  - [ ] Image à la Une
  - [ ] Mettre à jour

- Collaborateur:
  - [ ] Projets principaux associés (un ou plusieurs)
  - [ ] Photo (image à la Une)
  - [ ] Biographie
  - [ ] Mettre à jour

- Options du site:
  - [ ] Lien de donation
  - [ ] Enregistrer les modifications

---

Besoin d’aide? Ouvrez la FAQ: `doc/08-faq.md` ou contactez l’administrateur technique.

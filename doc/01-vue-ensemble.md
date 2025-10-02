# Vue d'ensemble du projet Toutefois

## Introduction

Le site Toutefois est une plateforme web moderne construite en utilisant une architecture "headless". Cela signifie que le site est divisé en deux parties principales qui fonctionnent ensemble :

1. **WordPress** (backend) - Gère le contenu et l'administration
2. **Next.js** (frontend) - Affiche le contenu aux visiteurs du site

Cette séparation permet d'avoir un site web performant avec une interface utilisateur moderne tout en conservant la facilité d'administration de WordPress.

## Architecture du projet

```
Toutefois.ca
├── wp-content/ - Backend WordPress (Administration)
│   ├── plugins/toutefois/ - Plugin personnalisé pour le site
│   ├── themes/ - Thèmes WordPress
├── frontend/ - Frontend Next.js (Site public)
│   ├── app/ - Pages et routes du site
│   ├── src/ - Code source des composants
│   └── public/ - Ressources statiques
├── docker/ - Configuration Docker pour le développement
└── nginx/ - Configuration du serveur web
```

## Comment fonctionne le site

1. **Création de contenu** : Les administrateurs créent et modifient le contenu dans WordPress (articles, projets, pages, etc.)

2. **API REST** : WordPress expose ce contenu via une API REST (une interface qui permet aux applications de communiquer)

3. **Affichage** : Le frontend Next.js récupère ce contenu via l'API et l'affiche aux visiteurs de manière optimisée

4. **Mise à jour** : Quand le contenu est modifié dans WordPress, le frontend est automatiquement mis à jour

## Types de contenu

Le site Toutefois gère plusieurs types de contenu :

- **Projets** (Projets théâtraux)
- **Nouvelles** (Actualités)
- **Pages** (Pages statiques comme "À propos")
- **Collaborateurs** (Membres de l'équipe)

## Avantages de cette architecture

- **Performance** : Site rapide et réactif pour les visiteurs
- **Facilité d'utilisation** : Interface WordPress familière pour gérer le contenu
- **Flexibilité** : Possibilité d'ajouter de nouvelles fonctionnalités facilement
- **SEO** : Optimisation pour les moteurs de recherche
- **Sécurité** : Séparation du panneau d'administration et du site public

# Déploiement et maintenance

Cette section explique comment le site Toutefois est déployé et maintenu. Elle est principalement destinée aux administrateurs techniques, mais fournit des informations utiles pour comprendre comment fonctionne l'infrastructure.

## Architecture de déploiement

Le site Toutefois utilise une architecture moderne avec deux environnements séparés :

1. **Backend WordPress** : Hébergé sur un serveur LEMP (Linux, Nginx, MySQL, PHP)
2. **Frontend Next.js** : Déployé sur Vercel (plateforme d'hébergement spécialisée)

## Processus de déploiement automatisé

Le site utilise l'intégration continue (CI/CD) pour se déployer automatiquement :

### Déploiement WordPress

Quand des modifications sont apportées au plugin personnalisé Toutefois :

1. Les changements sont poussés vers le dépôt GitHub
2. GitHub Actions construit le plugin (compile les blocs Gutenberg)
3. Les fichiers sont déployés sur le serveur WordPress

### Déploiement Frontend

Quand des modifications sont apportées au code frontend :

1. Les changements sont poussés vers le dépôt GitHub
2. Vercel détecte automatiquement les changements
3. Vercel construit et déploie la nouvelle version du site
4. Le site est mis à jour sans temps d'arrêt

### Vercel Deploy Hooks

Le site utilise des "deploy hooks" (déclencheurs de déploiement) pour automatiser certaines tâches :

- Quand du contenu important est modifié dans WordPress, le frontend est automatiquement reconstruit
- Cela assure que le site public reflète toujours le contenu le plus récent

## Environnements

Le site dispose de plusieurs environnements :

1. **Production** : Site public live (`https://toutefois.arianeguay.ca`)
2. **Prévisualisation** : Version de prévisualisation pour tester les changements
3. **Développement** : Environnement local pour les développeurs

## Gestion des URL

Le site utilise la configuration suivante pour les URL :

- **Frontend public** : `https://toutefois.arianeguay.ca`
- **Administration WordPress** : `https://admin.toutefois.ca`

## Configuration serveur

### Docker

Le développement local utilise Docker pour créer un environnement cohérent :

```
docker/
├── apache/ - Configuration Apache
├── Dockerfile - Instructions de construction du conteneur
└── php.ini - Configuration PHP
```

### Nginx

Le serveur de production utilise Nginx comme serveur web et proxy inverse :

```
nginx/
├── sites-available/
│   ├── admin.toutefois.ca.conf - Config pour l'admin WordPress
│   ├── nginx.conf - Configuration principale
│   └── toutefois.arianeguay.ca.conf - Config pour le frontend
```

## Mise à jour de WordPress

Pour maintenir le site sécurisé, il est important de mettre à jour régulièrement WordPress :

1. **Sauvegardes** : Toujours créer une sauvegarde avant la mise à jour
2. **Mises à jour mineures** : Peuvent généralement être faites automatiquement
3. **Mises à jour majeures** : Doivent être planifiées et testées

## Dépannage courant

### Problème : Le contenu mis à jour dans WordPress n'apparaît pas sur le site

**Solution** :

1. Vérifiez que le contenu est bien publié (pas en brouillon)
2. Déclenchez manuellement une reconstruction du site via Vercel

### Problème : Images qui ne s'affichent pas

**Solution** :

1. Vérifiez que l'image est bien téléversée dans WordPress
2. Assurez-vous que le domaine de l'image est configuré dans Next.js (remotePatterns)

### Problème : Erreurs 404 sur certaines pages

**Solution** :

1. Vérifiez que la page existe dans WordPress
2. Assurez-vous que le slug (URL) correspond
3. Vérifiez les journaux d'erreur Vercel pour plus de détails

## Contacts pour support technique

En cas de problèmes techniques majeurs, contactez :

- **Ariane Guay** - Développeuse principale
- Ou créez une issue dans le dépôt GitHub du projet

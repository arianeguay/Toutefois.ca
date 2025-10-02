# Frontend Next.js

## Qu'est-ce que Next.js ?

Next.js est un framework moderne basé sur React qui permet de créer des sites web rapides, interactifs et optimisés pour le référencement (SEO). Dans le projet Toutefois, Next.js est utilisé pour créer l'interface que vos visiteurs verront.

## Structure du frontend

```
frontend/
├── app/ - Pages et routes du site
│   ├── [[...path]]/ - Route dynamique pour toutes les pages
│   ├── layout.tsx - Structure générale du site
│   └── globals.css - Styles globaux
├── src/
│   ├── api/ - Communication avec WordPress
│   ├── layout/ - Composants de mise en page (Header, Footer)
│   ├── components/ - Composants réutilisables
│   └── types/ - Définitions des types de données
└── public/ - Ressources statiques (logo, favicon, etc.)
```

## Comment le frontend communique avec WordPress

1. Le frontend utilise une classe API (`src/api/index.ts`) pour récupérer les données de WordPress
2. Cette classe fait des requêtes à l'API REST de WordPress
3. Les données récupérées sont ensuite affichées dans les composants React

### Exemple : Récupération des projets

```typescript
// Dans le code frontend
async function getProjects() {
  const projects = await api.fetchAllProjects();
  return projects;
}
```

## Pages principales

Le site Toutefois utilise un système de routage dynamique avec Next.js :

- La route principale (`app/[[...path]]/page.tsx`) gère presque toutes les pages
- Elle récupère le contenu correspondant à l'URL demandée depuis WordPress
- Elle affiche le contenu avec le template approprié

## Composants importants

### Header (Entête)

Le Header contient :
- Logo de Toutefois
- Menu de navigation principal
- Menu des projets spéciaux
- Lien de don

### Cards (Cartes)

Les composants Card sont utilisés pour afficher :
- Projets
- Nouvelles
- Et autres contenus

### Footer (Pied de page)

Le Footer contient :
- Informations de contact
- Liens réseaux sociaux
- Crédits et copyright

## Styles et apparence

Le site utilise :
- **Styled Components** : Pour le style CSS directement dans les composants
- **Polices personnalisées** : Montserrat, Poppins, etc.
- **Design responsive** : S'adapte aux mobiles et tablettes

## Optimisations

Le frontend inclut plusieurs optimisations :

- **Images optimisées** : Via Next.js Image pour le chargement rapide
- **Chargement progressif** : Les éléments se chargent progressivement
- **Mise en cache** : Pour améliorer les performances

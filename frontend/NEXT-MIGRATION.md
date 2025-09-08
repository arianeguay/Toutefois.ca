# Next.js Migration Guide

This document outlines the steps for migrating the Toutefois.ca frontend from Vite/React Router to Next.js.

## Migration Overview

The migration involves the following key changes:

1. **Framework Change**: Moving from Vite + React Router to Next.js
2. **Routing System**: Migrating from React Router to Next.js App Router
3. **API Integration**: Updating API calls to work with Next.js data fetching
4. **Component Structure**: Adapting components with client/server separation
5. **Styling**: Maintaining styled-components compatibility with Next.js

## Migration Steps

### 1. Complete the File Migration

Run the migration script to rename all prepared Next.js files:

```powershell
# On Windows
./migrate-to-nextjs.ps1
```

This script will:
- Replace package.json with the Next.js version
- Update tsconfig.json for Next.js
- Rename all `.next.*` files to their proper names

### 2. Install Dependencies

After running the migration script, install the Next.js dependencies:

```bash
yarn install
```

### 3. Start the Development Server

Start the Next.js development server to verify the migration:

```bash
yarn dev
```

The application should now be available at [http://localhost:3000](http://localhost:3000).

### 4. Key Files to Review

- `/src/app/layout.tsx`: Main app layout with providers
- `/src/app/page.tsx`: Home page implementation
- `/src/app/projects/[slug]/page.tsx`: Dynamic project page
- `/src/api/index.ts`: Updated API implementation for Next.js

### 5. Project Structure

The Next.js project structure uses the App Router:

- `/src/app/`: Contains all pages and layouts
- `/src/components/`: React components (now with 'use client' directives)
- `/src/lib/`: Utility functions, including styled-components registry
- `/src/providers/`: Context providers for the application

### 6. Deployment

The GitHub Actions workflow has been updated to support Next.js deployment:

- Use `.github/workflows/deploy.next.yml` for Next.js deployment
- This workflow sets up the server to run Next.js in production mode

To deploy the Next.js version, rename `deploy.next.yml` to `deploy.yml` after testing.

## What's Changed

### Client Components vs. Server Components

- All interactive components are marked with `'use client'`
- Server components handle data fetching at the page level
- Client components handle user interactions

### API Fetching

- API calls now use Next.js data fetching patterns
- Support for Server-Side Rendering (SSR) and Incremental Static Regeneration (ISR)

### Routing

- File-based routing via the App Router
- Dynamic routes with `[slug]` folder structure
- Layout components for shared UI across routes

## Testing the Migration

1. Verify that all pages load correctly
2. Test dynamic routes for projects
3. Check that styling is preserved
4. Verify API data fetching
5. Test interactive components (carousel, navigation)

## Reverting (If Necessary)

If you need to revert to the previous implementation:

1. Restore the original package.json: `move package.json.old package.json`
2. Restore tsconfig.json: `move tsconfig.json.old tsconfig.json`
3. Restore all component files by removing the Next.js versions and restoring .old files

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [App Router Migration Guide](https://nextjs.org/docs/app/building-your-application/upgrading/app-router-migration)
- [Styled Components with Next.js](https://nextjs.org/docs/app/building-your-application/styling/css-in-js#styled-components)

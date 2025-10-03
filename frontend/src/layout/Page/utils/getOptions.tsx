import CollaboratorsBlock from '@/components/blocks/CollaboratorsBlock';
import ContentCarousel from '@/components/blocks/ContentCarousel';
import FeaturedCarousel from '@/components/blocks/FeaturedCarousel';
import Archive from '@/components/blocks/LatestPostsGrid/Archive';
import ProjectsRow from '@/components/blocks/ProjectsRow';
import Gallery, { type GalleryImage } from '@/components/Gallery';
import { WordpressPage } from '@/types';
import {
  DOMNode,
  domToReact,
  Element,
  type HTMLReactParserOptions,
} from 'html-react-parser';
import Link from 'next/link';

// Walk a DOM subtree to extract all <img> nodes
function collectImagesFromDom(
  node: any,
  acc: GalleryImage[] = [],
): GalleryImage[] {
  if (!node) return acc;
  const nodes: any[] = Array.isArray(node) ? node : [node];
  for (const n of nodes) {
    if (!n) continue;
    if ((n as any).type === 'tag' && (n as any).name === 'img') {
      const a = (n as any).attribs || {};
      if (a.src) acc.push({ src: a.src, alt: a.alt });
    }
    if ((n as any).children && (n as any).children.length) {
      collectImagesFromDom((n as any).children, acc);
    }
  }
  return acc;
}

const getOptions = (page: WordpressPage, archivePageNumber?: number) => {
  const options: HTMLReactParserOptions = {
    replace: (domNode) => {
      if (domNode instanceof Element) {
        // Convert 'class' to 'className' for React compatibility
        const className = domNode.attribs.class;
        const name = domNode.name;
        const hasChild = domNode.children.length > 0;
        const children = domNode.children;
        const reactAttributes = domNode.attribs;

        if (className) {
          domNode.attribs.className = className;
          delete domNode.attribs.class;
        }

        // Render WP galleries via our Gallery component
        if (
          (className &&
            (className.includes('wp-block-gallery') ||
              className.split(' ').includes('gallery'))) ||
          (name === 'ul' && className?.includes('blocks-gallery-grid'))
        ) {
          const images = collectImagesFromDom(children).filter(
            (img) => !!img.src,
          );
          if (images.length > 0) {
            return <Gallery images={images} />;
          }
        }

        // Add missing alt attributes and loading attributes to images
        if (name === 'img') {
          // Add alt text if missing
          if (!reactAttributes.alt) {
            reactAttributes.alt = reactAttributes.src
              ? `Image: ${reactAttributes.src.split('/').pop()}`
              : 'Image';
          }

          // Add loading="lazy" for below-the-fold images
          if (!reactAttributes.loading) {
            reactAttributes.loading = 'lazy';
          }

          // Add decoding="async" for better performance
          if (!reactAttributes.decoding) {
            reactAttributes.decoding = 'async';
          }
        }
        if (name === 'p') {
          if (!hasChild) return <></>;
          delete reactAttributes.style;
          return (
            <p
              {...reactAttributes}
              className={[className, 'wp-block'].filter(Boolean).join(' ')}
            >
              {domToReact(children as DOMNode[], options)}
            </p>
          );
        }
        if (name === 'a') {
          const adminUrl =
            process.env.NEXT_PUBLIC_ADMIN_URL ?? 'http://admin.toutefois.ca';

          // Check if link has no text content and add accessible text
          const hasVisibleText = children.some((child) => {
            return (
              child.type === 'text' &&
              (child as any).data &&
              (child as any).data.trim().length > 0
            );
          });

          // If no visible text and no img child with alt text, add screen reader text
          if (
            !hasVisibleText &&
            !children.some((child) => (child as any).name === 'img')
          ) {
            const linkText =
              reactAttributes.title ||
              `Link to ${reactAttributes.href.split('/').pop() || 'page'}`;
            reactAttributes['aria-label'] = linkText;
          }

          if (reactAttributes.href.startsWith(adminUrl)) {
            const parsedUrl = new URL(reactAttributes.href);
            const pathName = parsedUrl.pathname.endsWith('/')
              ? parsedUrl.pathname.slice(0, -1)
              : parsedUrl.pathname;

            if (pathName.includes('/collaborateurs')) {
              const collaboratorSlug = pathName.split('/').pop();
              return (
                <Link href={`/notre-mission#${collaboratorSlug}`}>
                  {domToReact(domNode.childNodes as DOMNode[], options)}
                </Link>
              );
            }
            return (
              <Link href={pathName}>
                {domToReact(domNode.childNodes as DOMNode[], options)}
              </Link>
            );
          }
        }

        if (className?.includes('wp-block-toutefois-featured-carousel')) {
          return <FeaturedCarousel />;
        }

        if (className?.includes('wp-block-latest-posts__list')) {
          // Render both WP paginated archive and Facebook paginated archive
          return (
            <>
              <Archive page={archivePageNumber || 1} />
            </>
          );
        }
        if (className?.includes('wp-block-toutefois-projects-category-row')) {
          // Extract category ID from data attribute if available
          const categoryId = reactAttributes['data-category'] || '';

          // Generate a unique ID for the row
          const rowId = Math.random().toString(36).substring(2, 9);

          return (
            <ProjectsRow
              key={`projects-row-${rowId}`}
              categoryId={categoryId}
              title={reactAttributes['data-title']}
            />
          );
        }
        if (className?.includes('toutefois-collaborators-block-react-root')) {
          const data = reactAttributes['data-props'];
          return (
            <CollaboratorsBlock
              mainProjectId={page.isMainProject ? page.id : undefined}
              {...JSON.parse(data)}
            />
          );
        }
        if (className?.includes('wp-block-toutefois-content-carousel')) {
          // Find the inner div that contains all our data attributes
          // Cast domNode.children to Element[] to handle proper typing
          const children = domNode.children as Element[];
          const contentCarouselDiv = children?.find(
            (child) =>
              child.type === 'tag' &&
              child.name === 'div' &&
              child.attribs?.class?.includes('content-carousel-block'),
          );

          if (contentCarouselDiv && 'attribs' in contentCarouselDiv) {
            const {
              'data-content-type': contentType = 'mixed',
              'data-title': title,
              'data-description': description,
              'data-view-all-url': viewAllUrl,
              'data-view-all-text': viewAllText,
              'data-limit': limitStr,
            } = contentCarouselDiv.attribs;

            const limit = limitStr ? parseInt(limitStr, 10) : 10;

            // Extract the unique ID from the carousel div's ID
            const uniqueId =
              contentCarouselDiv.attribs?.id?.replace(
                'content-carousel-',
                '',
              ) || Math.random().toString(36).substring(2, 9);

            return (
              <ContentCarousel
                key={`content-carousel-${uniqueId}`}
                contentType={contentType as 'project' | 'news' | 'mixed'}
                title={title}
                description={description}
                viewAllUrl={viewAllUrl}
                viewAllText={viewAllText}
                limit={limit}
                mainProjectId={page.isMainProject ? page.id : undefined}
              />
            );
          }

          if (className?.includes('wp-block-toutefois-banner')) {
            return (
              <div {...reactAttributes}>{domToReact(children, options)}</div>
            );
          }

          // Handle projects category rows for the projects template
          if (className?.includes('wp-block-toutefois-projects-category-row')) {
            // Extract category ID from data attribute if available
            const categoryId = reactAttributes['data-category'] || '';
            const title = reactAttributes['data-title'] || '';

            return (
              <ProjectsRow
                key={`projects-row-${categoryId || Math.random().toString(36).substring(2, 9)}`}
                categoryId={categoryId}
                title={title}
              />
            );
          }

          // Handle collaborators block for the collaborators template
          if (className?.includes('toutefois-collaborators-block-react-root')) {
            const dataProps = reactAttributes['data-props'] || '{}';
            let props: Record<string, any> = {
              layout: 'vertical',
              memberStatus: 'all',
            };

            try {
              props = {
                ...props,
                ...JSON.parse(dataProps),
              };
            } catch (e) {
              console.error('Failed to parse collaborators block props:', e);
            }

            return (
              <CollaboratorsBlock
                layout={props.layout as 'vertical' | 'horizontal'}
                collaborators={[]} // Will be fetched inside the component using the memberStatus and mainProjectId
                memberStatus={
                  props.memberStatus as 'all' | 'members' | 'non-members'
                }
                noCollaboratorsText={props.noCollaboratorsText}
                mainProjectId={page.isMainProject ? page.id : undefined}
              />
            );
          }

          // Fallback if the inner div is not found
          const fallbackId = Math.random().toString(36).substring(2, 9);
          return (
            <ContentCarousel key={`content-carousel-fallback-${fallbackId}`} />
          );
        }
      }
      return domNode;
    },
  };

  return options;
};

export default getOptions;

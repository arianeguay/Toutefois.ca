import api from '@/api';
import ClientBlock from '@/components/blocks/ClientBlock';
import CollaboratorsBlock from '@/components/blocks/CollaboratorsBlock';
import ContentCarousel from '@/components/blocks/ContentCarousel';
import Archive from '@/components/blocks/LatestPostsGrid/Archive';
import ProjectsRow from '@/components/blocks/ProjectsRow';
import ColorUpdater from '@/components/ColorUpdater';
import Typography from '@/components/common/Typography';
import {
  DOMNode,
  domToReact,
  Element,
  default as parse,
  type HTMLReactParserOptions,
} from 'html-react-parser';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';
import FeaturedCarousel from '../../components/blocks/FeaturedCarousel';
import type { WordpressPage } from '../../types';
import { BackToLink, MainContent } from './styles';

interface PageLayoutProps {
  page: WordpressPage;
  backTo?: string;
  /** If provided, used for rendering archives pagination */
  archivePageNumber?: number;
}

const BackLink = (props: { href?: string; $template?: string }) => {
  const { href, $template } = props;
  if (!href) return null;
  return (
    <BackToLink href={href} $template={$template} className="back-to">
      <Typography variant="body" element="p">
        Retour
      </Typography>
    </BackToLink>
  );
};

const PageLayout: React.FC<PageLayoutProps> = async ({
  page,
  backTo,
  archivePageNumber,
}) => {
  // Treat the link as a string to robustly get the path, avoiding errors if it's not a full URL.
  const pathname = page.link.replace(/^(?:https?:\/\/)?[^/]+\/?/, '');
  const pathSegments = pathname.split('/').filter((segment: string) => segment);

  let parentColor: string | undefined;
  let parentPageSlug: string | undefined;

  if (pathSegments.length > 1) {
    const parentSlug = pathSegments[0];

    parentPageSlug =
      parentSlug === 'collaborateurs' ? 'notre-mission' : parentSlug;
    try {
      const parentPageData = await api.fetchPageBySlug(parentPageSlug);
      const parentPage = Array.isArray(parentPageData)
        ? parentPageData[0]
        : parentPageData;

      if (parentPage && parentPage.meta?.main_color) {
        parentColor = parentPage.meta.main_color;
      }
    } catch (error) {
      console.error(
        `Failed to fetch parent page for slug: ${parentPageSlug}`,
        error,
      );
    }
  }

  // Create a page object for the header, using the parent color if available
  const headerPage = {
    ...page,
    meta: {
      ...page.meta,
      main_color: parentColor || page.meta?.main_color,
    },
  };
  const template = page.template?.length ? page.template : 'template-title.php';
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
              <>
                <div {...reactAttributes}>{domToReact(children, options)}</div>
                <BackLink href={backTo} $template={template} />
              </>
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

  // Get the mainColor from the header page or parent color
  const mainColor = headerPage.meta?.main_color || '';

  // Determine if we should show the back link based on template
  const showBackLink = (currentTemplate: string) => {
    // Don't show back link on banner template - it's handled separately
    if (currentTemplate === 'template-banner.php') return false;
    // Show back link on all other templates if backTo is provided
    return !!backTo;
  };

  return (
    <ClientBlock style={{ flex: 1 }}>
      {/* Update the color context when page loads */}
      <ColorUpdater color={mainColor} />
      <MainContent>
        {/* Show title on templates that need a prominent title */}
        {(template === 'template-title.php' ||
          template === 'template-projects.php' ||
          template === 'template-collaborators.php') && (
          <Typography variant={!!page.template ? 'h1' : 'h2'} element="h1">
            {page.title.rendered}
          </Typography>
        )}

        {/* Carousel template may need special handling for featured carousel */}
        {template === 'template-carousel.php' &&
          !page.content?.rendered?.includes('featured-carousel') && (
            <FeaturedCarousel />
          )}

        {/* Back link handling based on template */}
        {showBackLink(template) && (
          <BackLink href={backTo} $template={template} />
        )}
        {parentPageSlug === 'notre-mission' && !!page.thumbnail && (
          <div
            style={{
              position: 'relative',
              width: '100%',
              aspectRatio: '16 / 9',
            }}
          >
            <Image
              src={page.thumbnail}
              alt={page.title.rendered || 'Page thumbnail image'}
              fill
              sizes="(max-width: 768px) 100vw, 800px"
              priority={true} /* LCP image should be prioritized */
              style={{ objectFit: 'cover' }}
              quality={80} /* Balance quality and file size */
              placeholder="blur"
              blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNzAwIiBoZWlnaHQ9IjQ3NSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4="
            />
          </div>
        )}

        {/* Use Suspense and BlocksProvider to handle client-side rendering of blocks */}
        <Suspense fallback={null}>
          <div
            className={`page-content template-${template.replace('.php', '')}`}
          >
            {!!page.content?.rendered && parse(page.content.rendered, options)}
          </div>
        </Suspense>
      </MainContent>
    </ClientBlock>
  );
};

export default PageLayout;

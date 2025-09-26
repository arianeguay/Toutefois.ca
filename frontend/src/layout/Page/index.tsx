import api from '@/api';
import CollaboratorsBlock from '@/components/blocks/CollaboratorsBlock';
import ContentCarousel from '@/components/blocks/ContentCarousel';
import LatestPostsGrid from '@/components/blocks/LatestPostsGrid';
import ProjectsRow from '@/components/blocks/ProjectsRow';
import Typography from '@/components/common/Typography';
import console from 'console';
import {
  DOMNode,
  domToReact,
  Element,
  default as parse,
  type HTMLReactParserOptions,
} from 'html-react-parser';
import Link from 'next/link';
import Image from 'next/image';
import FeaturedCarousel from '../../components/blocks/FeaturedCarousel';
import type { WordpressPage } from '../../types';
import Footer from '../Footer';
import Header from '../Header';
import { BackToLink, MainContent } from './styles';
import PageWrapper from './wrapper';

interface PageLayoutProps {
  page: WordpressPage;
  backTo?: string;
}

const PageLayout: React.FC<PageLayoutProps> = async ({ page, backTo }) => {
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
      if (domNode instanceof Element && domNode.attribs) {
        if (domNode.name === 'a') {
          const adminUrl =
            process.env.NEXT_PUBLIC_ADMIN_URL ?? 'http://admin.toutefois.ca';
          if (domNode.attribs.href.startsWith(adminUrl)) {
            const parsedUrl = new URL(domNode.attribs.href);
            const pathName = parsedUrl.pathname.endsWith('/')
              ? parsedUrl.pathname.slice(0, -1)
              : parsedUrl.pathname;

            if (pathName.includes('/collaborateurs')) {
              const collaboratorSlug = pathName.split('/').pop();
              return (
                <Link href={`/notre-mission#${collaboratorSlug}`}>
                  {domToReact(domNode.childNodes as DOMNode[])}
                </Link>
              );
            }
            return (
              <Link href={pathName}>
                {domToReact(domNode.childNodes as DOMNode[])}
              </Link>
            );
          }
        }

        if (
          domNode.attribs.class?.includes(
            'wp-block-toutefois-featured-carousel',
          )
        ) {
          return <FeaturedCarousel />;
        }

        if (domNode.attribs.class?.includes('wp-block-latest-posts__list')) {
          return <LatestPostsGrid />;
        }
        if (
          domNode.attribs.class?.includes(
            'wp-block-toutefois-projects-category-row',
          )
        ) {
          // Extract category ID from data attribute if available
          const categoryId = domNode.attribs['data-category'] || '';

          // Generate a unique ID for the row
          const rowId = Math.random().toString(36).substring(2, 9);

          return (
            <ProjectsRow
              key={`projects-row-${rowId}`}
              categoryId={categoryId}
              title={domNode.attribs['data-title']}
            />
          );
        }
        if (
          domNode.attribs.class?.includes(
            'toutefois-collaborators-block-react-root',
          )
        ) {
          const data = domNode.attribs['data-props'];
          return <CollaboratorsBlock {...JSON.parse(data)} />;
        }
        if (
          domNode.attribs.class?.includes('wp-block-toutefois-content-carousel')
        ) {
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

  return (
    <PageWrapper template={template}>
      <Header currentPage={headerPage} />
      <MainContent>
        {backTo && (
          <BackToLink href={backTo} $template={template} className="back-to">
            <Typography variant="body" element="p">
              Retour
            </Typography>
          </BackToLink>
        )}
        {template === 'template-title.php' && (
          <Typography
            variant={!!page.template ? 'h1' : 'h2'}
            element="h1"
            style={{ marginBlockEnd: 12 }}
          >
            {page.title.rendered}
          </Typography>
        )}

        {parentPageSlug === 'notre-mission' && !!page.thumbnail && (
          <div style={{ position: 'relative', width: '100%', aspectRatio: '16 / 9' }}>
            <Image
              src={page.thumbnail}
              alt={page.title.rendered}
              fill
              sizes="(max-width: 768px) 100vw, 800px"
              priority={false}
              style={{ objectFit: 'cover' }}
            />
          </div>
        )}

        {!!page.content?.rendered && parse(page.content.rendered, options)}
      </MainContent>
      <Footer currentPage={headerPage} />
    </PageWrapper>
  );
};

export default PageLayout;

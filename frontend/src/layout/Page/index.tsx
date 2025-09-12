import CollaboratorsBlock from '@/components/blocks/CollaboratorsBlock';
import ContentCarousel from '@/components/blocks/ContentCarousel';
import LatestPostsGrid from '@/components/blocks/LatestPostsGrid';
import ProjectsRow from '@/components/blocks/ProjectsRow';
import Typography from '@/components/common/Typography';
import {
  Element,
  default as parse,
  type HTMLReactParserOptions,
} from 'html-react-parser';
import FeaturedCarousel from '../../components/blocks/FeaturedCarousel';
import type { WordpressPage } from '../../types';
import Footer from '../Footer';
import Header from '../Header';
import { MainContent } from './styles';
import PageWrapper from './wrapper';

interface PageLayoutProps {
  page: WordpressPage;
}

const PageLayout: React.FC<PageLayoutProps> = ({ page }) => {
  const template = page.template?.length ? page.template : 'template-title.php';
  const options: HTMLReactParserOptions = {
    replace: (domNode) => {
      if (domNode instanceof Element && domNode.attribs) {
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
      <Header currentPage={page} />
      <MainContent>
        {template === 'template-title.php' && (
          <Typography
            variant={!!page.template ? 'h1' : 'h2'}
            element="h1"
            style={{ marginBlockEnd: 12 }}
          >
            {page.title.rendered}
          </Typography>
        )}
        {!!page.content?.rendered && parse(page.content.rendered, options)}
      </MainContent>
      <Footer currentPage={page} />
    </PageWrapper>
  );
};

export default PageLayout;

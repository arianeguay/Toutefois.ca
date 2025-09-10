import Typography from '@/components/common/typography';
import {
  Element,
  default as parse,
  type HTMLReactParserOptions,
} from 'html-react-parser';
import FeaturedCarousel from '../../components/blocks/FeaturedCarousel';
import NewsList from '../../components/blocks/NewsList';
import ProjectsList from '../../components/blocks/ProjectsList';
import ProjectsPageGrid from '../../components/blocks/ProjectsPageGrid';
import type { WordpressPage } from '../../types';
import Footer from '../Footer';
import Header from '../Header';
import { MainContent } from './styles';
import PageWrapper from './wrapper';

interface PageLayoutProps {
  page: WordpressPage;
}

const PageLayout: React.FC<PageLayoutProps> = ({ page }) => {
  const isHome = page.slug === 'home';
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
        if (
          domNode.attribs.class?.includes('wp-block-toutefois-projects-list')
        ) {
          return <ProjectsList />;
        }
        if (domNode.attribs.class?.includes('wp-block-toutefois-news-list')) {
          return <NewsList />;
        }
        if (
          domNode.attribs.class?.includes(
            'wp-block-toutefois-projects-page-grid',
          )
        ) {
          return <ProjectsPageGrid />;
        }
      }
      return domNode;
    },
  };

  return (
    <PageWrapper>
      <Header currentPage={page} />
      <MainContent>
        {!isHome && !!page.title?.rendered && (
          <Typography
            variant="h2"
            element="h1"
            style={{
              marginBlockStart: 50,
              marginBlockEnd: 16,
            }}
          >
            {parse(page.title.rendered)}
          </Typography>
        )}
        {!!page.content?.rendered && parse(page.content.rendered, options)}
      </MainContent>
      <Footer currentPage={page} />
    </PageWrapper>
  );
};

export default PageLayout;

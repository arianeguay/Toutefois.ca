import api from '@/api';
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
import { MainContent, PageContainer } from './styles';

interface PageLayoutProps {
  page: WordpressPage;
}

const PageLayout: React.FC<PageLayoutProps> = async ({ page }) => {
  const projects = await api.fetchAllProjects();
  const menuItems = await api.fetchMenuItems();
  const specialProject = await api.fetchSpecialProjects();
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
        //   if (domNode.attribs.class?.includes('wp-block-group ')) {
        //     if (!domNode.children) return null;
        //     return <Container>{domToReact(domNode.  )}</Container>;
        //   }
        if (
          domNode.attribs.class?.includes(
            'wp-block-toutefois-projects-page-grid',
          )
        ) {
          return <ProjectsPageGrid projects={projects} />;
        }
      }
      return domNode;
    },
  };

  return (
    <PageContainer>
      <Header menuItems={menuItems} specialProject={specialProject} />
      <MainContent>{parse(page.content.rendered, options)}</MainContent>
      <Footer />
    </PageContainer>
  );
};

export default PageLayout;

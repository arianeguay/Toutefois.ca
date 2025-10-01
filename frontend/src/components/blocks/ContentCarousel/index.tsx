import { fetchFacebookPosts } from '@/api/facebook';
import { FacebookPost, WordpressPost, WordpressProject } from '@/types';
import Api from '../../../api';
import ContentCarouselList from './List';

interface ContentCarouselProps {
  contentType?: 'project' | 'news' | 'mixed';
  title?: string;
  description?: string;
  viewAllUrl?: string;
  viewAllText?: string;
  limit?: number;
  noContentText?: string;
  mainProjectId?: number;
  newsSource?: 'wp' | 'facebook' | 'both';
  facebookPageId?: string;
}

const LIMIT_FB_POSTS = 5;
const ContentCarousel = async ({
  contentType = 'mixed',
  title,
  description,
  viewAllUrl,
  viewAllText,
  limit = 10,
  noContentText = 'No content found.',
  mainProjectId,
  newsSource = 'both',
  facebookPageId,
}: ContentCarouselProps) => {
  let items: (WordpressPost | WordpressProject | FacebookPost)[] = [];

  // Fetch projects if needed
  if (contentType === 'project' || contentType === 'mixed') {
    const projects = await Api.fetchAllProjects(mainProjectId);
    if (projects.length > 0) {
      // Add projects with a type identifier to distinguish them
      items = [
        ...items,
        ...projects.map((project) => ({
          ...project,
          contentType: 'project' as const,
        })),
      ];
    }
  }

  // Fetch news and/or Facebook depending on content type and configured source
  if (contentType === 'news') {
    if (newsSource === 'wp' || newsSource === 'both') {
      const news = await Api.fetchAllNews(mainProjectId);
      if (news.length > 0) {
        const typedArticles = news.map((article) => ({
          ...article,
          type: 'wordpress' as const,
          contentType: 'news' as const,
        }));
        items = [...items, ...typedArticles];
      }
    }

    if (newsSource === 'facebook' || newsSource === 'both') {
      const facebookPosts = await fetchFacebookPosts({
        limit: LIMIT_FB_POSTS,
        pageId: facebookPageId,
      });
      if (facebookPosts.length > 0) {
        items = [...items, ...facebookPosts];
      }
    }
  } else if (contentType === 'mixed') {
    // Existing behavior: include both WP news and Facebook posts in mixed mode
    const news = await Api.fetchAllNews(mainProjectId);
    if (news.length > 0) {
      const typedArticles = news.map((article) => ({
        ...article,
        type: 'wordpress' as const,
        contentType: 'news' as const,
      }));
      items = [...items, ...typedArticles];
    }

    const facebookPosts = await fetchFacebookPosts({
      limit: LIMIT_FB_POSTS,
      pageId: facebookPageId,
    });
    if (facebookPosts.length > 0) {
      items = [...items, ...facebookPosts];
    }
  }

  // Apply limit
  items = items.slice(0, limit);

  if (!items.length) {
    return <p>{noContentText}</p>;
  }

  return (
    <ContentCarouselList
      items={items}
      contentType={contentType}
      title={title}
      description={description}
      viewAllUrl={viewAllUrl}
      viewAllText={viewAllText}
    />
  );
};

export default ContentCarousel;

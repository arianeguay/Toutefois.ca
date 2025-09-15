import { getMockFacebookPosts } from '@/api/facebook';
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
}

const ContentCarousel = async ({
  contentType = 'mixed',
  title,
  description,
  viewAllUrl,
  viewAllText,
  limit = 10,
  noContentText = 'No content found.',
}: ContentCarouselProps) => {
  let items: (WordpressPost | WordpressProject | FacebookPost)[] = [];

  // Fetch projects if needed
  if (contentType === 'project' || contentType === 'mixed') {
    const projects = await Api.fetchAllProjects();
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

  // Fetch news if needed
  if (contentType === 'news' || contentType === 'mixed') {
    const news = await Api.fetchAllNews();
    if (news.length > 0) {
      // Add news with a type identifier
      const typedArticles = news.map((article) => ({
        ...article,
        type: 'wordpress' as const,
        contentType: 'news' as const,
      }));
      items = [...items, ...typedArticles];
    }

    // Add Facebook posts if in news or mixed mode
    const facebookPosts = getMockFacebookPosts();
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

import Api from '@/api';
import { fetchFacebookPosts } from '@/api/facebook';
import { FacebookPost, WordpressPost } from '@/types';
import ArticlesGrid from './Grid';

const LatestPostsGrid = async ({
  facebookExcludeKeywords,
  facebookRequireImage = true,
  facebookMaxPages,
  facebookExcludeEvents = true,
  facebookExcludeReels = true,
}: {
  facebookExcludeKeywords?: string[];
  facebookRequireImage?: boolean;
  facebookMaxPages?: number;
  facebookExcludeEvents?: boolean;
  facebookExcludeReels?: boolean;
}) => {
  const news = await Api.fetchAllNews();
  let items: (WordpressPost | FacebookPost)[] = [];

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
  const facebookPosts = await fetchFacebookPosts({
    excludeKeywords: facebookExcludeKeywords,
    requireImage: facebookRequireImage,
    maxPages: facebookMaxPages,
    excludeEvents: facebookExcludeEvents,
    excludeReels: facebookExcludeReels,
  });
  if (facebookPosts.length > 0) {
    items = [...items, ...facebookPosts];
  }

  return <ArticlesGrid articles={items} />;
};

export default LatestPostsGrid;

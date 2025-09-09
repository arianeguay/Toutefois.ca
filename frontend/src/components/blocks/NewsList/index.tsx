import { getMockFacebookPosts } from '@/api/facebook';
import Api from '../../../api';
import ArticleListCarousel from './List';

const NewsList = async () => {
  const articles = await Api.fetchAllNews();

  // Use mock data in development or call the actual API
  // Replace this with fetchFacebookPosts() when you have a valid Facebook API token
  const facebookPosts = getMockFacebookPosts();

  // Add 'wordpress' type to WordPress articles
  const typedArticles = articles.map((article) => ({
    ...article,
    type: 'wordpress' as const,
  }));

  // Combine WordPress articles and Facebook posts
  const allItems = [...typedArticles, ...facebookPosts];

  if (!allItems.length) {
    return <p>No news found.</p>;
  }

  return <ArticleListCarousel items={allItems} />;
};

export default NewsList;

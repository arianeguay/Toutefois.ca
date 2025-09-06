import { useEffect, useState } from 'react';
import Api from '../../../api';
import type { WordpressProject } from '../../../types';
import Feed from '../Feed';

const NewsList = () => {
  const [articles, setArticles] = useState<WordpressProject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getArticles = async () => {
      try {
        const data = await Api.fetchAllNews();
        setArticles(data);
      } catch (error) {
        console.error('Failed to fetch news:', error);
      } finally {
        setLoading(false);
      }
    };

    getArticles();
  }, []);

  if (loading) {
    return <p>Loading news...</p>;
  }

  if (!articles.length) {
    return <p>No news found.</p>;
  }

  return <Feed />;
};

export default NewsList;

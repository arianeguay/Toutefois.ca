import { useEffect, useState } from 'react';
import Api from '../../../api';
import type { WordpressProject } from '../../../types';
import Container from '../../common/Container';
import {
  ArticleExcerpt,
  ArticleImage,
  ArticleTitle,
  ListContainer,
  ListItem,
} from './styles';

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

  return (
    <Container>
      <ListContainer>
        {articles.map((article) => (
          <ListItem key={article.id}>
            {article.featured_image_url && (
              <ArticleImage
                src={article.featured_image_url}
                alt={article.title}
              />
            )}
            <ArticleTitle>{article.title}</ArticleTitle>
            <ArticleExcerpt
              dangerouslySetInnerHTML={{ __html: article.excerpt }}
            />
          </ListItem>
        ))}
      </ListContainer>
    </Container>
  );
};

export default NewsList;

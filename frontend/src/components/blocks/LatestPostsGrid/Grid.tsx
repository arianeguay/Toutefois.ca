'use client';
import ContentCard from '@/components/common/Card';
import Pagination from '@/components/common/Pagination';
import { FacebookPost, WordpressPost } from '@/types';
import { useMemo, useState } from 'react';
import { GridContainer } from './styles';

interface GridProps {
  articles: (WordpressPost | FacebookPost)[];
}

const ArticlesGrid: React.FC<GridProps> = ({ articles }) => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(9);

  const handlePageChange = (newPage: number, newLimit?: number) => {
    setPage(newPage);
    if (newLimit) {
      setLimit(newLimit);
    }
  };

  const totalPages = useMemo(
    () => Math.ceil(articles.length / limit),
    [articles, limit],
  );

  const paginatedArticles = useMemo(() => {
    const start = (page - 1) * limit;
    const end = start + limit;
    return articles.slice(start, end);
  }, [articles, page, limit]);

  // Determine the content type for each item
  const getItemType = (
    item: WordpressPost | FacebookPost,
  ): 'project' | 'news' | 'facebook' => {
    if ('type' in item && item.type === 'facebook') {
      return 'facebook';
    }

    // For mixed content, we need to determine the type
    // This is a simple implementation - you might need to enhance this based on your data structure
    if ('type' in item && item.type === 'wordpress') {
      return 'news';
    }

    // Default to project if we can't determine
    return 'project';
  };

  return (
    <>
      <GridContainer>
        {paginatedArticles.map((article) => (
          <ContentCard
            key={article.id}
            item={article}
            contentType={getItemType(article)}
          />
        ))}
      </GridContainer>
    </>
  );
};

export default ArticlesGrid;

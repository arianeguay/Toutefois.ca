'use client';
import { Swiper, SwiperSlide } from 'swiper/react';

import Button from '@/components/common/button';
import Typography from '@/components/common/typography';
import { FacebookPost, PostItem, WordpressPost } from '@/types';
import { useTheme } from 'styled-components';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import ArticleListCard from './Card';
import FacebookPostCard from './FacebookCard';
import { ArticleListContainer, ArticleListHeader } from './styles';

interface ArticleListCarouselProps {
  items: PostItem[];
  title?: string;
  viewAllUrl?: string;
  viewAllText?: string;
}
const ArticleListCarousel: React.FC<ArticleListCarouselProps> = ({
  items,
  title = 'Quoi de neuf?',
  viewAllUrl = '/actualites',
  viewAllText = 'Voir tous les articles',
}) => {
  const theme = useTheme();
  return (
    <ArticleListContainer>
      <ArticleListHeader>
        <Typography variant="h2" element="h2">
          {title}
        </Typography>
        {viewAllUrl && (
          <Button variant="primary" href={viewAllUrl}>
            {viewAllText}
          </Button>
        )}
      </ArticleListHeader>
      <Swiper
        spaceBetween={theme.spacing.lg}
        slidesPerView={3}
        pagination={{ clickable: true }}
        navigation={true}
        modules={[Pagination, Navigation]}
      >
        {items.map((item) => (
          <SwiperSlide
            key={typeof item.id === 'number' ? `wp-${item.id}` : item.id}
          >
            {item.type === 'facebook' ? (
              <FacebookPostCard post={item as FacebookPost} />
            ) : (
              <ArticleListCard
                href={(item as WordpressPost).slug || ''}
                featured_image_url={(item as WordpressPost).featured_image_url}
                title={(item as WordpressPost).title}
                excerpt={(item as WordpressPost).excerpt}
              />
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </ArticleListContainer>
  );
};

export default ArticleListCarousel;

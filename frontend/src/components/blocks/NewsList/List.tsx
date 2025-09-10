'use client';
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';

import Button from '@/components/common/button';
import Typography from '@/components/common/typography';
import { FacebookPost, PostItem, WordpressPost } from '@/types';
import { useState } from 'react';
import { useTheme } from 'styled-components';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import ArticleListCard from './Card';
import FacebookPostCard from './FacebookCard';
import {
  ArticleListContainer,
  ArticleListHeader,
  BackgroundImage,
} from './styles';

interface ArticleListCarouselProps {
  items: PostItem[];
  title?: string;
  viewAllUrl?: string;
  viewAllText?: string;
}
const ArticleListCarousel: React.FC<ArticleListCarouselProps> = ({
  items,
  title = 'Quoi de neuf?',
  viewAllUrl = '/archives',
  viewAllText = 'Voir tous les articles',
}) => {
  const theme = useTheme();

  const [current, setCurrent] = useState<PostItem>(items[0]);

  const handleCurrentChange = (swiper: SwiperClass) => {
    if (swiper) {
      setCurrent(items[swiper.activeIndex]);
    }
  };

  return (
    <>
      {current?.type === 'facebook'
        ? !!current?.picture?.length && (
            <BackgroundImage src={current.picture} alt="" />
          )
        : !!current?.featured_image_url?.length && (
            <BackgroundImage src={current.featured_image_url} alt="" />
          )}
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
          onSlideChange={handleCurrentChange}
          spaceBetween={theme.spacing.lg}
          slidesPerView={1}
          pagination={{ clickable: true }}
          navigation={true}
          breakpoints={{ [theme.breakpoints.lg]: { slidesPerView: 3 } }}
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
                  featured_image_url={
                    (item as WordpressPost).featured_image_url
                  }
                  title={(item as WordpressPost).title}
                  excerpt={(item as WordpressPost).excerpt}
                />
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </ArticleListContainer>
    </>
  );
};

export default ArticleListCarousel;

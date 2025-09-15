'use client';
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';

import Button from '@/components/common/Button';
import ContentCard, { ContentItem } from '@/components/common/Card';
import Typography from '@/components/common/Typography';
import { pxToNumber } from '@/theme';
import { FacebookPost, WordpressPost, WordpressProject } from '@/types';
import { useState } from 'react';
import { useTheme } from 'styled-components';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import {
  BackgroundImage,
  ContentListContainer,
  ContentListHeader,
} from './styles';

interface ContentCarouselProps {
  items: ContentItem[];
  contentType: 'project' | 'news' | 'mixed';
  title?: string;
  description?: string;
  viewAllUrl?: string;
  viewAllText?: string;
}

const ContentCarousel: React.FC<ContentCarouselProps> = ({
  items,
  contentType,
  title,
  description,
  viewAllUrl,
  viewAllText,
}) => {
  const theme = useTheme();
  const [current, setCurrent] = useState<ContentItem>(items[0]);

  const handleCurrentChange = (swiper: SwiperClass) => {
    if (swiper) {
      setCurrent(items[swiper.activeIndex]);
    }
  };

  // Determine the content type for each item
  const getItemType = (item: ContentItem): 'project' | 'news' | 'facebook' => {
    if ('type' in item && item.type === 'facebook') {
      return 'facebook';
    }

    // If we're in a specific content type (not mixed), use that
    if (contentType === 'project' || contentType === 'news') {
      return contentType;
    }

    // For mixed content, we need to determine the type
    // This is a simple implementation - you might need to enhance this based on your data structure
    if ('type' in item && item.type === 'wordpress') {
      return 'news';
    }

    // Default to project if we can't determine
    return 'project';
  };

  // Get the background image based on the current item
  const getBackgroundImage = () => {
    if ('type' in current && current.type === 'facebook') {
      return (current as FacebookPost).picture || '';
    }
    return (
      (current as WordpressPost | WordpressProject).featured_image_url || ''
    );
  };

  return (
    <>
      {current && <BackgroundImage $src={getBackgroundImage()} />}
      <ContentListContainer>
        <ContentListHeader>
          <Typography variant="h2" element="h2">
            {title}
          </Typography>
          {!!description && (
            <Typography variant="big" element="p">
              {description}
            </Typography>
          )}
        </ContentListHeader>
        <Swiper
          onSlideChange={handleCurrentChange}
          spaceBetween={32}
          slidesPerView={1}
          pagination={{ clickable: true }}
          navigation={true}
          slidesPerGroup={1}
          breakpoints={{
            [pxToNumber(theme.breakpoints.md)]: {
              slidesPerView: 2,
              slidesPerGroup: 2,
            },
            [pxToNumber(theme.breakpoints.lg)]: {
              slidesPerView: 3,
              slidesPerGroup: 3,
            },
          }}
          modules={[Pagination, Navigation]}
        >
          {items.map((item) => (
            <SwiperSlide
              key={typeof item.id === 'number' ? `item-${item.id}` : item.id}
            >
              <ContentCard item={item} contentType={getItemType(item)} />
            </SwiperSlide>
          ))}
        </Swiper>
        {viewAllUrl && (
          <Button
            variant="primary"
            href={viewAllUrl}
            size="lg"
            style={{ marginBlockStart: theme.spacing.xl }}
          >
            {viewAllText}
          </Button>
        )}
      </ContentListContainer>
    </>
  );
};

export default ContentCarousel;

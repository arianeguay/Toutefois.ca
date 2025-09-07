import { useEffect, useState } from 'react';
import { A11y, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import Api from '../../../api';
import type { WordpressProject } from '../../../types';
import FeaturedSlide from './FeaturedSlide';
import { CarouselContainer } from './styles';

const FeaturedCarousel = () => {
  const [projects, setProjects] = useState<WordpressProject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProjects = async () => {
      try {
        const data = await Api.fetchFeaturedProjects();
        setProjects(data);
      } catch (error) {
        console.error('Failed to fetch featured projects:', error);
      } finally {
        setLoading(false);
      }
    };

    getProjects();
  }, []);

  if (loading) return null;
  if (!projects?.length) return null;

  return (
    <CarouselContainer>
      <Swiper
        modules={[Navigation, Pagination, A11y]}
        spaceBetween={50}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
      >
        {projects.map((project) => (
          <SwiperSlide key={project.id}>
            <FeaturedSlide project={project} />
          </SwiperSlide>
        ))}
      </Swiper>
    </CarouselContainer>
  );
};

export default FeaturedCarousel;

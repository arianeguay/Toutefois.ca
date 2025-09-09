'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import ProjectListCard from './Card';

import { WordpressProject } from '@/types';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface ProjectsListCarouselProps {
  projects: WordpressProject[];
}
const ProjectsListCarousel: React.FC<ProjectsListCarouselProps> = ({
  projects,
}) => {
  return (
    <Swiper spaceBetween={50} slidesPerView={3}>
      {projects.map((project) => (
        <SwiperSlide key={project.id}>
          <ProjectListCard {...project} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ProjectsListCarousel;

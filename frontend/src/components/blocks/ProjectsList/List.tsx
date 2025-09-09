'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import ProjectListCard from './Card';

import Button from '@/components/common/button';
import Typography from '@/components/common/typography';
import { WordpressProject } from '@/types';
import { useTheme } from 'styled-components';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import { ProjectListContainer, ProjectsListHeader } from './styles';

interface ProjectsListCarouselProps {
  projects: WordpressProject[];
}
const ProjectsListCarousel: React.FC<ProjectsListCarouselProps> = ({
  projects,
}) => {
  const theme = useTheme();
  return (
    <ProjectListContainer>
      <ProjectsListHeader>
        <Typography variant="h2" element="h2">
          Nos projets
        </Typography>
        <Button variant="primary" href="/projets">
          Voir tous les projets
        </Button>
      </ProjectsListHeader>
      <Swiper
        spaceBetween={theme.spacing.lg}
        slidesPerView={3}
        pagination={{ clickable: true }}
        navigation={true}
        modules={[Pagination, Navigation]}
      >
        {projects.map((project) => (
          <SwiperSlide key={project.id}>
            <ProjectListCard {...project} />
          </SwiperSlide>
        ))}
      </Swiper>
    </ProjectListContainer>
  );
};

export default ProjectsListCarousel;

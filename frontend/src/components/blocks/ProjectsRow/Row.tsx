'use client';
import { WordpressProject } from '@/types';
import { useTheme } from 'styled-components';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import ProjectCard from './ProjectCard';

interface ProjectsRowContentProps {
  projects: WordpressProject[];
}
const ProjectsRowContent: React.FC<ProjectsRowContentProps> = ({
  projects,
}) => {
  console.log(projects);
  const theme = useTheme();
  return (
    <div>
      <Swiper
        slidesPerView={'auto'}
        spaceBetween={theme.spacing.md}
        grabCursor={true}
        style={{ width: '100%' }}
        pagination={true}
        modules={[Pagination, Navigation]}
        navigation={true}
      >
        {projects.map((project) => (
          <SwiperSlide key={project.id} style={{ width: 300 }}>
            <ProjectCard {...project} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProjectsRowContent;

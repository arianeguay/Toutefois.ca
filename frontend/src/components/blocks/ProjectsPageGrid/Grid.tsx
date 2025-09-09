'use client';

import Typography from '@/components/common/typography';
import { WordpressProjectGridData } from '@/types';
import { useTheme } from 'styled-components';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import ProjectCard from './ProjectCard';
import { CategorySection, GridContainer } from './styles';

interface ProjectsGridProps {
  projects: WordpressProjectGridData;
}
const ProjectsGrid: React.FC<ProjectsGridProps> = ({ projects }) => {
  const theme = useTheme();
  return (
    <GridContainer>
      {projects.by_category.map((category) => (
        <CategorySection key={category.category.id}>
          <Typography variant="h3" element="h2">
            {category.category.name}
          </Typography>
          <Swiper
            slidesPerView={'auto'}
            spaceBetween={theme.spacing.md}
            grabCursor={true}
            style={{ width: '100%' }}
            pagination={true}
            modules={[Pagination, Navigation]}
            navigation={true}
          >
            {category.projects.map((project) => (
              <SwiperSlide key={project.id} style={{ width: 300 }}>
                <ProjectCard {...project} />
              </SwiperSlide>
            ))}
          </Swiper>
        </CategorySection>
      ))}
    </GridContainer>
  );
};

export default ProjectsGrid;

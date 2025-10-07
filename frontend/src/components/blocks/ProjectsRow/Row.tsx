'use client';
import { pxToNumber } from '@/theme';
import { WordpressProject } from '@/types';
import { useTheme } from 'styled-components';
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import ProjectCard from './ProjectCard';

import Typography from '@/components/common/Typography';
import { useEffect, useState } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { ProjectsRowContainerContent, SwiperNavigationButton } from './styles';

interface ProjectsRowContentProps {
  projects: WordpressProject[];
  title?: string;
}
const ProjectsRowContent: React.FC<ProjectsRowContentProps> = ({
  projects,
  title,
}) => {
  const theme = useTheme();

  const [swiperInstance, setSwiperInstance] = useState<SwiperClass | null>(
    null,
  );

  const [index, setIndex] = useState(0);

  const [showButtons, setShowButtons] = useState(false);

  useEffect(() => {
    if (swiperInstance) {
      if (
        swiperInstance.slidesGrid.length > swiperInstance.slidesPerViewDynamic()
      ) {
        setShowButtons(true);
      } else {
        setShowButtons(false);
      }
    }
  }, [swiperInstance]);
  return (
    <ProjectsRowContainerContent>
      <Typography
        variant="h2"
        element="h2"
        style={{
          marginBottom: theme.spacing.md,
          color: theme.colors.primaryText,
        }}
      >
        {title}
      </Typography>
      <div style={{ position: 'relative' }}>
        {showButtons && (
          <>
            <SwiperNavigationButton
              onClick={() => {
                swiperInstance?.slidePrev();
                setIndex(swiperInstance?.activeIndex || 0);
              }}
              $side="left"
              className="carousel-nav carousel-nav-button-prev"
            >
              ◀
            </SwiperNavigationButton>
            <SwiperNavigationButton
              onClick={() => {
                swiperInstance?.slideNext();
                setIndex(swiperInstance?.activeIndex || 0);
              }}
              $side="right"
              className="carousel-nav carousel-nav-button-next"
            >
              ▶
            </SwiperNavigationButton>
          </>
        )}
        <Swiper
          slidesPerView={1}
          slidesPerGroup={1}
          spaceBetween={theme.spacing.md}
          style={{ width: '100%' }}
          loop
          loopAdditionalSlides={projects.length * 2}
          pagination
          grabCursor={true}
          onSwiper={setSwiperInstance}
          breakpoints={{
            [pxToNumber(theme.breakpoints.md)]: {
              slidesPerView: 2,
            },
            [pxToNumber(theme.breakpoints.lg)]: {
              slidesPerView: 3,
            },
          }}
        >
          {projects.map((project) => (
            <SwiperSlide key={project.id} style={{ width: 300 }}>
              <ProjectCard {...project} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </ProjectsRowContainerContent>
  );
};

export default ProjectsRowContent;

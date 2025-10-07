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
import {
  NavPagination,
  NavPaginationDot,
  ProjectsRowContainerContent,
  SwiperNavigationButton,
} from './styles';

interface ProjectsRowContentProps {
  projects: WordpressProject[];
  title?: string;
}
const ProjectsRowContent: React.FC<ProjectsRowContentProps> = ({
  projects,
  title,
}) => {
  const theme = useTheme();
  const [activeIndex, setActiveIndex] = useState(0);
  const [swiperInstance, setSwiperInstance] = useState<SwiperClass | null>(
    null,
  );

  const [showButtons, setShowButtons] = useState(false);

  useEffect(() => {
    if (!swiperInstance) return;

    const update = () => {
      // Determine current slidesPerView considering breakpoints and dynamic widths
      const pvParam = swiperInstance.params.slidesPerView;
      const currentPerView =
        typeof pvParam === 'number'
          ? pvParam
          : swiperInstance.slidesPerViewDynamic();
      const shouldShow = projects.length > Math.max(1, Math.ceil(currentPerView));
      setShowButtons(shouldShow);
    };

    // Initial compute
    update();

    // Subscribe to relevant Swiper events
    swiperInstance.on('resize', update);
    swiperInstance.on('breakpoint', update);
    swiperInstance.on('slidesLengthChange', update);
    swiperInstance.on('update', update);

    // Cleanup
    return () => {
      swiperInstance.off('resize', update);
      swiperInstance.off('breakpoint', update);
      swiperInstance.off('slidesLengthChange', update);
      swiperInstance.off('update', update);
    };
  }, [swiperInstance, projects.length]);
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
              }}
              $side="left"
              className="carousel-nav carousel-nav-button-prev"
            >
              ◀
            </SwiperNavigationButton>
            <SwiperNavigationButton
              onClick={() => {
                if (!swiperInstance) return;
                const total = projects.length;
                const next =
                  (swiperInstance.realIndex + 1) % Math.max(1, total);
                if (total > 1) {
                  swiperInstance.slideToLoop(next);
                } else {
                  swiperInstance.slideTo(0);
                }
              }}
              $side="right"
              className="carousel-nav carousel-nav-button-next"
            >
              ▶
            </SwiperNavigationButton>
          </>
        )}

        <Swiper
          style={{ width: '100%' }}
          slidesPerView={1}
          slidesPerGroup={1}
          cssMode
          spaceBetween={theme.spacing.md}
          loop={projects.length > 1}
          rewind
          watchOverflow={false}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
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
            <SwiperSlide key={project.id}>
              <ProjectCard {...project} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      {showButtons && (
        <NavPagination>
          {Array.from({ length: projects.length }, (_, index) => (
            <NavPaginationDot
              key={index}
              $active={index === activeIndex}
              onClick={() => swiperInstance?.slideToLoop(index)}
            />
          ))}
        </NavPagination>
      )}
    </ProjectsRowContainerContent>
  );
};

export default ProjectsRowContent;

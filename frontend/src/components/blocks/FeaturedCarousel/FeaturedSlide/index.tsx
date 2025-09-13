'use client';

import parse from 'html-react-parser';
import { useTheme } from 'styled-components';
import type { WordpressProject } from '@/types';
import Button from '@/components/common/Button';
import Typography from '@/components/common/Typography';
import {
  FeaturedSlideContainer,
  FeaturedSlideContent,
  FeaturedSlideOverlay,
  ProjectImage,
  SlideBody,
  SlideCover,
} from './styles';

const FeaturedSlide: React.FC<{
  project: WordpressProject;
}> = ({ project }) => {
  const theme = useTheme();

  return (
    <FeaturedSlideContainer>
      <FeaturedSlideOverlay $backgroundUrl={project.featured_image_url} />
      <FeaturedSlideContent>
        <SlideBody>
          <Typography variant="h1" element="h2">
            {project.title}
          </Typography>
          <Typography variant="body" lineClamp={5}>
            {parse(project.excerpt)}
          </Typography>
          <Button
            size="lg"
            variant="primary"
            href={`/projects/${project.slug}`}
            style={{ marginBlockStart: theme.spacing.md }}
          >
            En savoir plus
          </Button>
        </SlideBody>
        <SlideCover>
          {project.featured_image_url && (
            <ProjectImage
              src={project.featured_image_url}
              alt={project.title}
            />
          )}
        </SlideCover>
      </FeaturedSlideContent>
    </FeaturedSlideContainer>
  );
};

export default FeaturedSlide;

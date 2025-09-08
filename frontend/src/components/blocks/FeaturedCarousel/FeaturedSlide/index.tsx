'use client';

import parse from 'html-react-parser';
import { useTheme } from 'styled-components';
import type { WordpressImage, WordpressProject } from '../../../../types';
import Button from '../../../common/button';
import Typography from '../../../common/typography';
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
  image: WordpressImage;
}> = ({ project, image }) => {
  const theme = useTheme();

  return (
    <FeaturedSlideContainer>
      <FeaturedSlideOverlay $backgroundUrl={image?.source_url} />
      <FeaturedSlideContent>
        <SlideBody>
          <Typography variant="h1" element="h2">
            {project.title}
          </Typography>
          <Typography variant="body">{parse(project.excerpt)}</Typography>
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
          {image && <ProjectImage src={image.source_url} alt={project.title} />}
        </SlideCover>
      </FeaturedSlideContent>
    </FeaturedSlideContainer>
  );
};

export default FeaturedSlide;

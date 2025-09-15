'use client';

import Button from '@/components/common/Button';
import Typography from '@/components/common/Typography';
import type { WordpressProject } from '@/types';
import parse from 'html-react-parser';
import { useTheme } from 'styled-components';
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

  console.log(project);
  return (
    <FeaturedSlideContainer>
      <FeaturedSlideOverlay $backgroundUrl={project.featured_image_url} />
      <FeaturedSlideContent>
        <SlideBody>
          <Typography variant="h1" element="h2">
            {project.title}
          </Typography>
          {project.projet_date_debut && project.projet_date_fin && (
            <Typography
              variant="big"
              lineClamp={5}
              color="buttonPrimaryBackground"
            >
              {[project.projet_date_debut, project.projet_date_fin].join(' - ')}
            </Typography>
          )}
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
          {!!project.lien_de_reservation && (
            <Button
              size="lg"
              variant="primary"
              href={project.lien_de_reservation}
              style={{ marginBlockStart: theme.spacing.md }}
            >
              Réservez maintenant
            </Button>
          )}
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

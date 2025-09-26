'use client';

import Button from '@/components/common/Button';
import Typography from '@/components/common/Typography';
import type { WordpressProject } from '@/types';
import parse from 'html-react-parser';
import { useTheme } from 'styled-components';
import Image from 'next/image';
import {
  FeaturedSlideActions,
  FeaturedSlideContainer,
  FeaturedSlideContent,
  FeaturedSlideOverlay,
  SlideBody,
  SlideCover,
} from './styles';

const FeaturedSlide: React.FC<{
  project: WordpressProject;
  isFirst?: boolean;
}> = ({ project, isFirst = false }) => {
  const theme = useTheme();

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
              style={{ fontFamily: theme.fonts.tertiary }}
            >
              {[project.projet_date_debut, project.projet_date_fin].join(' - ')}
            </Typography>
          )}
          <Typography variant="body" lineClamp={5}>
            {parse(project.excerpt)}
          </Typography>
          <FeaturedSlideActions>
            <Button
              size="lg"
              variant="primary"
              href={`/projets/${project.slug}`}
              style={{ marginBlockStart: theme.spacing.md }}
            >
              En savoir plus
            </Button>
            {!!project.lien_de_reservation &&
              (!project.projet_date_fin ||
                new Date(project?.projet_date_fin).getTime() >=
                  new Date().getTime()) && (
                <Button
                  size="lg"
                  variant="secondary"
                  href={project.lien_de_reservation}
                  style={{ marginBlockStart: theme.spacing.md }}
                >
                  Réservez maintenant
                </Button>
              )}
          </FeaturedSlideActions>
        </SlideBody>
        <SlideCover>
          {project.featured_image_url && (
            <div style={{ position: 'relative', width: '100%', maxWidth: '720px', aspectRatio: '16 / 9' }}>
              <Image
                src={project.featured_image_url}
                alt={project.title}
                fill
                sizes="(max-width: 1024px) 100vw, 720px"
                priority={isFirst}
                fetchPriority={isFirst ? 'high' : 'auto'}
                style={{ objectFit: 'contain' }}
              />
            </div>
          )}
        </SlideCover>
      </FeaturedSlideContent>
    </FeaturedSlideContainer>
  );
};

export default FeaturedSlide;


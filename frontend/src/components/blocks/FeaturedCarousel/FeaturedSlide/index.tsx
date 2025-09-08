import parse from 'html-react-parser';
import { useEffect, useState } from 'react';
import { useTheme } from 'styled-components';
import Api from '../../../../api';
import type { WordpressImage, WordpressProject } from '../../../../types';
import Button from '../../../common/button';
import Typography from '../../../common/typography';
import {
  ProjectImage,
  SlideBody,
  SlideBodyWrapper,
  SlideContent,
  SlideCover,
} from './styles';
import { useImageTone } from './useImageTone';

const FeaturedSlide: React.FC<{ project: WordpressProject }> = ({
  project,
}) => {
  const theme = useTheme();
  const [image, setImage] = useState<WordpressImage | null>(null);
  const tone = useImageTone(image?.source_url);

  useEffect(() => {
    const fetchImage = async () => {
      const image = await Api.fetchImageById(
        parseInt(project.meta._projet_image_id[0]),
      );
      setImage(image);
    };
    fetchImage();
  }, [project.meta._projet_image_id]);
  return (
    <SlideContent $backgroundUrl={image?.source_url}>
      <SlideBodyWrapper $tone={tone ?? 'dark'}>
        <SlideBody>
          <Typography variant="h1" element="h2">
            {project.title}
          </Typography>
          <Typography variant="body">{parse(project.excerpt)}</Typography>
          <Button
            variant="primary"
            to={`/projects/${project.slug}`}
            style={{ marginBlockStart: theme.spacing.sm }}
          >
            En savoir plus
          </Button>
        </SlideBody>
        <SlideCover>
          {image && <ProjectImage src={image.source_url} alt={project.title} />}
        </SlideCover>
      </SlideBodyWrapper>
    </SlideContent>
  );
};

export default FeaturedSlide;

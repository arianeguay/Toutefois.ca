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
} from './styles';

const FeaturedSlide: React.FC<{ project: WordpressProject }> = ({
  project,
}) => {
  const theme = useTheme();
  const [image, setImage] = useState<WordpressImage | null>(null);
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
    <SlideContent>
      {image && (
        <ProjectImage
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          src={image.source_url}
          alt={project.title}
        />
      )}
      <SlideBodyWrapper>
        <SlideBody>
          <Typography variant="h1" element="h2">
            {project.title}
          </Typography>
          <Typography variant="body">{parse(project.excerpt)}</Typography>
          <Button
            variant="primary"
            to={`/projects/${project.id}`}
            style={{ marginBlockStart: theme.spacing.sm }}
          >
            En savoir plus
          </Button>
        </SlideBody>
      </SlideBodyWrapper>
    </SlideContent>
  );
};

export default FeaturedSlide;

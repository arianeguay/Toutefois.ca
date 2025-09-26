import Typography from '@/components/common/Typography';
import { WordpressProject } from '@/types';
import parse from 'html-react-parser';
import Image from 'next/image';
import {
  ProjectCardBody,
  ProjectCardContainer,
  ProjectCardCover,
  ProjectCardLink,
} from './styles';

const ProjectCard: React.FC<WordpressProject> = ({
  id,
  title,
  excerpt,
  featured_image_url,

  slug,
}) => {
  return (
    <ProjectCardLink
      href={`/projets/${slug}`}
      style={{ textDecoration: 'none' }}
    >
      <ProjectCardContainer>
        <ProjectCardCover>
          {featured_image_url && (
            <Image
              src={featured_image_url}
              alt={typeof title === 'string' ? title : 'Projet'}
              fill
              sizes="(max-width: 768px) 80vw, 300px"
              priority={false}
            />
          )}
        </ProjectCardCover>
        <ProjectCardBody>
          <Typography variant="h4">{parse(title)}</Typography>
          <Typography variant="body" lineClamp={4}>
            {excerpt}
          </Typography>
        </ProjectCardBody>
      </ProjectCardContainer>
    </ProjectCardLink>
  );
};

export default ProjectCard;

import Typography from '@/components/common/typography';
import { WordpressProject } from '@/types';
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
    <ProjectCardLink href={`/projets/${slug}`}>
      <ProjectCardContainer>
        <ProjectCardCover>
          {featured_image_url && <img src={featured_image_url} alt={title} />}
        </ProjectCardCover>
        <ProjectCardBody>
          <Typography variant="h4">{title}</Typography>
          <Typography variant="body" lineClamp={4}>
            {excerpt}
          </Typography>
        </ProjectCardBody>
      </ProjectCardContainer>
    </ProjectCardLink>
  );
};

export default ProjectCard;

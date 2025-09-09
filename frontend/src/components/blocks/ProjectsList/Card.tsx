import Typography from '@/components/common/typography';
import { WordpressProject } from '@/types';
import Link from 'next/link';
import {
  ProjectCardContainer,
  ProjectCardContent,
  ProjectImage,
} from './styles';

const ProjectListCard: React.FC<WordpressProject> = ({ ...project }) => {
  return (
    <Link href={`/projets/${project.slug}`}>
      <ProjectCardContainer>
        <ProjectImage src={project.featured_image_url} alt={project.title} />
        <ProjectCardContent>
          <Typography variant="h4" element="h3">
            {project.title}
          </Typography>
          <Typography variant="body" lineClamp={3}>
            {project.excerpt}
          </Typography>
        </ProjectCardContent>
      </ProjectCardContainer>
    </Link>
  );
};

export default ProjectListCard;

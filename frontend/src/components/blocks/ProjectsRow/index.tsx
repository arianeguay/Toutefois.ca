import Typography from '@/components/common/typography';
import Api from '../../../api';
import ProjectsRowContent from './Row';
import { ProjectsRowContainer } from './styles';

interface ProjectsRowProps {
  categoryId?: string;
  limit?: number;
}

const ProjectsRow: React.FC<ProjectsRowProps> = async ({
  categoryId = '',
  limit = -1,
}) => {
  const allProjects = await Api.fetchAllProjectsByCategory(
    categoryId,
    1,
    limit,
  );

  return (
    <ProjectsRowContainer>
      <Typography variant="h3" element="h2">
        {categoryId}
      </Typography>
      <ProjectsRowContent projects={allProjects} />
    </ProjectsRowContainer>
  );
};

export default ProjectsRow;

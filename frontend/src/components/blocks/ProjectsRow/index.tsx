import Typography from '@/components/common/Typography';
import Api from '../../../api';
import ProjectsRowContent from './Row';
import { ProjectsRowContainer, ProjectsRowContainerContent } from './styles';

interface ProjectsRowProps {
  categoryId?: string;
  title?: string;
}

const ProjectsRow: React.FC<ProjectsRowProps> = async ({
  categoryId = '',
  title = '',
}) => {
  const allProjects = await Api.fetchAllProjectsByCategory(categoryId);

  return (
    <ProjectsRowContainer>
      <ProjectsRowContainerContent>
        <Typography variant="h3" element="h2" style={{ marginBottom: 4 }}>
          {title}
        </Typography>
        <ProjectsRowContent projects={allProjects} />
      </ProjectsRowContainerContent>
    </ProjectsRowContainer>
  );
};

export default ProjectsRow;

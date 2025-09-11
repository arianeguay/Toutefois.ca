import Api from '../../../api';
import ProjectsRowContent from './Row';
import { ProjectsRowContainer } from './styles';

interface ProjectsRowProps {
  categoryId?: string;
}

const ProjectsRow: React.FC<ProjectsRowProps> = async ({ categoryId = '' }) => {
  const allProjects = await Api.fetchAllProjectsByCategory(categoryId);

  return (
    <ProjectsRowContainer>
      <ProjectsRowContent projects={allProjects} />
    </ProjectsRowContainer>
  );
};

export default ProjectsRow;

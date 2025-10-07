import Api from '../../../api';
import ProjectsRowContent from './Row';
import { ProjectsRowContainer } from './styles';

interface ProjectsRowProps {
  categoryId?: string;
  title?: string;
  backgroundColor?: string;
}

const ProjectsRow: React.FC<ProjectsRowProps> = async ({
  categoryId = '',
  title = '',
  backgroundColor,
}) => {
  const allProjects = await Api.fetchAllProjectsByCategory(categoryId);

  return (
    <ProjectsRowContainer $bgColor={backgroundColor}>
      <ProjectsRowContent projects={allProjects} title={title} />
    </ProjectsRowContainer>
  );
};

export default ProjectsRow;

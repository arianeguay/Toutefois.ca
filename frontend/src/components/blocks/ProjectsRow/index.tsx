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
  limit = 6,
}) => {
  const allProjects = await Api.fetchAllProjects();

  let filteredProjects = allProjects;
  // if (categoryId) {
  //   filteredProjects = allProjects.filter((project) => {
  //     // Check if the project has the category with the given ID
  //     return project.categories?.some(
  //       (cat) => cat.id.toString() === categoryId,
  //     );
  //   });
  // }

  const limitedProjects = filteredProjects.slice(0, limit);

  return (
    <ProjectsRowContainer>
      <Typography variant="h3" element="h2">
        {categoryId}
      </Typography>
      <ProjectsRowContent projects={limitedProjects} />
    </ProjectsRowContainer>
  );
};

export default ProjectsRow;

import api from '@/api';
import ProjectsGrid from './Grid';

const ProjectsPageGrid: React.FC = async () => {
  const projects = await api.fetchProjectsGrid();

  return (
    <div>
      <ProjectsGrid projects={projects} />
    </div>
  );
};

export default ProjectsPageGrid;

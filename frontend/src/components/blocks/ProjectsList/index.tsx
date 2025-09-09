import Api from '../../../api';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import ProjectsListCarousel from './List';

const ProjectsList = async () => {
  const projects = await Api.fetchAllProjects();

  if (!projects.length) {
    return <p>No projects found.</p>;
  }

  return <ProjectsListCarousel projects={projects} />;
};

export default ProjectsList;

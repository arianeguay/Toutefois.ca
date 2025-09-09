'use client';

import api from '@/api';
import ProjectCard from './ProjectCard';
import { GridContainer, PaginationButton, PaginationContainer } from './styles';

const ProjectsPageGrid: React.FC = async () => {
  const projects = await api.fetchAllProjects();

  let page = 1;

  const setPage = (newPage: number) => {
    page = newPage;
  };

  const totalPages = Math.ceil(projects.length / 9);

  if (!projects.length) {
    return <p>Aucun projet trouvé.</p>;
  }

  return (
    <div>
      <GridContainer>
        {projects.map((project) => (
          <ProjectCard key={project.id} {...project} />
        ))}
      </GridContainer>
      <PaginationContainer>
        <PaginationButton
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
        >
          Previous
        </PaginationButton>
        <span>
          Page {page} of {totalPages}
        </span>
        <PaginationButton
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages}
        >
          Next
        </PaginationButton>
      </PaginationContainer>
    </div>
  );
};

export default ProjectsPageGrid;

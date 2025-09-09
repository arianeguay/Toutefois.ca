'use client';

import { useState } from 'react';
import type { WordpressProject } from '../../../types';
import ProjectCard from './ProjectCard';
import { GridContainer, PaginationButton, PaginationContainer } from './styles';

interface ProjectsPageGridProps {
  projects: WordpressProject[];
}
const ProjectsPageGrid: React.FC<ProjectsPageGridProps> = ({ projects }) => {
  const [page, setPage] = useState(1);
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
          onClick={() => setPage((p) => p - 1)}
          disabled={page === 1}
        >
          Previous
        </PaginationButton>
        <span>
          Page {page} of {totalPages}
        </span>
        <PaginationButton
          onClick={() => setPage((p) => p + 1)}
          disabled={page === totalPages}
        >
          Next
        </PaginationButton>
      </PaginationContainer>
    </div>
  );
};

export default ProjectsPageGrid;

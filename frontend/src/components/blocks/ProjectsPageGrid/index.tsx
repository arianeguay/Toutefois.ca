'use client';

import { useState } from 'react';
import type { WordpressProject } from '../../../types';
import {
  GridContainer,
  GridItem,
  PaginationButton,
  PaginationContainer,
  ProjectExcerpt,
  ProjectImage,
  ProjectTitle,
} from './styles';

interface ProjectsPageGridProps {
  projects: WordpressProject[];
}
const ProjectsPageGrid: React.FC<ProjectsPageGridProps> = ({ projects }) => {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(projects.length / 9);

  if (!projects.length) {
    return <p>No projects found.</p>;
  }

  return (
    <div>
      <GridContainer>
        {projects.map((project) => (
          <GridItem key={project.id}>
            {project.featured_image_url && (
              <ProjectImage
                src={project.featured_image_url}
                alt={project.title}
              />
            )}
            <ProjectTitle>{project.title}</ProjectTitle>
            <ProjectExcerpt
              dangerouslySetInnerHTML={{ __html: project.excerpt }}
            />
          </GridItem>
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

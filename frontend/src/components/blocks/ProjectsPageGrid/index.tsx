import { useEffect, useState } from 'react';
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

const ProjectsPageGrid = () => {
  const [projects, setProjects] = useState<WordpressProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const getProjects = async () => {
      setLoading(true);
      try {
        // The Api.fetchProjectsGrid method doesn't return headers, so we have to use fetch directly for now.
        // In a real-world scenario, the API method would be updated to return headers.
        const response = await fetch(
          `http://localhost/wp-json/toutefois/v1/projects-grid?page=${page}&per_page=9`,
        );
        const data = await response.json();
        const totalPagesHeader = response.headers.get('X-WP-TotalPages');

        setProjects(data);
        if (totalPagesHeader) {
          setTotalPages(parseInt(totalPagesHeader, 10));
        }
      } catch (error) {
        console.error('Failed to fetch projects:', error);
      } finally {
        setLoading(false);
      }
    };

    getProjects();
  }, [page]);

  if (loading) {
    return <p>Loading projects...</p>;
  }

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

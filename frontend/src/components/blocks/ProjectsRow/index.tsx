'use client';

import { WordpressProject } from '@/types';
import { useEffect, useState } from 'react';
import Api from '../../../api';
import ProjectCard from './ProjectCard';
import {
  ProjectCardContainer,
  ProjectCardContent,
  ProjectPlaceholderImage,
  ProjectsGrid,
  ProjectsRowContainer,
} from './styles';

interface ProjectsRowProps {
  categoryId?: string;
  title?: string;
  limit?: number;
}

const ProjectsRow: React.FC<ProjectsRowProps> = ({
  categoryId = '',
  title = 'Projects',
  limit = 6,
}) => {
  const [projects, setProjects] = useState<WordpressProject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        // Use the API to fetch projects, filtering by category if provided
        const allProjects = await Api.fetchAllProjects();

        // Filter by category if categoryId is provided
        let filteredProjects = allProjects;
        if (categoryId) {
          filteredProjects = allProjects.filter((project) => {
            // Check if the project has the category with the given ID
            return project.categories?.some(
              (cat) => cat.id.toString() === categoryId,
            );
          });
        }

        // Apply limit
        const limitedProjects = filteredProjects.slice(0, limit);
        setProjects(limitedProjects);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [categoryId, limit]);

  if (loading) {
    // Loading skeleton
    return (
      <ProjectsRowContainer>
        {title && <h2>{title}</h2>}
        <ProjectsGrid>
          {Array.from({ length: 3 }).map((_, index) => (
            <ProjectCardContainer key={`loading-${index}`}>
              <ProjectPlaceholderImage />
              <ProjectCardContent>
                <div
                  style={{
                    height: '24px',
                    backgroundColor: '#f0f0f0',
                    marginBottom: '8px',
                    width: '80%',
                  }}
                />
                <div
                  style={{
                    height: '16px',
                    backgroundColor: '#f0f0f0',
                    marginBottom: '4px',
                    width: '60%',
                  }}
                />
              </ProjectCardContent>
            </ProjectCardContainer>
          ))}
        </ProjectsGrid>
      </ProjectsRowContainer>
    );
  }

  if (!projects.length) {
    return (
      <ProjectsRowContainer>
        {title && <h2>{title}</h2>}
        <p>No projects found.</p>
      </ProjectsRowContainer>
    );
  }

  return (
    <ProjectsRowContainer>
      {title && <h2>{title}</h2>}
      <ProjectsGrid>
        {projects.map((project) => (
          <ProjectCard key={project.id} {...project} />
        ))}
      </ProjectsGrid>
    </ProjectsRowContainer>
  );
};

export default ProjectsRow;

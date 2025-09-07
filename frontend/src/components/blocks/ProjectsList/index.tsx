import { useEffect, useState } from 'react';
import { useTheme } from 'styled-components';
import Api from '../../../api';
import type { WordpressProject } from '../../../types';
import Container from '../../common/Container';
import {
  ListContainer,
  ListItem,
  ProjectExcerpt,
  ProjectImage,
  ProjectTitle,
} from './styles';

const ProjectsList = () => {
  const theme = useTheme();
  const [projects, setProjects] = useState<WordpressProject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProjects = async () => {
      try {
        const data = await Api.fetchAllProjects();
        setProjects(data);
      } catch (error) {
        console.error('Failed to fetch projects:', error);
      } finally {
        setLoading(false);
      }
    };

    getProjects();
  }, []);

  if (loading) {
    return <p>Loading projects...</p>;
  }

  if (!projects.length) {
    return <p>No projects found.</p>;
  }

  return (
    <Container background={theme.colors.sectionColor1}>
      <ListContainer>
        {projects.map((project) => (
          <ListItem key={project.id}>
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
          </ListItem>
        ))}
      </ListContainer>
    </Container>
  );
};

export default ProjectsList;

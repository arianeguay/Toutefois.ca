import Api from '../../../api';
import Container from '../../common/Container';
import {
  ListContainer,
  ListItem,
  ProjectExcerpt,
  ProjectImage,
  ProjectTitle,
} from './styles';

const ProjectsList = async () => {
  const projects = await Api.fetchAllProjects();

  if (!projects.length) {
    return <p>No projects found.</p>;
  }

  return (
    <Container>
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

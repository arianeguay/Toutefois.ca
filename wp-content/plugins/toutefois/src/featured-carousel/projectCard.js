const ProjectCard = ({ project }) => {
  return (
    <div className="project-card">
      {project.featured_image_url && (
        <img src={project.featured_image_url} alt={project.title} />
      )}
      <div className="project-card-overlay">
        <div className="project-card-content">
          <h3>{project.title}</h3>
          <p>{project.excerpt}</p>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;

import apiFetch from "@wordpress/api-fetch";
import { useEffect, useState } from "@wordpress/element";

const ProjectCard = ({ project }) => {
  const [image, setImage] = useState(null);
  useEffect(() => {
    const fetchImage = async () => {
      const image = await apiFetch({
        path: `/wp/v2/media/${project.meta._projet_image_id[0]}`,
      });
      setImage(image);
    };
    fetchImage();
  }, [project.meta._projet_image_id]);

  return (
    <div className="project-card">
      {image && <img src={image.source_url} alt={project.title} />}
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

import apiFetch from "@wordpress/api-fetch";
import { useEffect, useState } from "@wordpress/element";
import ProjectCard from "./projectCard";

const Render = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    apiFetch({ path: "/toutefois/v1/featured-projects" })
      .then((data) => {
        setProjects(data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div>
      <h2>Featured Projects</h2>
      <div className="featured-carousel-content">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
};

export default Render;

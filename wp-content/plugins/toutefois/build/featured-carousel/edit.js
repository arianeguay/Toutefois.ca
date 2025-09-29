import apiFetch from "@wordpress/api-fetch";
import { useBlockProps } from "@wordpress/block-editor";
import { useEffect, useState } from "@wordpress/element";
import Carousel from "./Carousel";
import ProjectCard from "./projectCard";

export default function Edit() {
  const blockProps = useBlockProps({
    className: "wp-block-toutefois-featured-carousel",
  });
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    apiFetch({ path: "/toutefois/v1/featured-projects" })
      .then((data) => {
        setProjects(data || []);
      })
      .catch(() => {});
  }, []);

  return (
    <div {...blockProps}>
      <Carousel>
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </Carousel>
    </div>
  );
}

import { WordpressProject } from '@/types';

const ProjectListCard: React.FC<WordpressProject> = ({ ...project }) => {
  return (
    <div>
      <h2>{project.title}</h2>
      <p>{project.excerpt}</p>
    </div>
  );
};

export default ProjectListCard;

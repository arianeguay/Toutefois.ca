import { useParams } from 'react-router-dom';

const ProjectSinglePage = () => {
  const { slug } = useParams();

  console.log(slug);

  return (
    <div>
      <h1>Project Single Page {slug}</h1>
    </div>
  );
};

export default ProjectSinglePage;

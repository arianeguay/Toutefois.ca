import Carousel from '@/components/common/Carousel';
import Api from '../../../api';
import FeaturedSlide from './FeaturedSlide';
import { CarouselContainer } from './styles';

// Import Swiper styles
import { WordpressImage } from '@/types';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const FeaturedCarousel = async () => {
  const projects = await Api.fetchFeaturedProjects();
  const images: Record<string, WordpressImage> = {};
  for (const project of projects) {
    if (project.meta._projet_image_id) {
      images[project.id] = await Api.fetchImageById(
        project.meta._projet_image_id[0],
      );
    }
  }
  if (!projects?.length) return null;

  return (
    <CarouselContainer>
      <Carousel>
        {projects.map((project) => (
          <FeaturedSlide
            key={project.id}
            project={project}
            image={images[project.id]}
          />
        ))}
      </Carousel>
    </CarouselContainer>
  );
};

export default FeaturedCarousel;

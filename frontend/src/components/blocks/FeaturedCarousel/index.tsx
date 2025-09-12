import Carousel from '@/components/common/Carousel';
import Api from '../../../api';
import FeaturedSlide from './FeaturedSlide';
import { CarouselContainer } from './styles';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const FeaturedCarousel = async () => {
  const projects = await Api.fetchFeaturedProjects();

  return (
    <CarouselContainer>
      <Carousel>
        {projects.map((project) => (
          <FeaturedSlide key={project.id} project={project} />
        ))}
      </Carousel>
    </CarouselContainer>
  );
};

export default FeaturedCarousel;

import styled from 'styled-components';

export const CarouselContainer = styled.div`
  width: 100%;
  margin: 2rem 0;

  .swiper-button-next,
  .swiper-button-prev {
    color: ${({ theme }) => theme.colors.primaryText};
  }

  .swiper-pagination-bullet-active {
    background: ${({ theme }) => theme.colors.primaryText};
  }
`;

export const SlideContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 2rem;
`;

export const ProjectImage = styled.img`
  max-width: 100%;
  height: auto;
  max-height: 400px;
  object-fit: cover;
  margin-bottom: 1rem;
`;

export const ProjectTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.h3};
  margin-bottom: 0.5rem;
`;

export const ProjectExcerpt = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.body};
`;

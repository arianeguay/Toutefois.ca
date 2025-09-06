import styled from 'styled-components';

export const CarouselContainer = styled.div`
  width: 100%;

  .swiper-button-next,
  .swiper-button-prev {
    color: ${({ theme }) => theme.colors.primaryText};
  }

  .swiper-pagination-bullet-active {
    background: ${({ theme }) => theme.colors.primaryText};
  }
`;

export const ProjectTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.h3};
  margin-bottom: 0.5rem;
`;

export const ProjectExcerpt = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.body};
`;

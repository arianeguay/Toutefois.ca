import styled from 'styled-components';

export const CarouselContainer = styled.div`
  border-bottom: 3px solid ${({ theme }) => theme.colors.mainBackground};
  background-color: #000;
  height: calc(
    100vh - ${({ theme }) => theme.appearance.headerHeight} -
      ${({ theme }) => theme.spacing.xxl}px
  );
  overflow: hidden;
  min-height: 720px;
  width: 100%;

  .swiper {
    height: 100%;
    .swiper-pagination-bullet {
      background-color: #fff;

      width: 40px;
      height: auto;
      aspect-ratio: 6 / 1;
      border-radius: 2px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

      &.swiper-pagination-bullet-active {
        background-color: ${({ theme }) =>
          theme.colors.buttonPrimaryBackground};
      }
    }
  }
  @media (max-width: 1200px) {
    .c-slider {
      height: 100%;
      padding-bottom: 40px;
    }
  }

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

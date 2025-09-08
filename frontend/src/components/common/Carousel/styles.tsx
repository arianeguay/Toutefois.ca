import styled, { css } from 'styled-components';

export const SlideContainer = styled.div<{
  $isCurrent: boolean;
}>`
  width: 100%;
  height: 100%;
  position: relative;

  transition: opacity 1s ease-in-out;

  ${({ $isCurrent }) =>
    $isCurrent
      ? css`
          opacity: 1;
        `
      : css`
          opacity: 0;
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        `};
`;

export const CarouselContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

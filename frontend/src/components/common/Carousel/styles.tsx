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

export const CarouselPagination = styled.div`
  width: 100%;
  position: absolute;
  bottom: 0;
  display: flex;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm}px;
  align-items: center;
  z-index: 2;
  padding-block: ${({ theme }) => theme.spacing.md}px;
  padding-inline: ${({ theme }) => theme.spacing.md}px;
`;

export const CarouselPaginationButton = styled.div<{ $isActive: boolean }>`
  width: 40px;
  height: auto;
  aspect-ratio: 4/1;
  cursor: pointer;
  border-radius: ${({ theme }) => theme.borderRadius.sm}px;
  background-color: ${({ theme, $isActive }) =>
    $isActive ? theme.colors.buttonPrimaryBackground : 'white'};
  opacity: ${({ $isActive }) => ($isActive ? 1 : 0.5)};
`;

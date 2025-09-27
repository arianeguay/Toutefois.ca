import styled, { css, keyframes } from 'styled-components';

export const SlideContainer = styled.div<{
  $isCurrent: boolean;
}>`
  width: 100%;
  height: 100%;
  position: relative;

  transition: opacity 500ms ease-in-out;

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

const progressAnim = keyframes`
  from { transform: scaleX(0); }
  to { transform: scaleX(1); }
`;

export const ProgressBar = styled.div<{ $durationMs: number }>`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 4px;
  background: rgba(0, 0, 0, 0.15);
  overflow: hidden;
  z-index: 1; /* keep below pagination (which is z-index: 2) */

  &:after {
    content: '';
    display: block;
    width: 100%;
    height: 100%;
    background: ${({ theme }) => theme.colors.buttonPrimaryBackground};
    transform-origin: left center;
    transform: scaleX(0);
    animation: ${progressAnim} ${({ $durationMs }) => $durationMs}ms linear
      forwards;
  }
`;

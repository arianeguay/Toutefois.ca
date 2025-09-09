'use client';

import styled, { css } from 'styled-components';

export const SlideBody = styled.div`
  max-width: 450px;
  width: 100%;
  color: ${({ theme }) => theme.colors.lightText};
`;

export const ProjectImage = styled.img`
  object-position: center;
  object-fit: contain;

  max-width: 100%;
  max-height: 100%;
  height: auto;
  width: auto;

  box-shadow: ${({ theme }) => theme.boxShadow.lg};
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.borderColor1};
  background-color: #111;
`;

export const SlideCover = styled.div`
  width: 100%;
  max-width: 60%;
  max-height: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-block: ${({ theme }) => theme.spacing.xxl}px;
  ${ProjectImage} {
    border-radius: ${({ theme }) => theme.borderRadius.sm}px;
    width: auto;
    height: auto;
  }
`;

const background = (backgroundUrl: string) => css`
  width: 100%;
  height: 100%;
  background-image: url(${backgroundUrl});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-color: #00000070;
  background-blend-mode: overlay;
`;

export const FeaturedSlideOverlay = styled.div<{ $backgroundUrl: string }>`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-image: url(${({ $backgroundUrl }) => $backgroundUrl});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #00000070;
    z-index: 1;
    backdrop-filter: blur(10px);
  }
`;

export const FeaturedSlideContainer = styled.div`
  width: 100%;
  height: 100%;
`;

export const FeaturedSlideContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  gap: ${({ theme }) => theme.spacing.xxl}px;
  align-items: center;
  max-width: 1200px;
  margin-inline: auto;
  padding-block: ${({ theme }) => theme.spacing.xxl}px;
  position: relative;
  z-index: 2;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    flex-direction: column-reverse;
    gap: ${({ theme }) => theme.spacing.md}px;
  }
`;

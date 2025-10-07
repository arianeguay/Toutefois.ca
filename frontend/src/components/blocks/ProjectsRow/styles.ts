'use client';

import { ContainerContentStyling } from '@/theme/global-styles';
import hexToRgba from '@/theme/utils/hexToRgba';
import Link from 'next/link';
import styled, { css } from 'styled-components';

export const ProjectsRowContainer = styled.div`
  position: relative;
  --gradient-size: 48px;
  --gradient-size-negative: -48px;
  box-shadow: ${({ theme }) => theme.boxShadow.md};
  border-top: 1px solid ${({ theme }) => theme.colors.sectionColor1};
  border-bottom: 1px solid ${({ theme }) => theme.colors.sectionColor2};
  padding-block: ${({ theme }) => theme.spacing.md}px;
  background-color: ${({ theme }) =>
    hexToRgba(theme.colors.sectionColor1, 0.2)};

  backdrop-filter: blur(4px);
  &:not(:first-child) {
    margin-block-start: ${({ theme }) => theme.spacing.lg}px;
  }
  h2 {
    margin-block: 0;
    position: relative;
    z-index: 2;
  }
`;

export const ProjectsRowContainerContent = styled.div`
  ${ContainerContentStyling}
  .swiper {
    width: 100%;

    --swiper-navigation-color: ${({ theme }) =>
      theme.colors.buttonPrimaryBackground};
    --swiper-pagination-color: ${({ theme }) => theme.colors.primaryText};

    .swiper-wrapper {
      z-index: 1;
    }

    padding-bottom: ${({ theme }) => theme.spacing.xl}px;

    @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
      margin-left: -24px;
      margin-right: -24px;
      padding-left: 24px;
      padding-right: 24px;
      width: calc(100% + 48px) !important;
    }
  }
`;

export const ProjectsGrid = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.md}px;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  }
`;

export const ProjectCard = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid ${({ theme }) => theme.colors.borderColor1};
  border-radius: ${({ theme }) => theme.borderRadius.md}px;
  overflow: hidden;
  background: white;
  transition: all 0.2s ease-in-out;
  height: 100%;

  &:hover {
    box-shadow: ${({ theme }) => theme.boxShadow.md};
    transform: translateY(-2px);
  }
`;

export const ProjectImage = styled.img`
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
  display: block;
`;

export const ProjectPlaceholderImage = styled.div`
  width: 100%;
  aspect-ratio: 16 / 9;
  background-color: ${({ theme }) => theme.colors.mainBackground};
`;

export const ProjectCardContent = styled.div`
  padding: ${({ theme }) => theme.spacing.md}px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

export const ProjectCardTitle = styled.h3`
  margin: 0 0 ${({ theme }) => theme.spacing.sm}px 0;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.primaryText};
`;

export const CategoryLabel = styled.span`
  font-size: 0.8rem;
  padding: ${({ theme }) => theme.spacing.xs}px
    ${({ theme }) => theme.spacing.sm}px;
  background-color: ${({ theme }) => theme.colors.borderColor1};
  border-radius: ${({ theme }) => theme.borderRadius.sm}px;
  margin-right: ${({ theme }) => theme.spacing.xs}px;
  margin-bottom: ${({ theme }) => theme.spacing.xs}px;
  display: inline-block;
  color: ${({ theme }) => theme.colors.secondaryText};
`;

export const ProjectCardExcerpt = styled.p`
  margin: ${({ theme }) => theme.spacing.sm}px 0 0;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.secondaryText};
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
`;

export const ProjectCardBody = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  background-color: #ffffff40;
  backdrop-filter: blur(10px);
  overflow: hidden;
  padding: ${({ theme }) => theme.spacing.md}px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  transition: opacity 0.3s ease-in-out;
  text-align: left;
  p {
    margin: 0;
  }
  color: ${({ theme }) => theme.colors.lightText};
`;

export const ProjectCardContainer = styled.div`
  aspect-ratio: 1;
  border-radius: ${({ theme }) => theme.borderRadius.md}px;
  overflow: hidden;
  color: ${({ theme }) => theme.colors.primaryText};
  position: relative;

  ${ProjectCardBody} {
    opacity: 0;
  }
  &:hover {
    cursor: pointer;
    transform: translateY(-2px);
    ${ProjectCardBody} {
      opacity: 1;
    }
  }
`;

export const ProjectCardLink = styled(Link)`
  &:nth-child(even) {
    ${ProjectCardContainer} {
      flex-direction: row-reverse;
    }
  }
`;
export const ProjectCardCover = styled.div`
  flex-shrink: 0;
  border-radius: ${({ theme }) => theme.borderRadius.md}px;
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.primaryText};
  box-shadow: ${({ theme }) => theme.boxShadow.md};
  width: 100%;
  height: 100%;
  position: relative;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const ProjectCardsRow = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md}px;
  flex-direction: row;
`;

export const SwiperNavigationButton = styled.button<{
  $side?: 'left' | 'right';
  $disabled?: boolean;
}>`
  border: none;
  background-color: transparent;
  box-shadow: none;
  color: ${({ theme }) => theme.colors.buttonPrimaryBackground};
  position: absolute;
  top: 50%;

  width: 30px;
  aspect-ratio: 1;
  transform: translateY(-50%) !important;
  left: ${({ $side }) => ($side === 'left' ? '-35px' : 'auto')};
  right: ${({ $side }) => ($side === 'right' ? '-35px' : 'auto')};
  z-index: 2;
  padding: 0;
  font-size: 30px;

  ${({ $disabled }) =>
    $disabled
      ? css`
          opacity: 0.2;
          &:hover {
            transform: translateY(-50%) !important;

            opacity: 0.2 !important;
          }
        `
      : css`
          cursor: pointer;
          &:hover {
            opacity: 0.8;
            transform: translateY(-50%) !important;
          }
        `}
`;

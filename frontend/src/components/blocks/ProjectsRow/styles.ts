'use client';

import { ContainerContentStyling } from '@/theme/global-styles';
import hexToRgba from '@/theme/utils/hexToRgba';
import Link from 'next/link';
import styled, { css } from 'styled-components';

export const ProjectsRowContainer = styled.div<{ $bgColor?: string }>`
  position: relative;
  --gradient-size: 48px;
  --gradient-size-negative: -48px;
  box-shadow: ${({ theme }) => theme.boxShadow.md};
  border-top: 1px solid
    ${({ theme, $bgColor }) => $bgColor ?? theme.colors.sectionColor1};
  border-bottom: 1px solid
    ${({ theme, $bgColor }) => $bgColor ?? theme.colors.sectionColor2};
  padding-block-start: ${({ theme }) => theme.spacing.lg}px;
  padding-block-end: ${({ theme }) => theme.spacing.xl}px;
  background-color: ${({ theme, $bgColor }) =>
    hexToRgba($bgColor ?? theme.colors.sectionColor1, 0.1)};

  backdrop-filter: blur(2px);
  &:not(:first-child) {
    margin-block-start: ${({ theme }) => theme.spacing.lg}px;
  }
  &:last-child {
    margin-block-end: ${({ theme }) => theme.spacing.lg}px;
  }
  h2 {
    position: relative;
    margin-block-start: 0;
    &:not(:last-child) {
      margin-block-end: ${({ theme }) => theme.spacing.xs}px;
    }
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

    @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
      margin-left: -24px;
      margin-right: -24px;
      padding-left: 24px;
      padding-right: 24px;
      width: calc(100% + 48px) !important;
    }
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

  ${() => css`
    cursor: pointer;
    &:hover {
      opacity: 0.8 !important;
      transform: translateY(-50%) !important;
    }
  `}
`;

export const NavPagination = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.xs}px;
  align-items: center;
  justify-content: center;
  padding-top: ${({ theme }) => theme.spacing.sm}px;
`;

export const NavPaginationDot = styled.div<{ $active?: boolean }>`
  width: 12px;
  aspect-ratio: 1;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.buttonPrimaryBackground};
  box-shadow: ${({ theme }) => theme.boxShadow.xs};
  ${({ $active }) =>
    $active
      ? css`
          background-color: ${({ theme }) => theme.colors.headerBackground};
        `
      : css`
          background-color: ${({ theme }) =>
            theme.colors.buttonPrimaryBackground}80;
          cursor: pointer;
          &:hover {
            transform: translateY(-1px);
            box-shadow: ${({ theme }) => theme.boxShadow.sm};
          }
        `};
`;

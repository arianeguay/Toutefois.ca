'use client';

import { ContainerContentStyling } from '@/theme/global-styles';
import Link from 'next/link';
import styled from 'styled-components';

export const ProjectsRowContainer = styled.div`
  ${ContainerContentStyling}
  &:not(:first-child) {
    margin-block-start: ${({ theme }) => theme.spacing.lg}px;
  }
  .swiper {
    position: relative;
    width: 100%;
    --swiper-navigation-size: 36px;
    --swiper-pagination-bottom: -20px;
    --swiper-navigation-sides-offset: -32px;
    --swiper-navigation-color: ${({ theme }) =>
      theme.colors.buttonPrimaryBackground};
    --swiper-pagination-color: ${({ theme }) => theme.colors.primaryText};
    overflow: visible;
    --swiper-padding-horizontal: 30px;

    padding-block: 4px;

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
  background-color: white;
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
  width: 300px;
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

'use client';

import { ContainerContentStyling } from '@/theme/global-styles';
import styled from 'styled-components';

export const BackgroundImage = styled.div<{ $src: string }>`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
  user-select: none;
  opacity: 0.2;
  background-image: url(${({ $src }) => $src});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  transition: background-image 0.2s ease-in-out;
`;

export const ContentCardContainer = styled.article`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.colors.primaryText};
  height: 100%;
  background-color: white;
  transition: all 0.2s ease-in-out;
  &:hover {
    cursor: pointer;
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.boxShadow.lg};
  }
`;

export const ContentListContainer = styled.div`
  max-width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  ${ContainerContentStyling}
  overflow:hidden;
  padding-inline: ${({ theme }) => theme.spacing.xl}px;
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding-inline: ${({ theme }) => theme.spacing.xxl}px;
  }
  padding-block-end: ${({ theme }) => theme.spacing.xs}px;
  .swiper {
    width: 100%;
    --swiper-navigation-size: 36px;
    --swiper-pagination-bottom: -20px;
    --swiper-navigation-sides-offset: -32px;
    --swiper-navigation-color: ${({ theme }) => theme.colors.lightText};
    --swiper-pagination-color: ${({ theme }) => theme.colors.lightText};
    overflow: visible;
    .swiper-wrapper {
      padding-block: ${({ theme }) => theme.spacing.md}px;
      width: 100%;
      align-items: stretch;

      & > * {
        height: auto;
      }
    }
  }
`;

export const ContentCardContent = styled.div`
  padding-inline: ${({ theme }) => theme.spacing.md}px;
  padding-block-end: ${({ theme }) => theme.spacing.lg}px;
  text-align: center;
  flex: 1;
  & > h3:not(:last-child),
  & > p:not(:last-child) {
    margin-block-end: 0 !important;
  }
  & > p:not(:first-child),
  & > h3:not(:first-child):not(h2 + & h3) {
    margin-block-start: 0 !important;
  }

  h3 {
    color: ${({ theme }) => theme.prose.link};
  }
`;

export const ContentImage = styled.img`
  max-width: 100%;
  height: auto;
  aspect-ratio: 16/9;
  background-color: ${({ theme }) => theme.colors.lightText};
  border-bottom: ${({ theme }) => theme.borders.strong};
  object-fit: cover;
  margin-bottom: ${({ theme }) => theme.spacing.lg}px;
`;

export const ContentListHeader = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.xs}px;
  display: flex;
  flex-direction: column;
  align-items: center;

  h2 {
    text-shadow: ${({ theme }) => theme.colors.primaryText}70 2px 3px 3px;
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.sm}px;
    text-align: center;
    margin-bottom: ${({ theme }) => theme.spacing.lg}px;
  }
`;

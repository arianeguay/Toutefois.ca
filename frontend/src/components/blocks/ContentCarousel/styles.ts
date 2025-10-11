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

export const ContentListContainer = styled.div`
  max-width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  ${ContainerContentStyling}
  overflow:hidden;
  padding-inline: 30px;
  padding-block-end: ${({ theme }) => theme.spacing.lg}px;
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding-inline: ${({ theme }) => theme.spacing.xxl}px;
  }
  .swiper {
    width: 100%;
    --swiper-navigation-size: 36px;
    --swiper-pagination-bottom: -20px;
    --swiper-navigation-sides-offset: -28px;
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

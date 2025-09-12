'use client';

import { ContainerContentStyling } from '@/theme/global-styles';
import styled from 'styled-components';

export const BackgroundImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
  user-select: none;
  opacity: 0.2;
`;

export const ContentCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.colors.primaryText};
  height: 100%;
  border-radius: ${({ theme }) => theme.borderRadius.md}px;
  box-shadow: ${({ theme }) => theme.boxShadow.md};
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
  ${ContainerContentStyling}
  overflow:hidden;
  padding-inline: 32px;
  padding-block-end: ${({ theme }) => theme.spacing.lg}px;
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
  padding-inline: ${({ theme }) => theme.spacing.lg}px;
  padding-block: ${({ theme }) => theme.spacing.md}px;
  background-color: white;

  margin-top: -${({ theme }) => theme.spacing.md * 2}px;
  border-radius: ${({ theme }) => theme.borderRadius.md}px;
  border: 1px solid ${({ theme }) => theme.colors.borderColor1};

  flex: 1;
  p {
    margin: 0;
  }
`;

export const ContentImage = styled.img`
  max-width: 100%;
  height: auto;
  aspect-ratio: 16/9;
  background-color: ${({ theme }) => theme.colors.headerBackground};
  border-radius: ${({ theme }) => theme.borderRadius.md}px;
  border: 1px solid ${({ theme }) => theme.colors.borderColor1};
  object-fit: cover;
  margin-bottom: 1rem;
`;

export const ContentListHeader = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.md}px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.sm}px;
    text-align: center;
    margin-bottom: ${({ theme }) => theme.spacing.lg}px;
  }
`;

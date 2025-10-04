'use client';
import { ContainerContentStyling } from '@/theme/global-styles';
import styled from 'styled-components';

export const NewsPageContent = styled.div`
  background-color: white;
  ${ContainerContentStyling}

  border: ${({ theme }) => theme.borders.strong};
`;

export const NewsPageHeaderContainer = styled.div`
  display: flex;
  padding-inline: ${({ theme }) => theme.spacing.xl}px;
  padding-block: ${({ theme }) => theme.spacing.md}px;
  border-bottom: ${({ theme }) => theme.borders.strong};
  width: 100%;
  gap: ${({ theme }) => theme.spacing.sm}px;
`;

export const NewsPageHeaderLogo = styled.img`
  width: 45px;
  height: 45px;
  object-fit: cover;
  background-color: ${({ theme }) => theme.colors.headerBackground};
  border-radius: 100%;
`;

export const NewsPageHeaderHeading = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs}px;

  p {
    margin-block: 0 !important;
  }

  a {
    text-decoration: none;
  }
`;

export const NewsPageBody = styled.div`
  padding-inline: ${({ theme }) => theme.spacing.xl}px;
  padding-block: ${({ theme }) => theme.spacing.lg}px;
`;

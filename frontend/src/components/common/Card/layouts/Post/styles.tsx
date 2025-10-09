'use client';
import styled from 'styled-components';
import { ContentType } from '../..';
import { ContentBodyContent, ContentCardContainerStyling } from '../../styles';

export const PostContentCardContent = styled.article<{ type: ContentType }>`
  background-color: white;
  position: relative;
  display: flex;
  flex-direction: column;
  position: relative;
  justify-content: space-between;
  padding-block-start: ${({ theme }) => theme.spacing.sm}px;
  padding-block-end: ${({ theme }) => theme.spacing.md}px;
  height: 120px;
  padding-inline: ${({ theme }) => theme.spacing.lg}px;
  flex-shrink: 0;
  ${ContentBodyContent} {
    text-align: left;
    gap: ${({ theme }) => theme.spacing.md}px;
    p {
      &:not(:first-child),
      &:not(:last-child) {
        margin-block-start: 0;
        margin-block-end: 0;
      }
    }
  }
`;

export const PostContentCardContainer = styled.div`
  ${ContentCardContainerStyling}
`;

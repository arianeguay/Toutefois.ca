'use client';
import styled from 'styled-components';
import { ContentType } from '../..';
import { ContentBodyContent, ContentCardContainerStyling } from '../../styles';

export const ProjectContentCardContent = styled.article<{ type: ContentType }>`
  background-color: white;
  position: relative;
  text-align: center;
  display: flex;
  flex-direction: column;
  position: relative;
  flex: 1;
  justify-content: space-between;

  &:before {
    content: '';
    position: absolute;
    top: -79px;
    left: 1px;
    width: 100%;
    height: 80px;
    background-color: inherit; /* match card color */
    clip-path: polygon(100% 0, 100% 100%, 15% 99%);
    pointer-events: none;
  }
  &:after {
    content: '';
    position: absolute;
    top: -79px;
    left: -1px;
    width: 100%;
    height: 80px;
    background-color: inherit; /* match card color */
    clip-path: polygon(59% 100%, 0 34%, 0 100%);
    pointer-events: none;
  }

  ${ContentBodyContent} {
    margin-block-start: -30px;
  }
`;

export const ContentBodyContentHeading = styled.div`
  text-align: right;
  color: ${({ theme }) => theme.prose.link};

  & > h3 {
    margin-block: 0 !important;
  }
  padding-inline-end: ${({ theme }) => theme.spacing.md}px;
  padding-inline-start: ${({ theme }) => theme.spacing.md}px;
  padding-block-end: ${({ theme }) => theme.spacing.md}px;
  padding-block-start: ${({ theme }) => theme.spacing.sm}px;
`;
export const ContentBodyContentDescription = styled.div`
  padding-inline: ${({ theme }) => theme.spacing.lg}px;
  padding-block-start: ${({ theme }) => theme.spacing.sm}px;
  padding-block-end: ${({ theme }) => theme.spacing.md}px;
  border-top: 1px solid ${({ theme }) => theme.colors.borderColor1};
`;

export const ProjectContentCardContainer = styled.div`
  ${ContentCardContainerStyling}
`;

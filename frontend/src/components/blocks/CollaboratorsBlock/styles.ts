'use client';
import { ContainerContentStyling } from '@/theme/global-styles';
import createFontStyleCSS from '@/theme/utils/createFontStyleCSS';
import styled, { css } from 'styled-components';

interface ContainerProps {
  $layout: 'vertical' | 'horizontal';
}

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  text-decoration: none;
  color: inherit;
  cursor: default;
  scroll-margin-top: calc(
    ${({ theme }) => theme.appearance.headerHeight} +
      ${({ theme }) => theme.spacing.md}px
  );
`;
export const Name = styled.h3``;
export const Position = styled.p`
  color: ${({ theme }) => theme.colors.primaryText};
`;
export const Excerpt = styled.div`
  color: ${({ theme }) => theme.colors.tertiaryText};
  
  /* Apply paragraph styling to maintain appearance */
  .paragraph {
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
  }
`;

export const PhotoContainer = styled.div`
  flex-shrink: 0;
  width: 300px;
  aspect-ratio: 11/16;
  padding: 0;
  margin: 0;
  display: flex;
  background-color: ${({ theme }) => theme.colors.borderColor1};
  box-shadow: ${({ theme }) => theme.boxShadow.sm};
`;
export const Photo = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  margin: 0;
`;

export const Info = styled.div`
  width: 100%;
`;
const ContainerVerticalStyling = css`
  flex-direction: column;

  ${Card} {
    margin-block: ${({ theme }) => theme.spacing.md}px;
    position: relative;
    ${ContainerContentStyling}
    z-index: 1;

    background-color: ${({ theme }) => theme.colors.sectionColor3}10;
    box-shadow: ${({ theme }) => theme.boxShadow.sm};
    border: 1px solid ${({ theme }) => theme.colors.borderColor1};
    border-radius: ${({ theme }) => theme.borderRadius.sm}px;
    overflow: hidden;
    max-width: ${({ theme }) => 1200 + theme.spacing.xxl}px;
    flex-direction: row;
    align-items: center;

    @media (max-width: ${({ theme }) => theme.content.maxWidth}px) {
      padding-inline: 0;
    }
    &:nth-child(even) {
      flex-direction: row-reverse;
      ${PhotoContainer} {
        border-left: ${({ theme }) => theme.borders.strong};
      }
    }

    &:not(:nth-child(even)) {
      ${PhotoContainer} {
        border-right: ${({ theme }) => theme.borders.strong};
      }
    }

    ${PhotoContainer} {
      width: 280px;
    }

    ${Name} {
      ${createFontStyleCSS('h3')}
      margin:0;
    }
    ${Position} {
      ${createFontStyleCSS('h4')}
      margin:0;
    }
    ${Excerpt} {
      ${createFontStyleCSS('body')}
    }
    ${Info} {
      padding-block: ${({ theme }) => theme.spacing.md}px;
      padding-inline: ${({ theme }) => theme.spacing.xxl}px;
    }
    @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
      flex-direction: column;
      align-items: center;
      text-align: center;
      &:nth-child(even) {
        flex-direction: column;
      }
      ${PhotoContainer} {
        width: 100%;
        max-width: 360px;
        box-shadow: ${({ theme }) => theme.boxShadow.md};
        margin-block-start: ${({ theme }) => theme.spacing.md}px;
        border-radius: ${({ theme }) => theme.borderRadius.md}px;
        overflow: hidden;
        border: 1px solid ${({ theme }) => theme.colors.borderColor1};
      }
      ${Info} {
        padding-inline: 0;
        max-width: 460px;
      }
    }
  }
`;

const ContainerHorizontalStyling = css`
  flex-direction: row;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.xl}px;
  ${ContainerContentStyling}

  ${Card} {
    flex-direction: column;
    width: 370px;

    &:not(:last-child) {
      padding-inline-end: ${({ theme }) => theme.spacing.md}px;
    }
    &:not(:first-child) {
      padding-inline-start: ${({ theme }) => theme.spacing.md}px;
    }
    ${PhotoContainer} {
      width: 250px;
    }
    ${Name} {
      ${createFontStyleCSS('h4')}
      margin:0;
    }
    ${Position} {
      ${createFontStyleCSS('subtitle')}
      margin:0;
    }
    ${Excerpt} {
      ${createFontStyleCSS('small')}
    }
    ${Info} {
      padding-block-start: ${({ theme }) => theme.spacing.md}px;
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    align-items: center;
    gap: ${({ theme }) => theme.spacing.xl}px;
    ${Card} {
      text-align: center;
      flex-direction: column;
      align-items: center;
      width: 100%;
      max-width: 460px;
    }
  }
`;

export const Container = styled.div<ContainerProps>`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md}px;
  justify-content: center;

  ${({ $layout }) =>
    $layout === 'vertical'
      ? ContainerVerticalStyling
      : ContainerHorizontalStyling}
`;

import { ContainerContentStyling } from '@/theme/global-styles';
import createFontStyleCSS from '@/theme/utils/createFontStyleCSS';
import styled, { css } from 'styled-components';

interface ContainerProps {
  $layout: 'vertical' | 'horizontal';
}

export const Card = styled.a`
  display: flex;
  flex-direction: column;
  text-decoration: none;
  color: inherit;
`;
export const Name = styled.h3``;
export const Position = styled.p`
  color: ${({ theme }) => theme.colors.primaryText};
`;
export const Excerpt = styled.p``;

export const PhotoContainer = styled.div`
  flex-shrink: 0;
  width: 350px;
  aspect-ratio: 11/16;
  background-color: ${({ theme }) => theme.colors.borderColor1};
`;
export const Photo = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const Info = styled.div``;
const ContainerVerticalStyling = css`
  flex-direction: column;
  ${Card} {
    flex-direction: row;
    align-items: center;
    &:nth-child(even) {
      flex-direction: row-reverse;
    }

    ${PhotoContainer} {
      width: 350px;
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
      padding-inline: ${({ theme }) => theme.spacing.xlAdd}px;
    }
  }
`;

const ContainerHorizontalStyling = css`
  flex-direction: row;
  flex-wrap: wrap;

  ${Card} {
    flex-direction: column;
    width: 380px;
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
`;

export const Container = styled.div<ContainerProps>`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md}px;
  justify-content: center;

  ${ContainerContentStyling}
  ${({ $layout }) =>
    $layout === 'vertical'
      ? ContainerVerticalStyling
      : ContainerHorizontalStyling}
`;

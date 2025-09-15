'use client';
import { createGlobalStyle, css } from 'styled-components';
import { FontFaces } from './fonts';
import createFontStyleCSS from './utils/createFontStyleCSS';

export const ContainerContentStyling = css`
  max-width: ${({ theme }) => theme.content.maxWidth}px;
  margin-inline: auto;
  width: 100%;

  @media (max-width: ${({ theme }) => theme.content.maxWidth}px) {
    padding-inline: ${({ theme }) => theme.spacing.xl}px;
  }
`;

export const DefaultStyling = createGlobalStyle`
${FontFaces}
body {
    background-color: ${({ theme }) => theme.colors.mainBackground};
    color: ${({ theme }) => theme.colors.primaryText};
    font-family: ${({ theme }) => theme.fonts.primary};
    max-width:100vw;
    width: 100%;
    overflow-x: hidden;
    
    .app {
      width: 100%;
    }

    h1 {${createFontStyleCSS('h1')}}
    h2 {${createFontStyleCSS('h2')}}
    h3 {${createFontStyleCSS('h3')}}
    h4 {${createFontStyleCSS('h4')}}
    p {${createFontStyleCSS('body')}}
    
    
 
}`;

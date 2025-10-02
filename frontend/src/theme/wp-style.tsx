// styles/wordpress.ts
import { css } from 'styled-components';
import { ContainerContentStyling } from './global-styles';
import createFontStyleCSS from './utils/createFontStyleCSS';

export const WordpressStyling = css`
  /* Container-like blocks get the site width and spacing */

  .has-medium-font-size {
    ${createFontStyleCSS('body')}
  }

  /* Zeffy Block (WP) */
  .wp-block-toutefois-zeffy {
    ${ContainerContentStyling}
    .toutefois-zeffy__frame {
      width: 100%;
      min-height: 400px;
      iframe {
        display: block;
        width: 100%;
        border: 0;
      }
    }
  }

  /* Projects List (WP) */
  .wp-block-toutefois-projects-list {
    ${ContainerContentStyling}
    .toutefois-projects-list__title {
      margin-bottom: ${({ theme }) => theme.spacing.sm}px;
      text-align: center;
    }
    .projects-grid {
      list-style: none;
      padding: 0;
      margin: 0;
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
      gap: ${({ theme }) => theme.spacing.md}px;
    }
    .project-item {
      background: ${({ theme }) => theme.colors.sectionColor3}10;
      border: 1px solid ${({ theme }) => theme.colors.borderColor1};
      border-radius: ${({ theme }) => theme.borderRadius.sm}px;
      box-shadow: ${({ theme }) => theme.boxShadow.xs};
      padding: ${({ theme }) => theme.spacing.md}px;
    }
  }

  /* Projects Page Grid (WP) */
  .wp-block-toutefois-projects-page-grid {
    ${ContainerContentStyling}
    .projects-grid {
      list-style: none;
      padding: 0;
      margin: 0;
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
      gap: ${({ theme }) => theme.spacing.md}px;
    }
    .project-item {
      background: ${({ theme }) => theme.colors.sectionColor3}10;
      border: 1px solid ${({ theme }) => theme.colors.borderColor1};
      border-radius: ${({ theme }) => theme.borderRadius.sm}px;
      box-shadow: ${({ theme }) => theme.boxShadow.xs};
      padding: ${({ theme }) => theme.spacing.md}px;
    }
  }

  /* News List (WP) */
  .wp-block-toutefois-news-list {
    ${ContainerContentStyling}
    .toutefois-news-list__title {
      margin-bottom: ${({ theme }) => theme.spacing.sm}px;
      text-align: center;
    }
    .news-grid {
      list-style: none;
      padding: 0;
      margin: 0;
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
      gap: ${({ theme }) => theme.spacing.md}px;
    }
    .news-item {
      background: ${({ theme }) => theme.colors.sectionColor3}10;
      border: 1px solid ${({ theme }) => theme.colors.borderColor1};
      border-radius: ${({ theme }) => theme.borderRadius.sm}px;
      box-shadow: ${({ theme }) => theme.boxShadow.xs};
      padding: ${({ theme }) => theme.spacing.md}px;
    }
  }
  .has-large-font-size {
    ${createFontStyleCSS('big')}
  }
  .has-small-font-size {
    ${createFontStyleCSS('small')}
  }

  .has-background {
    border-bottom: ${({ theme }) => theme.borders.section};
    box-shadow: ${({ theme }) => theme.boxShadow.md};
    position: relative;
    &.has-toutefois-dark-background-color {
      background-color: ${({ theme }) => theme.colors.sectionColor3};
      color: ${({ theme }) => theme.colors.lightText};
    }
    &.has-toutefois-red-background-color {
      background-color: ${({ theme }) => theme.colors.sectionColor1};
      color: ${({ theme }) => theme.colors.lightText};
    }
    &.has-toutefois-teal-background-color {
      background-color: ${({ theme }) => theme.colors.sectionColor4};
      color: ${({ theme }) => theme.colors.lightText};
    }
    &.has-toutefois-purple-background-color {
      background-color: ${({ theme }) => theme.colors.sectionColor2};
      color: ${({ theme }) => theme.colors.lightText};
    }
  }
  .has-text-color {
    &.has-toutefois-light-text-color {
      color: ${({ theme }) => theme.colors.lightText};
    }
    &.has-toutefois-primary-text-color {
      color: ${({ theme }) => theme.colors.primaryText};
    }
    &.has-toutefois-secondary-text-color {
      color: ${({ theme }) => theme.colors.secondaryText};
    }
    a {
      color: inherit;
      &:hover {
        color: inherit;
      }
    }
  }
  .is-nowrap {
    display: flex;
    flex-wrap: nowrap;
    gap: ${({ theme }) => theme.spacing.xl}px;

    & > .wp-block-image {
      flex-shrink: 0;
    }
  }

  .is-content-justification-left {
    justify-content: flex-start;
  }
  .is-content-justification-center {
    justify-content: center;
  }
  .is-content-justification-right {
    justify-content: flex-end;
  }

  & > p,
  & > ul,
  & > ol,
  & > h1,
  & > h2,
  & > h3,
  & > h4,
  & > h5,
  & > h6 {
    ${ContainerContentStyling}
  }

  .wp-block-group {
    &:not(.wp-block-group .wp-block-group) {
      padding-block: ${({ theme }) => theme.spacing.xxl}px;
      &:not(.alignfull) {
        ${ContainerContentStyling}
        padding-block: ${({ theme }) => theme.spacing.md}px;
      }

      &.alignfull {
        max-width: none;
        padding-left: 0;
        padding-right: 0;
        & > .wp-block-group__inner-container,
        & > .wp-block-columns,
        & > p,
        & > ul,
        & > ol,
        & > h1,
        & > h2,
        & > h3,
        & > h4,
        & > h5,
        & > h6 {
          ${ContainerContentStyling}
        }
      }
    }
  }

  /* Tighter defaults for pure text blocks */
  .wp-block-paragraph,
  .wp-block-list,
  .wp-block-heading {
    ${ContainerContentStyling}
  }

  /* Alignments (Gutenberg) */
  .alignwide,
  .wp-block[data-align='wide'] {
    max-width: ${({ theme }) => Math.round(theme.content.maxWidth * 1.1)}px;
  }

  & ­ > *:not(.alignfull) {
    ${ContainerContentStyling}
  }
  .alignfull,
  .wp-block[data-align='full'] {
    max-width: none;
    padding-left: 0;
    padding-right: 0;
  }

  .alignleft {
    float: left;
    margin: 4px 16px 8px 0;
    max-width: 50%;
  }
  .alignright {
    float: right;
    margin: 4px 0 8px 16px;
    max-width: 50%;
  }
  .aligncenter {
    display: block;
    margin-left: auto;
    margin-right: auto;
  }

  /* Typography helpers (uses your createFontStyleCSS in GlobalStyle for h1..p) */
  a {
    color: ${({ theme }) => theme.prose.link};
    text-decoration-thickness: 2px;
    text-underline-offset: 3px;
    text-decoration: underline;

    &:hover {
      text-decoration: none;
    }
  }
  a:hover {
    color: ${({ theme }) => theme.prose.linkHover};
  }

  & > .wp-block-image {
    &.size-large {
      ${ContainerContentStyling}
      height: auto;
      margin-block: ${({ theme }) => theme.spacing.xl}px;

      img {
        border: ${({ theme }) => theme.borders.subtle};
        width: 80%;
        margin-inline: auto;
        max-height: 650px;
        height: auto;
        object-fit: cover;
      }
    }
  }
  p {
    &:not(:first-child) {
      margin-block-start: ${({ theme }) => theme.spacing.sm}px;
    }
    &:not(:first-child) {
      margin-block-end: ${({ theme }) => theme.spacing.sm}px;
    }
  }
  h1 {
    margin-block-start: ${({ theme }) => theme.spacing.xxl}px;

    &:not(:first-child) {
      margin-block-end: ${({ theme }) => theme.spacing.xl}px;
    }
    & + h2 {
      margin-block-start: 0;
    }
  }
  h2 {
    margin-block-start: ${({ theme }) => theme.spacing.xl}px;

    &:not(:last-child) {
      margin-block-end: ${({ theme }) => theme.spacing.xl}px;
    }
    & + h3 {
      margin-block-start: 0;
    }
  }
  h3 {
    &:not(h2 + &) {
      margin-block-start: ${({ theme }) => theme.spacing.lg}px;
    }
    &:not(:last-child) {
      margin-block-end: ${({ theme }) => theme.spacing.lg}px;
    }
    & + h4 {
      margin-block-start: 0;
    }
  }

  .alignfull,
  .wp-block[data-align='full'] {
    max-width: none;
    padding-left: 0;
    padding-right: 0;
    width: 100%;
    &.wp-block-image {
      width: 100%;
    }
  }
  h4 {
    &:not(h3 + h4) {
      margin-block-start: ${({ theme }) => theme.spacing.lg}px;
    }
    &:not(:last-child) {
      margin-block-end: ${({ theme }) => theme.spacing.lg}px;
    }
    & + h5 {
      margin-block-start: 0;
    }
  }
  h5 {
    &:not(h4 + h5) {
      margin-block-start: ${({ theme }) => theme.spacing.md}px;
    }
    &:not(:last-child) {
      margin-block-end: ${({ theme }) => theme.spacing.md}px;
    }
    & + h6 {
      margin-block-start: 0;
    }
  }
  h6 {
    &:not(h5 + h6) {
      margin-block-start: ${({ theme }) => theme.spacing.md}px;
    }
    &:not(:last-child) {
      margin-block-end: ${({ theme }) => theme.spacing.md}px;
    }
  }
  .is-layout-flex {
    display: flex;

    &:not(.is-vertical) {
      flex-direction: row;
      &.is-content-justification-center {
        justify-content: center;
      }
      &.is-content-justification-left {
        justify-content: flex-start;
      }
      &.is-content-justification-right {
        justify-content: flex-end;
      }
      @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
        flex-direction: column;
        &.is-content-justification-center {
          justify-content: flex-start;
          align-items: center;
        }
        &.is-content-justification-left {
          justify-content: flex-start;
          align-items: flex-start;
        }
        &.is-content-justification-right {
          justify-content: flex-start;
          align-items: flex-end;
        }
      }
    }
    &.is-vertical {
      flex-direction: column;
      &.is-content-justification-center {
        align-items: center;
      }
      &.is-content-justification-left {
        align-items: flex-start;
      }
      &.is-content-justification-right {
        align-items: flex-end;
      }
    }
  }
  /* Lists */
  ul,
  ol {
    padding-left: ${({ theme }) => theme.spacing.lg}px;
    margin: 12px auto;
  }
  li {
    margin: 6px 0;
  }
  ul ul,
  ol ol,
  ul ol,
  ol ul {
    margin: 6px 0 6px 12px;
  }

  /* Separator / HR */
  .wp-block-separator,
  hr {
    border: none;
    height: 1px;
    background: ${({ theme }) => theme.prose.hr};
    margin: 32px auto;
    max-width: 200px;
  }
  .wp-block-separator.is-style-dots {
    background: none;
    text-align: center;
  }
  .has-text-align-center {
    text-align: center;
  }
  .has-text-align-left {
    text-align: left;
  }
  .has-text-align-right {
    text-align: right;
  }
  .wp-block-separator.is-style-dots::before {
    content: '···';
    letter-spacing: 16px;
    color: ${({ theme }) => theme.colors.secondaryText};
  }

  /* Quotes */
  .wp-block-quote,
  blockquote {
    border-left: 4px solid ${({ theme }) => theme.prose.quoteBar};
    padding-left: ${({ theme }) => theme.spacing.md}px;
    margin: 20px auto;
    color: ${({ theme }) => theme.colors.secondaryText};
    font-style: italic;
    background: ${({ theme }) => theme.prose.softBg};
  }
  .wp-block-quote cite,
  blockquote cite {
    display: block;
    margin-top: 8px;
    font-style: normal;
    color: ${({ theme }) => theme.colors.primaryText};
  }

  /* Pullquote */
  .wp-block-pullquote {
    border-top: 4px solid ${({ theme }) => theme.prose.quoteBar};
    border-bottom: 4px solid ${({ theme }) => theme.prose.quoteBar};
    text-align: center;
    padding: ${({ theme }) => theme.spacing.lg}px 0;
    margin: 28px auto;
  }
  .wp-block-pullquote cite {
    color: ${({ theme }) => theme.colors.secondaryText};
  }

  /* Images */
  .wp-block-image img {
    width: 100%;
    height: auto;
    display: block;
  }

  figure:not(:first-child) {
    margin: 16px auto;
  }
  figcaption,
  .wp-caption-text {
    font-size: ${({ theme }) => theme.fontSizes.small}px;
    line-height: ${({ theme }) => theme.lineHeights.small}px;
    color: ${({ theme }) => theme.colors.secondaryText};
    text-align: center;
    margin-top: 8px;
  }

  /* Gallery */
  .wp-block-gallery {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: ${({ theme }) => theme.spacing.md}px;
  }
  .wp-block-gallery .wp-block-image img {
    border-radius: ${({ theme }) => theme.borderRadius.md}px;
  }
  .wp-block-image.is-style-rounded img {
    border-radius: 9999px;
  }

  /* Embeds (YouTube, Vimeo, etc.) */
  .wp-block-embed,
  .wp-block-embed__wrapper,
  iframe[src*='youtube'],
  iframe[src*='vimeo'] {
    position: relative;
    width: 100%;
    margin: 0 auto 16px;
    display: block;
  }
  .wp-embed-aspect-16-9 .wp-block-embed__wrapper,
  .responsive-embed.is-16by9 {
    padding-bottom: 56.25%;
  }
  .wp-embed-aspect-4-3 .wp-block-embed__wrapper,
  .responsive-embed.is-4by3 {
    padding-bottom: 75%;
  }
  .wp-block-embed__wrapper iframe,
  .responsive-embed iframe,
  .responsive-embed video,
  .responsive-embed object,
  .responsive-embed embed {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    border: 0;
    border-radius: ${({ theme }) => theme.content.mediaRadius}px;
  }

  /* Tables */
  .wp-block-table,
  .wp-block-table table,
  table {
    width: 100%;
    border-collapse: collapse;
    border: ${({ theme }) => theme.borders.subtle};
    border-radius: ${({ theme }) => theme.borderRadius.md}px;
    overflow: hidden;
    ${ContainerContentStyling}
  }
  .wp-block-table th,
  .wp-block-table td,
  th,
  td {
    padding: ${({ theme }) => theme.spacing.sm}px
      ${({ theme }) => theme.spacing.md}px;
    border-bottom: ${({ theme }) => theme.borders.subtle};
    text-align: left;
  }
  thead th {
    background: ${({ theme }) => theme.prose.softBg};
    font-weight: ${({ theme }) => theme.fontWeights.bold};
  }
  tbody tr:nth-child(odd) {
    background: ${({ theme }) => theme.prose.zebra};
  }

  /* Code / Pre */
  code,
  kbd,
  samp {
    font-family:
      ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono',
      'Courier New', monospace;
    font-size: ${({ theme }) => Math.round(theme.fontSizes.body * 0.95)}px;
    background: rgba(0, 0, 0, 0.06);
    padding: 2px 6px;
    border-radius: ${({ theme }) => theme.borderRadius.xs}px;
  }
  pre,
  .wp-block-code {
    background: ${({ theme }) => theme.prose.codeBg};
    color: ${({ theme }) => theme.prose.codeFg};
    border-radius: ${({ theme }) => theme.borderRadius.md}px;
    padding: 16px 20px;
    overflow: auto;
    line-height: ${({ theme }) => theme.lineHeights.body}px;
    box-shadow: ${({ theme }) => theme.boxShadow.xs};
  }
  pre code {
    background: transparent;
    padding: 0;
    color: inherit;
  }

  /* Buttons (map to your theme buttons) */
  .wp-block-button .wp-block-button__link,
  .button,
  input[type='submit'],
  input[type='button'] {
    display: inline-block;
    border: 1px solid transparent;
    border-radius: ${({ theme }) => theme.borderRadius.sm}px;
    padding: ${({ theme }) => theme.spacing.sm}px
      ${({ theme }) => theme.spacing.md}px;
    font-weight: ${({ theme }) => theme.fontWeights.semibold};
    line-height: 1;
    background: ${({ theme }) => theme.colors.buttonPrimaryBackground};
    color: ${({ theme }) => theme.colors.buttonPrimaryColor};
    text-decoration: none;
    transition:
      transform 60ms ease,
      opacity 150ms ease,
      background 150ms ease;
    box-shadow: ${({ theme }) => theme.boxShadow.xs};
  }
  .wp-block-button.is-style-outline .wp-block-button__link {
    background: transparent;
    color: ${({ theme }) => theme.colors.buttonTertiaryBackground};
    border-color: ${({ theme }) => theme.colors.buttonTertiaryBackground};
  }
  .wp-block-button .wp-block-button__link:hover,
  .button:hover,
  button:hover,
  input[type='submit']:hover,
  input[type='button']:hover {
    opacity: 0.92;
    transform: translateY(-1px);
  }

  /* Secondary & Tertiary utility (if authors add classes) */
  .btn-secondary,
  .is-style-secondary .wp-block-button__link {
    background: ${({ theme }) => theme.colors.buttonSecondaryBackground};
    color: ${({ theme }) => theme.colors.buttonSecondaryColor};
  }
  .btn-tertiary,
  .is-style-tertiary .wp-block-button__link {
    background: ${({ theme }) => theme.colors.buttonTertiaryBackground};
    color: ${({ theme }) => theme.colors.buttonTertiaryColor};
  }

  /* Forms inside content */
  input[type='text'],
  input[type='email'],
  input[type='url'],
  input[type='search'],
  textarea,
  select {
    width: 100%;
    max-width: ${({ theme }) => theme.content.narrow}px;
    background: white;
    color: ${({ theme }) => theme.colors.primaryText};
    border: ${({ theme }) => theme.borders.strong};
    border-radius: ${({ theme }) => theme.borderRadius.sm}px;
    padding: 10px 12px;
    outline: none;
  }
  input:focus,
  textarea:focus,
  select:focus {
    border: ${({ theme }) => theme.borders.strong};
    box-shadow: 0 0 0 3px rgba(226, 164, 43, 0.25); /* E1A42B glow */
  }

  /* Media & Text */
  .wp-block-media-text {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: ${({ theme }) => theme.spacing.md}px;
    align-items: center;
    padding-top: ${({ theme }) => theme.content.padY}px;
    padding-bottom: ${({ theme }) => theme.content.padY}px;
  }
  .wp-block-media-text .wp-block-media-text__content {
    padding: 0 12px;
  }
  @media (max-width: 781px) {
    .wp-block-media-text {
      grid-template-columns: 1fr;
    }
  }

  /* Columns */
  .wp-block-columns {
    display: flex;
    flex-wrap: nowrap;
    gap: ${({ theme }) => theme.spacing.md}px;
    align-items: stretch;
    padding-top: ${({ theme }) => theme.content.padY}px;
    padding-bottom: ${({ theme }) => theme.content.padY}px;

    /* Vertical alignment helpers from Gutenberg */
    &.are-vertically-aligned-top {
      align-items: flex-start;
    }
    &.are-vertically-aligned-center {
      align-items: center;
    }
    &.are-vertically-aligned-bottom {
      align-items: flex-end;
    }
  }

  .wp-block-column {
    flex: 1 1 0;
    min-width: 0; /* prevent overflow with long words/media */
  }

  /* Background within a single column */
  .wp-block-column.has-background {
    padding: ${({ theme }) => theme.spacing.md}px;
    border-radius: ${({ theme }) => theme.borderRadius.sm}px;
  }

  /* Stack on mobile, unless explicitly disabled by the block */
  @media (max-width: 781px) {
    .wp-block-columns:not(.is-not-stacked-on-mobile) {
      display: block;
    }
    .wp-block-columns:not(.is-not-stacked-on-mobile) > .wp-block-column {
      width: 100% !important;
      margin-bottom: ${({ theme }) => theme.spacing.md}px;
    }
    .wp-block-columns:not(.is-not-stacked-on-mobile)
      > .wp-block-column:last-child {
      margin-bottom: 0;
    }
  }

  /* Cover */
  .wp-block-cover {
    border-radius: ${({ theme }) => theme.borderRadius.lg}px;
    overflow: hidden;
    padding-top: ${({ theme }) => theme.content.padY}px;
    padding-bottom: ${({ theme }) => theme.content.padY}px;
  }
  .wp-block-cover .wp-block-cover__image-background,
  .wp-block-cover video {
    filter: saturate(1.05);
  }
  .wp-block-cover__inner-container {
    padding: 24px;
  }

  /* Pagination / Page Links */
  .page-links,
  .wp-block-query-pagination {
    display: flex;
    gap: ${({ theme }) => theme.spacing.sm}px;
    flex-wrap: wrap;
    align-items: center;
    margin: 24px 0;
  }
  .page-links a,
  .wp-block-query-pagination a,
  .wp-block-query-pagination .page-numbers {
    padding: 8px 12px;
    border: ${({ theme }) => theme.borders.subtle};
    border-radius: ${({ theme }) => theme.borderRadius.sm}px;
    text-decoration: none;
    color: ${({ theme }) => theme.colors.primaryText};
    background: ${({ theme }) => theme.colors.lightText}14;
  }
  .page-links .current,
  .wp-block-query-pagination .current {
    background: ${({ theme }) => theme.colors.buttonPrimaryBackground};
    color: ${({ theme }) => theme.colors.buttonPrimaryColor};
    border-color: transparent;
  }

  /* Footnotes (common plugins) */
  .footnotes,
  .simple-footnotes {
    font-size: ${({ theme }) => theme.fontSizes.small}px;
    line-height: ${({ theme }) => theme.lineHeights.small}px;
    color: ${({ theme }) => theme.colors.secondaryText};
    border-top: 1px dashed ${({ theme }) => theme.prose.hr};
    margin-top: 32px;
    padding-top: 16px;
  }
  .footnotes ol {
    padding-left: ${({ theme }) => theme.spacing.lg}px;
  }

  /* Screen-reader helper (WP uses this) */
  .screen-reader-text {
    position: absolute !important;
    height: 1px;
    width: 1px;
    overflow: hidden;
    clip: rect(1px, 1px, 1px, 1px);
    white-space: nowrap;
  }

  /* Long words/URLs wrapping */
  p,
  li,
  blockquote,
  figcaption {
    overflow-wrap: anywhere;
  }

  /* Clear floats from classic alignments */
  &:after {
    content: '';
    display: table;
    clear: both;
  }

  .wp-block-toutefois-banner {
    &[data-template='no-margin'] {
      margin: 0;
    }
    &[data-template='with-banner'] {
      margin-top: 0;
      margin-bottom: 32px;
    }
    &[data-template='with-title'] {
      margin-block: 32px;
    }
  }

  /* Banner block: structure and alignment mapping */
  .wp-block-toutefois-banner {
    position: relative;
    width: 100%;
    overflow: hidden;

    .toutefois-banner__bg {
      position: absolute;
      inset: 0;
      background-size: cover;
      background-position: center;
    }

    .toutefois-banner__content {
      position: absolute;
      inset: 0;
      padding: ${({ theme }) => theme.spacing.md}px;
    }

    .toutefois-banner__body {
      ${ContainerContentStyling}
      display: flex;
      flex-direction: column;
      height: 100%;
      color: ${({ theme }) => theme.colors.lightText};
    }

    /* Horizontal alignment */
    &[data-ha='flex-start'] .toutefois-banner__body {
      align-items: flex-start;
      text-align: left;
    }
    &[data-ha='center'] .toutefois-banner__body {
      align-items: center;
      text-align: center;
    }
    &[data-ha='flex-end'] .toutefois-banner__body {
      align-items: flex-end;
      text-align: right;
    }

    /* Vertical alignment */
    &[data-va='flex-start'] .toutefois-banner__body {
      justify-content: flex-start;
    }
    &[data-va='center'] .toutefois-banner__body {
      justify-content: center;
    }
    &[data-va='flex-end'] .toutefois-banner__body {
      justify-content: flex-end;
    }

    .toutefois-banner__title {
      margin: 0;
    }
    .toutefois-banner__description {
      margin-top: ${({ theme }) => theme.spacing.sm}px;
    }

    /* Optional blur hint (actual blur also inline) */
    &[data-blurred='1'] .toutefois-banner__bg {
      filter: blur(4px);
    }
  }

  /* Match React blocks styling for WP fallbacks/mounts */
  /* Content Carousel fallback container */
  .content-carousel-block {
    display: flex;
    flex-direction: column;
    align-items: center;
    ${ContainerContentStyling}
    overflow: hidden;
    padding-inline: ${({ theme }) => theme.spacing.xl}px;
    padding-block-end: ${({ theme }) => theme.spacing.xs}px;
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    .content-carousel-block {
      padding-inline: ${({ theme }) => theme.spacing.xxl}px;
    }
  }
  .content-carousel-block > h2 {
    margin-bottom: ${({ theme }) => theme.spacing.xs}px;
    text-shadow: ${({ theme }) => theme.colors.primaryText}70 2px 3px 3px;
  }
  .content-carousel-block > ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: grid;
    gap: ${({ theme }) => theme.spacing.lg}px;
    width: 100%;
  }
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    .content-carousel-block > ul {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    .content-carousel-block > ul {
      grid-template-columns: repeat(3, 1fr);
    }
  }
  .content-carousel-block > ul > li {
    background: ${({ theme }) => theme.colors.sectionColor3}10;
    border: 1px solid ${({ theme }) => theme.colors.borderColor1};
    border-radius: ${({ theme }) => theme.borderRadius.sm}px;
    box-shadow: ${({ theme }) => theme.boxShadow.sm};
    padding: ${({ theme }) => theme.spacing.md}px;
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.sm}px;
  }
  .content-carousel-block img {
    width: 100%;
    height: auto;
    border-radius: ${({ theme }) => theme.borderRadius.sm}px;
    box-shadow: ${({ theme }) => theme.boxShadow.xs};
    object-fit: cover;
  }
  .content-carousel-block a {
    align-self: center;
    margin-top: ${({ theme }) => theme.spacing.md}px;
  }
  /* Collaborators block mount – provide outer spacing similar to React */
  .toutefois-collaborators-block-react-root {
    display: block;
    width: 100%;
    margin-block: ${({ theme }) => theme.spacing.lg}px;
  }

  /* Featured Carousel (WP) */
  .wp-block-toutefois-featured-carousel {
    ${ContainerContentStyling}
    .toutefois-featured-carousel__heading {
      margin-bottom: ${({ theme }) => theme.spacing.sm}px;
      text-shadow: ${({ theme }) => theme.colors.primaryText}70 2px 3px 3px;
      text-align: center;
    }
    .toutefois-featured-carousel__list {
      display: grid;
      grid-template-columns: 1fr;
      gap: ${({ theme }) => theme.spacing.lg}px;
    }
    @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
      .toutefois-featured-carousel__list {
        grid-template-columns: repeat(2, 1fr);
      }
    }
    @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
      .toutefois-featured-carousel__list {
        grid-template-columns: repeat(3, 1fr);
      }
    }
    .toutefois-featured-carousel__item {
      background: ${({ theme }) => theme.colors.sectionColor3}10;
      border: 1px solid ${({ theme }) => theme.colors.borderColor1};
      border-radius: ${({ theme }) => theme.borderRadius.sm}px;
      box-shadow: ${({ theme }) => theme.boxShadow.sm};
      padding: ${({ theme }) => theme.spacing.md}px;
    }
    .toutefois-featured-carousel__image {
      width: 100%;
      height: auto;
      object-fit: cover;
      border-radius: ${({ theme }) => theme.borderRadius.xs}px;
      box-shadow: ${({ theme }) => theme.boxShadow.xs};
    }
  }

  /* Projects Category Row (WP) */
  .wp-block-toutefois-projects-row {
    ${ContainerContentStyling}
    .toutefois-projects-row__title {
      margin-bottom: ${({ theme }) => theme.spacing.sm}px;
      text-align: center;
    }
    .projects-grid {
      list-style: none;
      padding: 0;
      margin: 0;
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
      gap: ${({ theme }) => theme.spacing.md}px;
    }
    .project-item {
      background: ${({ theme }) => theme.colors.sectionColor3}10;
      border: 1px solid ${({ theme }) => theme.colors.borderColor1};
      border-radius: ${({ theme }) => theme.borderRadius.sm}px;
      box-shadow: ${({ theme }) => theme.boxShadow.xs};
      padding: ${({ theme }) => theme.spacing.md}px;
    }
    .pagination {
      display: flex;
      gap: ${({ theme }) => theme.spacing.sm}px;
      justify-content: center;
      margin-top: ${({ theme }) => theme.spacing.md}px;
    }
  }
`;

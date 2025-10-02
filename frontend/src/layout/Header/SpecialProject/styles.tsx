'use client';
import Link from 'next/link';
import styled, { css } from 'styled-components';

export const hexToRgba = (hex: string, multiplier: number = 1): string => {
  // Remove leading "#" if present
  hex = hex.replace(/^#/, '');

  // Expand shorthand (e.g. "03F") to full form ("0033FF")
  if (hex.length === 3) {
    hex = hex
      .split('')
      .map((c) => c + c)
      .join('');
  }

  const r = parseInt(hex.substring(0, 2), 16) * multiplier;
  const g = parseInt(hex.substring(2, 4), 16) * multiplier;
  const b = parseInt(hex.substring(4, 6), 16) * multiplier;

  return `rgb(${r}, ${g}, ${b})`;
};

const backgroundImageStyling = (
  mainColor: string,
  previewImage: string | null,
) => css`
  background: ${mainColor};
  background-image: url(${previewImage});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const noBackgroundImageStyling = (mainColor: string) => css`
  background: linear-gradient(
    ${hexToRgba(mainColor, 1)},
    ${hexToRgba(mainColor, 1)}
  );
`;

export const SpecialProjectContainer = styled.div<{
  $mainColor: string;
  $textColor: string;
  $previewImage: string | null;
}>`
  ${({ $previewImage, $mainColor }) =>
    $previewImage
      ? backgroundImageStyling($mainColor, $previewImage)
      : noBackgroundImageStyling($mainColor)}
  margin-block-start: -${({ theme }) => theme.spacing.md}px;
  margin-inline-end: -${({ theme }) => theme.spacing.xxl}px;
  padding-inline: ${({ theme }) => theme.spacing.xxl}px;
  padding-block: ${({ theme }) => theme.spacing.md}px;
  white-space: nowrap;
  display: flex;
  align-items: center;
  justify-content: center;
  height: ${({ theme }) =>
    Number(theme.appearance.headerHeight.replace('px', ''))}px;
  color: ${({ $textColor }) => $textColor};
  font-size: ${({ theme }) => theme.fontSizes.body}px;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  cursor: pointer;
  position: relative;
  &:hover {
    background-color: ${({ $mainColor }) => hexToRgba($mainColor, 1.1)};
    &:after {
      background-color: ${({ $mainColor }) => hexToRgba($mainColor, 1.1)};
    }
  }
  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    width: 100px;
    height: 100%;
    background: ${({ $mainColor }) => hexToRgba($mainColor, 1)};
    transform: skewX(-50deg);
    transform-origin: top right;
    z-index: -1;
  }
`;

export const SpecialProjectLink = styled(Link)`
  @media (max-width: ${({ theme }) => theme.breakpoints.xl}) {
    display: none;
  }
`;

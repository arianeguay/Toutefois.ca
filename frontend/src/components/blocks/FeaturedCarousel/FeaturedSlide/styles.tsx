import styled, { css } from 'styled-components';

export const SlideContent = styled.div<{ $backgroundUrl: string | undefined }>`
  width: 100%;
  height: 100%;
  position: relative;

  ${({ $backgroundUrl }) => {
    if ($backgroundUrl) {
      return css`
        background-image: url(${$backgroundUrl});
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        background-color: #00000070;
        background-blend-mode: overlay;
      `;
    }
    return css``;
  }}
`;

export const SlideTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.h3};
  margin-bottom: 0.5rem;
`;
export const SlideBody = styled.div`
  display: flex;
  flex-direction: column;

  max-width: 450px;
  width: 100%;
  gap: ${({ theme }) => theme.spacing.sm}px;
  color: ${({ theme }) => theme.colors.lightText};
`;

export const SlideCover = styled.div`
  width: 100%;
  max-width: 60%;
  max-height: 100%;
  height: 100%;
  display: flex;
  align-items: center;
`;

export const ProjectImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-position: center;
  object-fit: cover;
  height: 100%;
  border-radius: ${({ theme }) => theme.borderRadius.xl}px;
  box-shadow: ${({ theme }) => theme.boxShadow.lg};
  overflow: hidden;
`;

export const SlideBodyWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  gap: ${({ theme }) => theme.spacing.xxl}px;
  align-items: center;
  max-width: 1200px;
  width: 100%;
  margin-inline: auto;
  padding-block: ${({ theme }) => theme.spacing.xxl}px;
`;

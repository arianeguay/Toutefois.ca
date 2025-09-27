import styled, { css } from 'styled-components';

export const ContentBodyContent = styled.div`
  height: 100%;
  text-align: center;
  position: relative;
  z-index: 1;
  height: fit-content;
`;

export const ContentBodyActions = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: flex-end;
  height: fit-content;
  padding-inline: ${({ theme }) => theme.spacing.lg}px;
  padding-block-end: ${({ theme }) => theme.spacing.md}px;
`;

export const ContentCover = styled.div`
  position: relative;
  background-color: ${({ theme }) => theme.colors.headerBackground};
  aspect-ratio: 310/221;
  flex-shrink: 0;
  width: 100%;
  overflow: hidden;
`;

export const ContentImage = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
`;

export const ContentCardContainerStyling = css`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.colors.primaryText};
  overflow: hidden;
  height: 100%;
  box-shadow: ${({ theme }) => theme.boxShadow.md};
  transition: all 0.2s ease-in-out;
  max-height: 390px;

  &:hover {
    cursor: pointer;
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.boxShadow.lg};
  }
`;

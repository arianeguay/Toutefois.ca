import styled from 'styled-components';

export const SlideContent = styled.div`
  width: 100%;
  height: 75vh;
  max-height: 600px;
  position: relative;
`;

export const SlideTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.h3};
  margin-bottom: 0.5rem;
`;
export const SlideBody = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 1;
  max-width: 450px;
  gap: ${({ theme }) => theme.spacing.sm}px;
  color: ${({ theme }) => theme.colors.lightText};
`;

export const ProjectImage = styled.img`
  max-width: 100%;
  height: 100%;
  width: 100%;
  object-fit: cover;
`;

export const SlideBodyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-end;
  padding-inline: ${({ theme }) => theme.spacing.xxl}px;
  padding-block: ${({ theme }) => theme.spacing.xxl}px;

  background: linear-gradient(
    to top,
    rgba(255, 255, 255, 0.3) 25%,
    transparent 50%,
    transparent 100%
  );
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

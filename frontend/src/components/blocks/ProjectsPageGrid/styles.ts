import Link from 'next/link';
import styled from 'styled-components';

export const GridContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md}px;
  margin: ${({ theme }) => theme.spacing.md}px auto;
  max-width: 1200px;

  .swiper {
    margin-left: -30px;
    margin-right: -30px;
    padding-left: 30px;
    padding-right: 30px;
    width: calc(100% + 60px);
    padding-block: 4px;
    &:before,
    &:after {
      content: '';
      position: absolute;

      width: 30px;
      height: 100%;
      z-index: 9;
    }
    &:after {
      top: 0;
      left: 0;
      background: linear-gradient(
        to left,
        transparent,
        ${({ theme }) => theme.colors.mainBackground}
      );
    }
    &:before {
      top: 0;
      right: 0;
      background: linear-gradient(
        to left,
        ${({ theme }) => theme.colors.mainBackground},
        transparent
      );
    }
  }
`;

export const CategorySection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm}px;
`;

export const ProjectImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  margin-bottom: 1rem;
`;

export const ProjectTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.h4};
  margin-bottom: 0.5rem;
`;

export const ProjectExcerpt = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.body};
`;

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
  gap: 1rem;
`;

export const PaginationButton = styled.button`
  padding: 0.5rem 1rem;
  border: 1px solid ${({ theme }) => theme.colors.primaryText};
  background-color: transparent;
  cursor: pointer;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const ProjectCardBody = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  background-color: #ffffff40;
  backdrop-filter: blur(10px);
  overflow: hidden;
  padding: ${({ theme }) => theme.spacing.md}px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  transition: opacity 0.3s ease-in-out;
  text-align: left;
  p {
    margin: 0;
  }
  color: ${({ theme }) => theme.colors.lightText};
`;

export const ProjectCardContainer = styled.div`
  width: 300px;
  aspect-ratio: 1;
  border-radius: ${({ theme }) => theme.borderRadius.md}px;
  overflow: hidden;
  color: ${({ theme }) => theme.colors.primaryText};
  position: relative;

  ${ProjectCardBody} {
    opacity: 0;
  }
  &:hover {
    cursor: pointer;
    transform: translateY(-2px);
    ${ProjectCardBody} {
      opacity: 1;
    }
  }
`;

export const ProjectCardLink = styled(Link)`
  &:nth-child(even) {
    ${ProjectCardContainer} {
      flex-direction: row-reverse;
    }
  }
`;
export const ProjectCardCover = styled.div`
  flex-shrink: 0;
  border-radius: ${({ theme }) => theme.borderRadius.md}px;
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.primaryText};
  box-shadow: ${({ theme }) => theme.boxShadow.md};
  width: 100%;
  height: 100%;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const ProjectCardsRow = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md}px;
  flex-direction: row;
`;

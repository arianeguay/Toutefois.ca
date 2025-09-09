import Link from 'next/link';
import styled from 'styled-components';

export const GridContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md}px;
  margin: ${({ theme }) => theme.spacing.md}px 0;
`;

export const GridItem = styled.div`
  display: flex;
  flex-direction: column;
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
  color: ${({ theme }) => theme.colors.primaryText};
  cursor: pointer;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const ProjectCardContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: ${({ theme }) => theme.spacing.xl}px;
  max-width: 1200px;
  align-items: center;
  margin: 0 auto;
  width: 100%;
  color: ${({ theme }) => theme.colors.primaryText};

  &:hover {
    cursor: pointer;
    transform: translateY(-2px);
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
  width: 300px;
  aspect-ratio: 16/9;
  flex-shrink: 0;
  border-radius: ${({ theme }) => theme.borderRadius.md}px;
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.primaryText};
  box-shadow: ${({ theme }) => theme.boxShadow.md};
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const ProjectCardBody = styled.div`
  flex: 1;
`;

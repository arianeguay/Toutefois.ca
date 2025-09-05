import styled from 'styled-components';

export const ListContainer = styled.ul`
  list-style: none;
  padding: 0;
  margin: 2rem 0;
`;

export const ListItem = styled.li`
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.secondaryText};
  padding-bottom: 2rem;

  &:last-child {
    border-bottom: none;
  }
`;

export const ArticleImage = styled.img`
  max-width: 100%;
  height: auto;
  max-height: 300px;
  object-fit: cover;
  margin-bottom: 1rem;
`;

export const ArticleTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.h3};
  margin-bottom: 0.5rem;
`;

export const ArticleExcerpt = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.body};
`;

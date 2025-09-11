import styled from 'styled-components';

export const ContentCardContent = styled.div`
  padding-inline: ${({ theme }) => theme.spacing.lg}px;
  padding-block: ${({ theme }) => theme.spacing.md}px;
  background-color: white;

  margin-top: -${({ theme }) => theme.spacing.md * 2}px;
  border-radius: ${({ theme }) => theme.borderRadius.md}px;
  border: 1px solid ${({ theme }) => theme.colors.borderColor1};

  flex: 1;
  p {
    margin: 0;
  }
`;

export const ContentImage = styled.img`
  max-width: 100%;
  height: 300px;

  background-color: ${({ theme }) => theme.colors.headerBackground};
  border-radius: ${({ theme }) => theme.borderRadius.md}px;
  border: 1px solid ${({ theme }) => theme.colors.borderColor1};
  object-fit: cover;
  margin-bottom: 1rem;
`;

export const ContentCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.colors.primaryText};
  height: 100%;
  border-radius: ${({ theme }) => theme.borderRadius.md}px;
  box-shadow: ${({ theme }) => theme.boxShadow.md};
  transition: all 0.2s ease-in-out;
  &:hover {
    cursor: pointer;
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.boxShadow.lg};
  }
`;

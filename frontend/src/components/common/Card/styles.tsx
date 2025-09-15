import styled from 'styled-components';

export const ContentCardContent = styled.article`
  padding-inline: ${({ theme }) => theme.spacing.lg}px;
  padding-block-end: ${({ theme }) => theme.spacing.md}px;
  background-color: white;
  position: relative;
  text-align: center;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const ContentBodyContent = styled.div`
  height: 100%;
  & > h3:not(:last-child),
  & > p:not(:last-child) {
    margin-block-end: 0 !important;
  }
  & > p:not(:first-child),
  & > h3:not(:first-child):not(h2 + & h3) {
    margin-block-start: ${({ theme }) => theme.spacing.xs}px !important;
  }

  h3 {
    color: ${({ theme }) => theme.prose.link};
  }
`;
export const ContentBodyActions = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: flex-end;
`;

export const ContentCover = styled.div`
  position: relative;
  background-color: ${({ theme }) => theme.colors.headerBackground};
  aspect-ratio: 16/9;
  width: 100%;
  overflow: hidden;
`;

export const ContentImage = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
`;

export const ContentCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.colors.primaryText};
  border: 1px solid ${({ theme }) => theme.colors.borderColor1};

  height: 100%;
  box-shadow: ${({ theme }) => theme.boxShadow.md};
  transition: all 0.2s ease-in-out;
  &:hover {
    cursor: pointer;
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.boxShadow.lg};
  }
`;

export const TicketBorderContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  position: absolute;
  top: -20px;
  left: 0;
  overflow: hidden;
`;

export const TicketShape = styled.span`
  flex: 0 0 26px; /* keep consistent width */
  height: 20px;
  background-image: radial-gradient(
    circle at 13px 0,
    transparent 0.4em,
    #fff 0.5em
  );
  background-repeat: no-repeat;
`;

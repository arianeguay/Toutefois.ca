import styled from 'styled-components';

export const ContentCardContent = styled.article`
  background-color: white;
  position: relative;
  text-align: center;
  display: flex;
  flex-direction: column;
  position: relative;
  flex: 1;
  justify-content: space-between;
  &:before {
    content: '';
    position: absolute;
    top: -79px;
    left: 1px;
    width: 100%;
    height: 80px;
    background-color: inherit; /* match card color */
    clip-path: polygon(100% 0, 100% 100%, 15% 99%);
    pointer-events: none;
  }
  &:after {
    content: '';
    position: absolute;
    top: -79px;
    left: -1px;
    width: 100%;
    height: 80px;
    background-color: inherit; /* match card color */
    clip-path: polygon(59% 100%, 0 34%, 0 100%);
    pointer-events: none;
  }
`;

export const ContentBodyContent = styled.div`
  height: 100%;
  margin-block-start: -30px;
  text-align: center;
  position: relative;
  z-index: 1;
  height: fit-content;
`;
export const ContentBodyContentHeading = styled.div`
  text-align: right;

  h3 {
    color: ${({ theme }) => theme.prose.link};
  }
  & > h3 {
    margin-block: 0 !important;
  }
  padding-inline-end: ${({ theme }) => theme.spacing.md}px;
  padding-inline-start: ${({ theme }) => theme.spacing.md}px;
  padding-block-end: ${({ theme }) => theme.spacing.md}px;
  padding-block-start: ${({ theme }) => theme.spacing.sm}px;
`;
export const ContentBodyContentDescription = styled.div`
  padding-inline: ${({ theme }) => theme.spacing.lg}px;
  padding-block-start: ${({ theme }) => theme.spacing.sm}px;
  padding-block-end: ${({ theme }) => theme.spacing.md}px;
  border-top: 1px solid ${({ theme }) => theme.colors.borderColor1};
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
  aspect-ratio: 2/1;
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
  overflow: hidden;
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

import styled, { css } from 'styled-components';

export const HamburgerContainer = styled.div<{ $isOpen?: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 6px; /* keep consistent spacing */
  cursor: pointer;
  width: 32px;
  height: 32px;
  padding: 4px;
  position: relative;
  z-index: 1000; /* useful if it overlays menus */

  /* smooth animations */
  & > span {
    transition:
      transform 0.3s ease,
      opacity 0.3s ease;
  }

  ${({ $isOpen }) =>
    $isOpen &&
    css`
      & > span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
      }
      & > span:nth-child(2) {
        opacity: 0;
      }
      & > span:nth-child(3) {
        transform: rotate(-45deg) translate(6px, -6px);
      }
    `}
`;

export const HamburgerLine = styled.span`
  width: 24px;
  height: 2px;
  border-radius: 2px;
  background-color: ${({ theme }) => theme.colors.lightText};
  transition:
    transform 0.3s ease,
    opacity 0.3s ease;
`;

export const DrawerContainer = styled.div<{ $isOpen?: boolean }>`
  position: fixed;
  top: ${({ theme }) => theme.appearance.headerHeight};
  right: 0;
  width: 100%;
  height: calc(100vh - ${({ theme }) => theme.appearance.headerHeight} + 3px);
  background-color: ${({ theme }) => theme.colors.mainBackground};
  box-shadow: -2px 0 8px rgba(0, 0, 0, 0.15);
  z-index: 80;
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: ${({ theme }) => theme.colors.mainBackground};
  }
  transform: translateX(100%);
  opacity: 0;
  transition:
    transform 0.3s ease,
    opacity 0.3s ease;

  padding-block: ${({ theme }) => theme.spacing.xxl}px;
  padding-inline: ${({ theme }) => theme.spacing.xxl}px;
  ${({ $isOpen }) =>
    $isOpen &&
    css`
      transform: translateX(0);
      opacity: 1;
    `}
`;

export const DrawerMenuContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md}px;
  position: relative;
  z-index: 90;
`;

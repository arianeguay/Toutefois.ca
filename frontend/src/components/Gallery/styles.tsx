import styled from 'styled-components';

export const Grid = styled.div<{ $gap?: number; $minColWidth?: number }>`
  display: grid;
  grid-template-columns: repeat(
    auto-fill,
    minmax(${(p) => (p.$minColWidth ?? 220)}px, 1fr)
  );
  gap: ${(p) => (p.$gap ?? 12)}px;
`;

export const Item = styled.button<{
  $aspectRatio?: string;
}>`
  position: relative;
  width: 100%;
  padding: 0;
  margin: 0;
  border: 0;
  background: transparent;
  cursor: pointer;
  aspect-ratio: ${(p) => p.$aspectRatio || '1 / 1'};
  border-radius: 8px;
  overflow: hidden;

  &:focus-visible {
    outline: 2px solid #333;
    outline-offset: 2px;
  }
`;

export const LightboxBackdrop = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

export const LightboxBody = styled.div`
  position: relative;
  width: min(92vw, 1200px);
  height: min(92vh, 80rem);
  background: #000;
  border-radius: 10px;
  overflow: hidden;
`;

export const CloseBtn = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  z-index: 1001;
  background: rgba(0,0,0,0.6);
  color: #fff;
  border: 0;
  border-radius: 999px;
  padding: 8px 10px;
  cursor: pointer;
`;

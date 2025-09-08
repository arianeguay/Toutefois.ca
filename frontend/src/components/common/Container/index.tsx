'use client';

import { ContainerContentStyled, ContainerStyled } from './styles';

interface ContainerProps {
  background?: string;
  noPadding?: boolean;
}
const Container: React.FC<React.PropsWithChildren<ContainerProps>> = ({
  children,
  background,
  noPadding,
}) => {
  return (
    <ContainerStyled $background={background} $noPadding={noPadding}>
      <ContainerContentStyled>{children}</ContainerContentStyled>
    </ContainerStyled>
  );
};

export default Container;

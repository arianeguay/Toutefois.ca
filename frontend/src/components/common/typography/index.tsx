import {
    getElement,
} from './styles';
import type { TypographyProps } from './types';

const Typography: React.FC<React.PropsWithChildren<TypographyProps>> = ({
    variant = 'body',
    element = 'p',
    children,
}) => {
    const Element = getElement(element);
    return <Element $variant={variant}>{children}</Element>;
};

export default Typography;

import {
    getElement,
    Heading1,
    Heading2,
    Heading3,
    Heading4,
    Heading5,
    Heading6,
    Paragraph,
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

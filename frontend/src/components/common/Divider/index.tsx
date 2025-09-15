import { DividerStyled } from './styles';

interface DividerProps {
  direction?: 'horizontal' | 'vertical';
}
const Divider: React.FC<DividerProps> = ({ direction = 'horizontal' }) => {
  return <DividerStyled className="divider" $direction={direction} />;
};

export default Divider;

import Typography from '@/components/common/Typography';
import { IconProps } from '@/icons/types';
import { JoinInfoRowLink } from './styles';

type Icon = React.FC<IconProps>;
interface JoinInfoRowProps {
  Icon: Icon;
  text: string;
  href: string;
}
const JoinInfoRow: React.FC<JoinInfoRowProps> = ({ Icon, text, href }) => {
  return (
    <JoinInfoRowLink href={href} className="join-info-row">
      <Icon size={20} />
      <Typography variant="small" element="p">
        {text}
      </Typography>
    </JoinInfoRowLink>
  );
};
export default JoinInfoRow;

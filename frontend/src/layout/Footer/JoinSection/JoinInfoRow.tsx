import Typography from '@/components/common/Typography';
import { JoinInfoRowLink } from './styles';

type Icon = React.FC<{ width: number; height: number }>;
interface JoinInfoRowProps {
  Icon: Icon;
  text: string;
  href: string;
}
const JoinInfoRow: React.FC<JoinInfoRowProps> = ({ Icon, text, href }) => {
  return (
    <JoinInfoRowLink href={href} className="join-info-row">
      <Icon width={20} height={20} />
      <Typography variant="small" element="p">
        {text}
      </Typography>
    </JoinInfoRowLink>
  );
};
export default JoinInfoRow;

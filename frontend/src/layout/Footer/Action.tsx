import Button from '@/components/common/Button';
import { FooterActionContainer } from './styles';

interface FooterActionProps {
  donation_link?: string;
}

const FooterAction: React.FC<FooterActionProps> = ({ donation_link }) => {
  return (
    <FooterActionContainer>
      <Button href={donation_link}>Faire un don</Button>
    </FooterActionContainer>
  );
};

export default FooterAction;

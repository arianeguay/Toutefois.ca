import api from '@/api';
import Button from '@/components/common/Button';
import JoinSection from './JoinSection';
import { FooterContainer, FooterContent } from './styles';
import WebsiteInfo from './WebInfo';

interface FooterProps {
  donation_link?: string;
}
const Footer: React.FC<FooterProps> = async ({ donation_link }) => {
  const footer = await api.fetchFooter();

  return (
    <FooterContainer>
      <FooterContent>
        <JoinSection footer={footer} />
        <WebsiteInfo footer={footer} />
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}
        >
          <Button href={donation_link}>Faire un don</Button>
        </div>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;

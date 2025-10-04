import api from '@/api';
import FooterAction from './Action';
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
        <FooterAction donation_link={donation_link} />
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;

import api from '@/api';
import type { WordpressPage } from '@/types';
import JoinSection from './JoinSection';
import { FooterContainer, FooterContent } from './styles';
import WebsiteInfo from './WebInfo';

interface FooterProps {
  currentPage?: WordpressPage;
}
const Footer: React.FC<FooterProps> = async ({ currentPage }) => {
  const footer = await api.fetchFooter();

  const mainColor = currentPage?.meta?.main_color;

  return (
    <FooterContainer $mainColor={mainColor}>
      <FooterContent>
        <JoinSection footer={footer} />
        <WebsiteInfo footer={footer} />
        <div></div>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;

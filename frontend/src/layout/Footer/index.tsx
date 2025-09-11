import api from '@/api';
import Typography from '@/components/common/typography';
import type { WordpressPage } from '@/types';
import Socials from './socials';
import { CenterSection, FooterContainer, FooterContent } from './styles';

interface FooterProps {
  currentPage?: WordpressPage;
}
const Footer: React.FC<FooterProps> = async ({ currentPage }) => {
  const footer = await api.fetchFooter();

  const mainColor = currentPage?.meta?.main_color;

  return (
    <FooterContainer $mainColor={mainColor}>
      <FooterContent>
        {!!footer ? (
          <div>
            <Typography
              variant="body"
              element="p"
              style={{ fontWeight: 'medium', marginBottom: 8 }}
            >
              Nous joindre
            </Typography>
            <a href={`tel:${footer?.phone}`}>
              <Typography variant="small" element="p">
                {footer?.phone}
              </Typography>
            </a>
            <a href={`mailto:${footer?.email}`}>
              <Typography variant="small" element="p">
                {footer?.email}
              </Typography>
            </a>
            <Socials
              instagram={footer?.instagram}
              facebook={footer?.facebook}
            />
          </div>
        ) : (
          <div></div>
        )}
        <CenterSection>
          <Typography
            variant="body"
            element="p"
            style={{ textAlign: 'center' }}
          >
            {footer?.slogan}
          </Typography>
          <Typography
            variant="body"
            element="p"
            style={{ textAlign: 'center' }}
          >
            Théâtre de Toutefois © 2025
          </Typography>
        </CenterSection>
        <div></div>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;

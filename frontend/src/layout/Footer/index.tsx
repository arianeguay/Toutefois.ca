import api from '@/api';
import Typography from '@/components/common/typography';
import Socials from './socials';
import { FooterContainer, FooterContent } from './styles';

const Footer = async () => {
  const footer = await api.fetchFooter();
  return (
    <FooterContainer>
      <FooterContent>
        {!!footer ? (
          <div>
            <Typography variant="body" element="p">
              Nous joindre
            </Typography>
            <Typography variant="body" element="p">
              {footer?.phone}
            </Typography>
            <Typography variant="body" element="p">
              {footer?.email}
            </Typography>
            <Socials
              instagram={footer?.instagram}
              facebook={footer?.facebook}
            />
          </div>
        ) : (
          <div></div>
        )}
        <Typography variant="body" element="p" style={{ textAlign: 'center' }}>
          Théâtre de Toutefois © 2025
        </Typography>
        <div></div>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;

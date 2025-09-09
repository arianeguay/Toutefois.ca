import Typography from '@/components/common/typography';
import FacebookIcon from './icons/Facebook';
import InstagramIcon from './icons/Instagram';
import { FooterContainer, FooterContent } from './styles';

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <div>
          <Typography variant="body" element="p">
            Nous joindre
          </Typography>
          <Typography variant="body" element="p">
            514-288-2222
          </Typography>
          <Typography variant="body" element="p">
            info@toutefois.ca
          </Typography>
          <a href="https://www.instagram.com/toutefois/">
            <InstagramIcon />
          </a>
          <a href="https://www.facebook.com/toutefois">
            <FacebookIcon />
          </a>
        </div>
        <Typography variant="body" element="p" style={{ textAlign: 'center' }}>
          Théâtre de Toutefois © 2025
        </Typography>
        <div></div>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;

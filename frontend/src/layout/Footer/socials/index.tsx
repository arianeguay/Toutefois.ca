import FacebookIcon from '../../../icons/Facebook';
import InstagramIcon from '../../../icons/Instagram';
import { SocialsContainer } from './styles';

interface SocialsProps {
  instagram?: string;
  facebook?: string;
}

const Socials: React.FC<SocialsProps> = ({ instagram, facebook }) => {
  if (!instagram && !facebook) {
    return null;
  }
  return (
    <SocialsContainer>
      {instagram && (
        <a href={instagram}>
          <InstagramIcon />
        </a>
      )}
      {facebook && (
        <a href={facebook}>
          <FacebookIcon />
        </a>
      )}
    </SocialsContainer>
  );
};

export default Socials;

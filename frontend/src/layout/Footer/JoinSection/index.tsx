import Typography from '@/components/common/Typography';
import { WordpressFooter } from '@/types';
import EmailIcon from '../../../icons/Email';
import PhoneIcon from '../../../icons/Phone';
import Socials from '../socials';
import JoinInfoRow from './JoinInfoRow';
import { JoinSectionContainer, JoinSectionContent } from './styles';

interface JoinSectionProps {
  footer: WordpressFooter | null;
}
const JoinSection: React.FC<JoinSectionProps> = ({ footer }) => {
  if (!footer) return <div />;
  return (
    <JoinSectionContainer>
      <Typography
        variant="body"
        element="p"
        style={{
          fontWeight: 'semibold',
          marginBottom: 8,
        }}
      >
        Nous joindre
      </Typography>

      <JoinSectionContent>
        <JoinInfoRow
          Icon={PhoneIcon}
          text={footer?.phone}
          href={`tel:${footer?.phone}`}
        />
        <JoinInfoRow
          Icon={EmailIcon}
          text={footer?.email}
          href={`mailto:${footer?.email}`}
        />
      </JoinSectionContent>
      <Socials instagram={footer?.instagram} facebook={footer?.facebook} />
    </JoinSectionContainer>
  );
};

export default JoinSection;

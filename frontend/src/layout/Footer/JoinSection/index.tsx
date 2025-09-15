'use client';
import Typography from '@/components/common/Typography';
import { WordpressFooter } from '@/types';
import { useTheme } from 'styled-components';
import Socials from '../socials';
import EmailIcon from '../socials/Email';
import PhoneIcon from '../socials/Phone';
import JoinInfoRow from './JoinInfoRow';
import { JoinSectionContainer } from './styles';

interface JoinSectionProps {
  footer: WordpressFooter | null;
}
const JoinSection: React.FC<JoinSectionProps> = ({ footer }) => {
  const theme = useTheme();
  if (!footer) return <div />;
  return (
    <JoinSectionContainer>
      <Typography
        variant="body"
        element="p"
        style={{
          fontWeight: 'bold',
          marginBottom: 8,
          fontFamily: theme.fonts.secondary,
        }}
      >
        Nous joindre
      </Typography>

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
      <Socials instagram={footer?.instagram} facebook={footer?.facebook} />
    </JoinSectionContainer>
  );
};

export default JoinSection;

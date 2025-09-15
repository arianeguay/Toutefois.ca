'use client';
import Typography from '@/components/common/Typography';
import { WordpressFooter } from '@/types';
import { useTheme } from 'styled-components';
import { CenterSection } from './styles';

interface WebsiteInfoProps {
  footer: WordpressFooter | null;
}
const WebsiteInfo: React.FC<WebsiteInfoProps> = ({ footer }) => {
  const theme = useTheme();
  return (
    <CenterSection>
      <Typography
        variant="body"
        element="p"
        style={{
          textAlign: 'center',
          fontWeight: 'bold',
          fontFamily: theme.fonts.tertiary,
        }}
      >
        {footer?.slogan}
      </Typography>
      <Typography variant="body" element="p" style={{ textAlign: 'center' }}>
        Théâtre de Toutefois © 2025
      </Typography>
    </CenterSection>
  );
};

export default WebsiteInfo;

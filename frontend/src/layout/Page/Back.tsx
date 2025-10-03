import Typography from '@/components/common/Typography';
import { BackToLink } from './styles';

const BackLink = (props: { href?: string; $template?: string }) => {
  const { href, $template } = props;
  if (!href) return null;
  return (
    <BackToLink href={href} $template={$template} className="back-to">
      <Typography variant="body" element="p">
        Retour
      </Typography>
    </BackToLink>
  );
};

export default BackLink;

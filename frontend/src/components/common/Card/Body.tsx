import parse from 'html-react-parser';
import { useTheme } from 'styled-components';
import Button from '../Button';
import Typography from '../Typography';
import {
  ContentBodyContent,
  ContentBodyContentDescription,
  ContentBodyContentHeading,
  ContentCardContent,
} from './styles';
interface CardBodyProps {
  title: string;
  description?: string;
  date?: string;
}
const CardBody: React.FC<CardBodyProps> = ({ title, description, date }) => {
  const theme = useTheme();
  return (
    <ContentCardContent>
      <ContentBodyContent>
        <ContentBodyContentHeading>
          {date && (
            <Typography variant="overline" color="tertiaryText" element="p">
              {date}
            </Typography>
          )}
          <Typography variant="h5" element="h3" lineClamp={1}>
            {parse(title)}
          </Typography>
        </ContentBodyContentHeading>
        {description && (
          <ContentBodyContentDescription>
            <Typography variant="body" lineClamp={3}>
              {parse(description)}
            </Typography>
          </ContentBodyContentDescription>
        )}
      </ContentBodyContent>
      <Button
        variant="tertiary"
        size="sm"
        style={{ alignSelf: 'center', marginBlockEnd: theme.spacing.md }}
      >
        En savoir plus
      </Button>
    </ContentCardContent>
  );
};
export default CardBody;

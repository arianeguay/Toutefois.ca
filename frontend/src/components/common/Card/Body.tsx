import parse from 'html-react-parser';
import { useTheme } from 'styled-components';
import Button from '../Button';
import Divider from '../Divider';
import Typography from '../Typography';
import {
  ContentBodyActions,
  ContentBodyContent,
  ContentCardContent,
} from './styles';
import TicketBorder from './TicketBorder';
interface CardBodyProps {
  title: string;
  description?: string;
  date?: string;
}
const CardBody: React.FC<CardBodyProps> = ({ title, description, date }) => {
  const theme = useTheme();
  return (
    <ContentCardContent>
      <TicketBorder />
      <ContentBodyContent>
        {date && (
          <Typography variant="overline" color="tertiaryText" element="p">
            {date}
          </Typography>
        )}
        <Typography variant="h4" element="h3" lineClamp={2}>
          {parse(title)}
        </Typography>
        {description && (
          <>
            <Divider direction="horizontal" />
            <Typography variant="body" lineClamp={3}>
              {parse(description)}
            </Typography>
          </>
        )}
      </ContentBodyContent>
      <ContentBodyActions>
        <Button
          variant="tertiary"
          size="sm"
          style={{ marginTop: theme.spacing.md, alignSelf: 'flex-end' }}
        >
          En savoir plus
        </Button>
      </ContentBodyActions>
    </ContentCardContent>
  );
};
export default CardBody;

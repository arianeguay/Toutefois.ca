import parse from 'html-react-parser';
import Divider from '../Divider';
import Typography from '../Typography';
import { ContentCardContent } from './styles';
import TicketBorder from './TicketBorder';
interface CardBodyProps {
  title: string;
  description?: string;
  date?: string;
}
const CardBody: React.FC<CardBodyProps> = ({ title, description, date }) => {
  return (
    <ContentCardContent>
      <TicketBorder />
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
    </ContentCardContent>
  );
};
export default CardBody;

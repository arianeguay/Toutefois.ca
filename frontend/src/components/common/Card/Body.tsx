import parse from 'html-react-parser';
import Button from '../Button';
import Divider from '../Divider';
import Typography from '../Typography';
import {
  ContentBodyActions,
  ContentBodyContent,
  ContentCardContent,
} from './styles';
interface CardBodyProps {
  title: string;
  description?: string;
  date?: string;
}
const CardBody: React.FC<CardBodyProps> = ({ title, description, date }) => {
  return (
    <ContentCardContent>
      <ContentBodyContent>
        {date && (
          <Typography variant="overline" color="tertiaryText" element="p">
            {date}
          </Typography>
        )}
        <Typography variant="h5" element="h3" lineClamp={2}>
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
        <Button variant="tertiary" size="sm" style={{ alignSelf: 'flex-end' }}>
          En savoir plus
        </Button>
      </ContentBodyActions>
    </ContentCardContent>
  );
};
export default CardBody;

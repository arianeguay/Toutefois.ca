import Button from '@/components/common/Button';
import Typography from '@/components/common/Typography';
import parse from 'html-react-parser';
import { useTheme } from 'styled-components';
import { ContentBodyContent } from '../../styles';
import { CardBodyProps } from '../types';
import {
  ContentBodyContentDescription,
  ContentBodyContentHeading,
  ProjectContentCardContent,
} from './styles';

const ProjectCardBody: React.FC<CardBodyProps> = ({
  title,
  description,
  date,
  type = 'project',
}) => {
  const theme = useTheme();
  return (
    <ProjectContentCardContent type={type}>
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
    </ProjectContentCardContent>
  );
};

export default ProjectCardBody;

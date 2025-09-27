import Typography from '@/components/common/Typography';
import parse from 'html-react-parser';
import { ContentBodyContent } from '../../styles';
import { CardBodyProps } from '../types';
import { PostContentCardContent } from './styles';

const PostCardBody: React.FC<CardBodyProps> = ({
  description,
  date,
  type = 'project',
}) => {
  return (
    <PostContentCardContent type={type}>
      <ContentBodyContent>
        {date && (
          <Typography variant="small" color="tertiaryText" element="p">
            {date}
          </Typography>
        )}
        {description && (
          <Typography variant="body" lineClamp={3}>
            {parse(description)}
          </Typography>
        )}
      </ContentBodyContent>
    </PostContentCardContent>
  );
};

export default PostCardBody;

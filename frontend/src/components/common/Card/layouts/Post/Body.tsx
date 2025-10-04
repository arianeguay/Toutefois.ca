'use client';
import Typography from '@/components/common/Typography';
import FacebookIcon from '@/icons/Facebook';
import { formatDateFR } from '@/utils/formatDate';
import parse from 'html-react-parser';
import { useTheme } from 'styled-components';
import { ContentBodyContent } from '../../styles';
import { CardBodyProps } from '../types';
import { PostContentCardContent } from './styles';

const PostCardBody: React.FC<CardBodyProps> = ({
  description,
  date,
  type = 'news',
}) => {
  const theme = useTheme();
  return (
    <PostContentCardContent type={type}>
      <ContentBodyContent>
        {date && (
          <Typography variant="small" color="tertiaryText" element="p">
            {formatDateFR(date)}
          </Typography>
        )}
        {description && (
          <Typography variant="body" lineClamp={3}>
            {parse(description)}
          </Typography>
        )}
        {type === 'facebook' && (
          <FacebookIcon
            size={20}
            color={theme.colors.primaryText}
            style={{ position: 'absolute', top: 0, right: 0 }}
          />
        )}
      </ContentBodyContent>
    </PostContentCardContent>
  );
};

export default PostCardBody;

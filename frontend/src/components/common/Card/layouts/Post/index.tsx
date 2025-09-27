import CardCover from '../../components/Cover';
import LinkWrapper from '../../components/LinkWrapper';
import { CardLayoutProps } from '../types';
import PostCardBody from './Body';
import { PostContentCardContainer } from './styles';

const CardPostLayout: React.FC<CardLayoutProps> = ({
  type,
  title,
  description,
  date,
  cover,
  alt,
  permalink,
  permalinkType = 'internal',
  ...eventHandlers
}) => {
  return (
    <LinkWrapper linkPath={permalink} linkType={permalinkType}>
      <PostContentCardContainer {...eventHandlers}>
        <PostCardBody
          type={type}
          title={title}
          description={description}
          date={date}
        />
        <CardCover src={cover} alt={alt ?? title} />
      </PostContentCardContainer>
    </LinkWrapper>
  );
};

export default CardPostLayout;

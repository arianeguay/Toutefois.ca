import Typography from '@/components/common/Typography';
import { formatDateFR } from '@/utils/formatDate';
import {
  NewsPageHeaderContainer,
  NewsPageHeaderHeading,
  NewsPageHeaderLogo,
} from './styles';

interface NewsHeaderProps {
  facebookInfo: {
    name: string;
    url: string;
    logo: string;
  };
  date: string | undefined;
}

const NewsHeader = ({ facebookInfo, date }: NewsHeaderProps) => {
  return (
    <NewsPageHeaderContainer>
      <NewsPageHeaderLogo
        src={facebookInfo.logo}
        alt=""
        width={40}
        height={40}
      />
      <NewsPageHeaderHeading>
        <a href={facebookInfo.url}>
          <Typography variant="body" element="p">
            {facebookInfo.name}
          </Typography>
        </a>
        <Typography variant="overline" element="p">
          {formatDateFR(date)} {date ? '• ' : ''}
          <a href={facebookInfo.url} target="_blank" rel="noopener noreferrer">
            Publié via Facebook
          </a>
        </Typography>
      </NewsPageHeaderHeading>
    </NewsPageHeaderContainer>
  );
};

export default NewsHeader;

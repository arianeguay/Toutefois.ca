import Typography from '@/components/common/typography';
import Link from 'next/link';
import {
  ArticleCardContainer,
  ArticleCardContent,
  ArticleImage,
} from './styles';

interface CardProps {
  href: string;
  featured_image_url: string;
  title: string;
  excerpt: string;
}

const ArticleListCard: React.FC<CardProps> = ({
  href,
  featured_image_url,
  title,
  excerpt,
}) => {
  return (
    <Link href={href}>
      <ArticleCardContainer>
        <ArticleImage src={featured_image_url} alt={title} />
        <ArticleCardContent>
          <Typography variant="h4" element="h3">
            {title}
          </Typography>
          <Typography variant="body" lineClamp={3}>
            {excerpt}
          </Typography>
        </ArticleCardContent>
      </ArticleCardContainer>
    </Link>
  );
};

export default ArticleListCard;

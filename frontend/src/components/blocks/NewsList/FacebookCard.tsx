import Typography from '@/components/common/typography';
import { FacebookPost } from '@/types';
import Link from 'next/link';
import {
  ArticleCardContainer,
  ArticleCardContent,
  ArticleImage,
} from './styles';

interface FacebookPostCardProps {
  post: FacebookPost;
}

const FacebookPostCard: React.FC<FacebookPostCardProps> = ({ post }) => {
  // Get the first 150 characters of the message as excerpt
  const excerpt = post.message
    ? post.message.substring(0, 150) + (post.message.length > 150 ? '...' : '')
    : '';
  // Extract title from message (first line or first 50 characters)
  const title = post.message
    ? post.message.split('\n')[0].substring(0, 50) +
      (post.message.split('\n')[0].length > 50 ? '...' : '')
    : 'Facebook Post';

  return (
    <Link href={post.permalink_url} target="_blank" rel="noopener noreferrer">
      <ArticleCardContainer>
        {post.picture ? (
          <ArticleImage src={post.picture} alt="Facebook post" />
        ) : (
          <ArticleImage src="/facebook-placeholder.jpg" alt="Facebook post" />
        )}
        <ArticleCardContent>
          <Typography variant="h4" element="h3">
            {title}
          </Typography>
          <Typography variant="body" lineClamp={3}>
            {excerpt}
          </Typography>
          <Typography variant="body" style={{ marginTop: '8px', fontSize: '0.85rem' }}>
            {new Date(post.created_time).toLocaleDateString()}
          </Typography>
        </ArticleCardContent>
      </ArticleCardContainer>
    </Link>
  );
};

export default FacebookPostCard;

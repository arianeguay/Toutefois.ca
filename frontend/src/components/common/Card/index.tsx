import Typography from '@/components/common/Typography';
import { FacebookPost, WordpressPost, WordpressProject } from '@/types';
import Link from 'next/link';
import {
  ContentCardContainer,
  ContentCardContent,
  ContentImage,
} from './styles';

type ContentItem = WordpressPost | WordpressProject | FacebookPost;

interface ContentCardProps {
  item: ContentItem;
  contentType: 'project' | 'news' | 'facebook';
}

const ContentCard: React.FC<ContentCardProps> = ({ item, contentType }) => {
  // For Facebook posts
  if (contentType === 'facebook') {
    const fbPost = item as FacebookPost;
    return (
      <ContentCardContainer>
        {fbPost.picture && <ContentImage src={fbPost.picture} alt="" />}
        <ContentCardContent>
          <Typography variant="h4" element="h3">
            Facebook Post
          </Typography>
          <Typography variant="body" lineClamp={3}>
            {fbPost.message || ''}
          </Typography>
        </ContentCardContent>
      </ContentCardContainer>
    );
  }

  // For WordPress posts and projects
  const wpItem = item as WordpressPost | WordpressProject;

  const title = typeof wpItem.title === 'string' ? wpItem.title : wpItem.title.rendered;
  const excerpt = typeof wpItem.excerpt === 'string' ? wpItem.excerpt : wpItem.excerpt.rendered;

  const linkPath =
    contentType === 'project'
      ? `/projets/${wpItem.slug}`
      : `/actualites/${wpItem.slug}`;

  return (
    <Link href={linkPath}>
      <ContentCardContainer>
        <ContentImage src={wpItem.featured_image_url} alt={title} />
        <ContentCardContent>
          <Typography variant="h4" element="h3">
            {title}
          </Typography>
          <Typography variant="body" lineClamp={3}>
            {excerpt}
          </Typography>
        </ContentCardContent>
      </ContentCardContainer>
    </Link>
  );
};

export default ContentCard;

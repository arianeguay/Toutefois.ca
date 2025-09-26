import { FacebookPost, WordpressPost, WordpressProject } from '@/types';
import dayjs from 'dayjs';
import 'dayjs/locale/fr';
import Link from 'next/link';
import CardBody from './Body';
import CardCover from './Cover';
import { ContentCardContainer } from './styles';
export type ContentItem = WordpressPost | WordpressProject | FacebookPost;

interface ContentCardProps {
  item: ContentItem;
  contentType: 'project' | 'news' | 'facebook';
}

const ContentCard: React.FC<ContentCardProps> = ({ item, contentType }) => {
  // For Facebook posts
  if (contentType === 'facebook') {
    const fbPost = item as FacebookPost;
    return (
      <a
        href={fbPost.permalink_url}
        target="_blank"
        rel="noopener noreferrer"
        style={{ textDecoration: 'none' }}
      >
        <ContentCardContainer>
          <CardCover src={fbPost.picture} alt={fbPost.message} />
          <CardBody
            title={fbPost.message}
            description={fbPost.message}
            date={dayjs(new Date(fbPost.created_time))
              .locale('fr')
              .format('D MMMM YYYY')}
          />
        </ContentCardContainer>
      </a>
    );
  }

  // For WordPress posts and projects
  const wpItem = item as WordpressPost | WordpressProject;

  const title =
    typeof wpItem.title === 'string' ? wpItem.title : wpItem.title.rendered;
  const excerpt =
    typeof wpItem.excerpt === 'string'
      ? wpItem.excerpt
      : wpItem.excerpt.rendered;

  const linkPath =
    contentType === 'project'
      ? `/projets/${wpItem.slug}`
      : `/archives/${wpItem.slug}`;

  const date =
    contentType === 'news' ? wpItem.date : (wpItem as WordpressProject).type;
  return (
    <Link
      href={linkPath}
      style={{
        textDecoration: 'none',
        display: 'block',
        height: '100%',
        width: '100%',
      }}
    >
      <ContentCardContainer>
        <CardCover src={wpItem.featured_image_url} alt={title} />
        <CardBody title={title} description={excerpt} date={date} />
      </ContentCardContainer>
    </Link>
  );
};

export default ContentCard;

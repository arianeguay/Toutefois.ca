import { FacebookPost, WordpressPost, WordpressProject } from '@/types';
import 'dayjs/locale/fr';
import CardPostLayout from './layouts/Post';
import CardProjectLayout from './layouts/Project';
import { CardEventHandlers, CardLayoutProps } from './layouts/types';

export type ContentItem = WordpressPost | WordpressProject | FacebookPost;
export type ContentType = 'project' | 'news' | 'facebook';
interface ContentCardProps extends CardEventHandlers {
  item: ContentItem;
  contentType: ContentType;
}

const ContentCard: React.FC<ContentCardProps> = ({
  item,
  contentType,
  ...eventHandlers
}) => {
  // For Facebook posts

  switch (contentType) {
    case 'project': {
      const wpItem = item as WordpressProject;
      const cardProps: CardLayoutProps = {
        type: 'project',
        title: wpItem.title,
        description: wpItem.excerpt,
        date: wpItem.date,
        cover: wpItem.featured_image_url,
        alt: wpItem.title,
        permalink: `/projets/${wpItem.slug}`,
        permalinkType: 'internal',
        dateDebut: wpItem.projet_date_debut,
        dateFin: wpItem.projet_date_fin,
      };
      return <CardProjectLayout {...cardProps} {...eventHandlers} />;
    }
    case 'news': {
      const wpItem = item as WordpressPost;
      const cardProps: CardLayoutProps = {
        type: 'news',
        title: wpItem.title.rendered,
        description: wpItem.excerpt,
        date: wpItem.date,
        cover: wpItem.featured_image_url,
        alt: wpItem.title.rendered,
        permalink: `/archives/${wpItem.slug}`,
        permalinkType: 'internal',
      };
      return <CardPostLayout {...cardProps} {...eventHandlers} />;
    }
  }
};

export default ContentCard;

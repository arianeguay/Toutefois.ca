import api from '@/api';
import ClientBlock from '@/components/blocks/ClientBlock';
import ColorUpdater from '@/components/ColorUpdater';
import type { WordpressPage } from '../../types';
import DefaultPageLayout from './layouts/Default';
import NewsPageLayout from './layouts/News';
import { PageLayoutProps } from './layouts/types';

interface LayoutProps {
  page: WordpressPage;
  backTo?: string;
  /** If provided, used for rendering archives pagination */
  archivePageNumber?: number;
  template?: string;
  type?: 'news' | 'projects' | 'default';
}

const PageLayout: React.FC<LayoutProps> = async ({
  page,
  backTo,
  archivePageNumber,
  type = 'default',
}) => {
  // Treat the link as a string to robustly get the path, avoiding errors if it's not a full URL.
  const pathname = page.link.replace(/^(?:https?:\/\/)?[^/]+\/?/, '');
  const pathSegments = pathname.split('/').filter((segment: string) => segment);

  let parentColor: string | undefined;
  let parentPageSlug: string | undefined;

  if (pathSegments.length > 1) {
    const parentSlug = pathSegments[0];

    parentPageSlug =
      parentSlug === 'collaborateurs' ? 'notre-mission' : parentSlug;
    try {
      const parentPageData = await api.fetchPageBySlug(parentPageSlug);
      const parentPage = Array.isArray(parentPageData)
        ? parentPageData[0]
        : parentPageData;

      if (parentPage && parentPage.meta?.main_color) {
        parentColor = parentPage.meta.main_color;
      }
    } catch (error) {
      console.error(
        `Failed to fetch parent page for slug: ${parentPageSlug}`,
        error,
      );
    }
  }

  // Create a page object for the header, using the parent color if available
  const headerPage = {
    ...page,
    meta: {
      ...page.meta,
      main_color: parentColor || page.meta?.main_color,
    },
  };

  // Get the mainColor from the header page or parent color
  const mainColor = headerPage.meta?.main_color || '';

  // Determine if we should show the back link based on template
  const showBackLink = (currentTemplate: string) => {
    // Don't show back link on banner template - it's handled separately
    if (currentTemplate === 'template-banner.php') return false;
    // Show back link on all other templates if backTo is provided
    return !!backTo;
  };

  const LayoutComponent: React.FC<PageLayoutProps> =
    type === 'news' ? NewsPageLayout : DefaultPageLayout;
  return (
    <ClientBlock style={{ flex: 1 }}>
      {/* Update the color context when page loads */}
      <ColorUpdater color={mainColor} />
      <LayoutComponent
        page={page}
        template={page.template || ''}
        parentPageSlug={parentPageSlug}
      />
    </ClientBlock>
  );
};

export default PageLayout;

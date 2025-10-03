import { WordpressPage } from '@/types';

export interface PageLayoutProps {
  template: string;
  page: WordpressPage;
  parentPageSlug?: string;
}

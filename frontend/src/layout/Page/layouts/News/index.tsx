import api from '@/api';
import theme from '@/theme';
import parse from 'html-react-parser';
import { Suspense } from 'react';
import BackLink from '../../Back';
import Background, { SplashName } from '../../Splash/Background';
import { MainContent } from '../../styles';
import getOptions from '../../utils/getOptions';
import { PageLayoutProps } from '../types';
import NewsHeader from './NewsHeader';
import { NewsPageContent } from './styles';

const NewsPageLayout: React.FC<PageLayoutProps> = async ({
  template,
  page,
  pageNumber,
}) => {
  const options = getOptions(page, pageNumber);
  // Fetch site options to resolve Facebook author info
  const siteOptions = await api.fetchOptions();

  // Pick author info from options using page meta
  const fbPageId = page.meta?._fb_page_id;
  const fallbackPermalink = page.meta?._fb_permalink;
  const defaultAuthor = siteOptions?.facebook_default || {};
  const candidates = (siteOptions?.facebook_pages || []) as Array<{
    page_id: string;
    name?: string;
    url?: string;
    logo?: string;
    project_id?: number;
  }>;
  const matched = fbPageId
    ? candidates.find((p) => p.page_id === fbPageId)
    : undefined;

  // Derive URL from permalink if no mapping provided
  const derivedUrl = (() => {
    if (!fallbackPermalink) return undefined;
    try {
      const u = new URL(fallbackPermalink);
      const parts = u.pathname.split('/').filter(Boolean);
      const base =
        parts.length > 0
          ? `https://${u.host}/${parts[0]}`
          : `https://${u.host}`;
      return base;
    } catch {
      return undefined;
    }
  })();

  const facebookInfo = {
    name:
      matched?.name ||
      page.meta?._fb_page_name ||
      defaultAuthor.name ||
      'Facebook',
    url:
      matched?.url || derivedUrl || defaultAuthor.url || 'https://facebook.com',
    logo:
      matched?.logo ||
      defaultAuthor.logo ||
      'https://www.facebook.com/images/fb_icon_325x325.png',
  };

  const defaults: SplashName[] = ['Splash2'];
  const metaSplashes = (page as any)?.meta?.splashes as string | undefined;
  const metaStartingSide = (page as any)?.meta?.splashes_starting_side as
    | 'left'
    | 'right'
    | undefined;
  const allowed: SplashName[] = ['Splash1', 'Splash2', 'Splash3'];
  const parsed = (metaSplashes || '')
    .split(',')
    .map((s) => s.trim())
    .filter((s): s is SplashName => (allowed as string[]).includes(s));
  const items: SplashName[] = parsed.length ? parsed : defaults;

  return (
    <>
      <Background items={items} startingSide={metaStartingSide || 'right'} />
      <MainContent style={{ marginBlock: theme.spacing.xxl }}>
        <div style={{ marginBlock: theme.spacing.md }} />
        {/* Use Suspense and BlocksProvider to handle client-side rendering of blocks */}
        <Suspense fallback={null}>
          <NewsPageContent
            className={`page-content template-${template.replace('.php', '')}`}
          >
            <NewsHeader facebookInfo={facebookInfo} date={page.date} />
            <div style={{ marginBlock: theme.spacing.md }} />
            <BackLink href="/archives" />
            <div style={{ marginBlock: theme.spacing.md }} />
            {!!page.content?.rendered && parse(page.content.rendered, options)}
          </NewsPageContent>
        </Suspense>
      </MainContent>
    </>
  );
};

export default NewsPageLayout;

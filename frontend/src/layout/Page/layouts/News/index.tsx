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

const NewsPageLayout: React.FC<PageLayoutProps> = ({
  template,
  page,
  pageNumber,
}) => {
  const options = getOptions(page, pageNumber);
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
        <div style={{ marginBlock: theme.spacing.md }} />
        {/* Use Suspense and BlocksProvider to handle client-side rendering of blocks */}
        <Suspense fallback={null}>
          <NewsPageContent
            className={`page-content template-${template.replace('.php', '')}`}
          >
            <BackLink href="/archives" />
            <div style={{ marginBlock: theme.spacing.md }} />
            <NewsHeader
              facebookInfo={{
                name: 'Facebook',
                url: 'https://facebook.com',
                logo: 'https://facebook.com/logo.png',
              }}
              date={page.date}
            />
            <div style={{ marginBlock: theme.spacing.md }} />
            {!!page.content?.rendered && parse(page.content.rendered, options)}
          </NewsPageContent>
        </Suspense>
      </MainContent>
    </>
  );
};

export default NewsPageLayout;

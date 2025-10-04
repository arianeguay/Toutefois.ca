import parse from 'html-react-parser';
import { Suspense } from 'react';
import Background from '../Splash/Background';
import { SplashName, StartingSide } from '../Splash/types';
import { MainContent } from '../styles';
import getOptions from '../utils/getOptions';
import { PageLayoutProps } from './types';

const ProjetPageLayout: React.FC<PageLayoutProps> = ({
  template,
  page,
  pageNumber,
}) => {
  const options = getOptions(page, pageNumber);
  const defaults: SplashName[] = ['Splash3'];
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
  const startingSide: StartingSide = metaStartingSide || 'left';
  return (
    <>
      <Background items={items} startingSide={startingSide} />
      <MainContent>
        {/* Use Suspense and BlocksProvider to handle client-side rendering of blocks */}
        <Suspense fallback={null}>
          <div
            className={`page-content template-${template.replace('.php', '')}`}
          >
            {!!page.content?.rendered && parse(page.content.rendered, options)}
          </div>
        </Suspense>
      </MainContent>
    </>
  );
};

export default ProjetPageLayout;

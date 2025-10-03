import theme from '@/theme';
import parse from 'html-react-parser';
import { Suspense } from 'react';
import BackLink from '../Back';
import { MainContent } from '../styles';
import getOptions from '../utils/getOptions';
import { PageLayoutProps } from './types';

const NewsPageLayout: React.FC<PageLayoutProps> = ({
  template,
  page,
  pageNumber,
}) => {
  const options = getOptions(page, pageNumber);
  return (
    <MainContent style={{ marginBlock: theme.spacing.xxl }}>
      <div style={{ marginBlock: theme.spacing.md }} />
      <BackLink href="/archives" />
      <div style={{ marginBlock: theme.spacing.md }} />
      {/* Use Suspense and BlocksProvider to handle client-side rendering of blocks */}
      <Suspense fallback={null}>
        <div
          className={`page-content template-${template.replace('.php', '')}`}
        >
          {!!page.content?.rendered && parse(page.content.rendered, options)}
        </div>
      </Suspense>
    </MainContent>
  );
};

export default NewsPageLayout;

import parse from 'html-react-parser';
import Image from 'next/image';
import { Suspense } from 'react';
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
    <MainContent>
      {!!page.thumbnail && (
        <div
          style={{
            position: 'relative',
            width: '100%',
            aspectRatio: '16 / 9',
          }}
        >
          <Image
            src={page.thumbnail}
            alt={page.title.rendered || 'Page thumbnail image'}
            fill
            sizes="(max-width: 768px) 100vw, 800px"
            priority={true} /* LCP image should be prioritized */
            style={{ objectFit: 'cover' }}
            quality={80} /* Balance quality and file size */
            placeholder="blur"
            blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNzAwIiBoZWlnaHQ9IjQ3NSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4="
          />
        </div>
      )}

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

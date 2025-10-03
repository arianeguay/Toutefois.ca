import FeaturedCarousel from '@/components/blocks/FeaturedCarousel';
import Typography from '@/components/common/Typography';
import parse from 'html-react-parser';
import Image from 'next/image';
import { Suspense } from 'react';
import Background from '../Splash/Background';
import { MainContent } from '../styles';
import getOptions from '../utils/getOptions';
import { PageLayoutProps } from './types';

const DefaultPageLayout: React.FC<PageLayoutProps> = ({
  template,
  page,
  parentPageSlug,
  pageNumber,
}) => {
  const options = getOptions(page, pageNumber);
  return (
    <MainContent>
      {/* Show title on templates that need a prominent title */}
      {(template === 'template-title.php' ||
        template === 'template-projects.php' ||
        template === 'template-collaborators.php') && (
        <Typography variant={!!page.template ? 'h1' : 'h2'} element="h1">
          {page.title.rendered}
        </Typography>
      )}

      {/* Carousel template may need special handling for featured carousel */}
      {template === 'template-carousel.php' &&
        !page.content?.rendered?.includes('featured-carousel') && (
          <FeaturedCarousel />
        )}

      {parentPageSlug === 'notre-mission' && !!page.thumbnail && (
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
          <Background
            items={['Splash3', 'Splash2', 'Splash1']}
            startingSide="left"
          />

          {!!page.content?.rendered && parse(page.content.rendered, options)}
        </div>
      </Suspense>
    </MainContent>
  );
};

export default DefaultPageLayout;

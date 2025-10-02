import { fetchFacebookPostsPage } from '@/api/facebook';
import ContentCard from '@/components/common/Card';
import { FacebookPost } from '@/types';
import Link from 'next/link';
import { GridContainer } from './styles';

export default async function FacebookArchive({
  pageId,
  after,
  before,
  currentPage = 1,
  pageSize = 12,
  excludeEvents = true,
  excludeReels = true,
  requireImage = true,
  excludeKeywords,
}: {
  pageId?: string;
  after?: string;
  before?: string;
  currentPage?: number;
  pageSize?: number;
  excludeEvents?: boolean;
  excludeReels?: boolean;
  requireImage?: boolean;
  excludeKeywords?: string[];
}) {
  // If only a page index is provided (fb_page) without cursors, traverse to that page by chaining 'after' cursors
  let effectiveAfter = after;
  let effectiveBefore = before;
  let pageNum = Math.max(1, currentPage || 1);

  // When navigating forward by index without cursor, iterate from the start following next cursors
  if (!effectiveAfter && !effectiveBefore && pageNum > 1) {
    let cursor: string | undefined = undefined;
    for (let i = 1; i < pageNum; i++) {
      const step = await fetchFacebookPostsPage({
        pageId,
        after: cursor,
        pageSize,
        excludeEvents,
        excludeReels,
        requireImage,
        excludeKeywords,
      });
      if (!step.nextCursor) {
        // Reached the end earlier than requested page index
        break;
      }
      cursor = step.nextCursor;
    }
    effectiveAfter = cursor;
  }

  const { posts, nextCursor, prevCursor } = await fetchFacebookPostsPage({
    pageId,
    after: effectiveAfter,
    before: effectiveBefore,
    pageSize,
    excludeEvents,
    excludeReels,
    requireImage,
    excludeKeywords,
  });

  return (
    <div>
      <GridContainer>
        {posts.map((p: FacebookPost) => (
          <ContentCard key={p.id} item={p} contentType="facebook" />
        ))}
      </GridContainer>

      <nav
        aria-label="Pagination Facebook"
        style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 24 }}
      >
        {/* Previous */}
        {prevCursor && (
          <Link
            href={`/archives?fb_before=${encodeURIComponent(prevCursor)}&fb_page=${pageNum - 1}`}
            prefetch
          >
            Précédent
          </Link>
        )}

        {/* Numbered window around current page (no known total; show limited range) */}
        {Array.from({ length: 5 }, (_, i) => pageNum - 2 + i)
          .filter((num) => num >= 1)
          .map((num) => {
            if (num === pageNum) {
              return (
                <span key={`fbp-${num}`} aria-current="page" style={{ fontWeight: 700 }}>
                  {num}
                </span>
              );
            }
            if (num === pageNum - 1 && prevCursor) {
              return (
                <Link
                  key={`fbp-${num}`}
                  href={`/archives?fb_before=${encodeURIComponent(prevCursor)}&fb_page=${num}`}
                  prefetch
                >
                  {num}
                </Link>
              );
            }
            if (num === pageNum + 1 && nextCursor) {
              return (
                <Link
                  key={`fbp-${num}`}
                  href={`/archives?fb_after=${encodeURIComponent(nextCursor)}&fb_page=${num}`}
                  prefetch
                >
                  {num}
                </Link>
              );
            }
            return (
              <Link key={`fbp-${num}`} href={`/archives?fb_page=${num}`} prefetch>
                {num}
              </Link>
            );
          })}

        {/* Next */}
        {nextCursor && (
          <Link
            href={`/archives?fb_after=${encodeURIComponent(nextCursor)}&fb_page=${pageNum + 1}`}
            prefetch
          >
            Suivant
          </Link>
        )}
      </nav>
    </div>
  );
}

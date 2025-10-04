import { WordpressPost } from '@/types';
import Link from 'next/link';
import ArticlesGrid from './Grid';

async function fetchPostsPaged(page: number, perPage: number) {
  const base = (
    process.env.NEXT_PUBLIC_ADMIN_URL || 'https://admin.toutefois.ca'
  ).replace(/\/$/, '');
  const url = `${base}/wp-json/wp/v2/posts?page=${page}&per_page=${perPage}&_embed=1`;

  const response = await fetch(url, { next: { revalidate: 60 } });
  if (!response.ok) {
    throw new Error(
      `Failed to fetch posts: ${response.status} ${response.statusText}`,
    );
  }

  const totalPages = Number(response.headers.get('x-wp-totalpages') || '1');
  const data = await response.json();

  const posts: WordpressPost[] = (data || []).map((p: any) => {
    let featured = '';
    try {
      const media = p?._embedded?.['wp:featuredmedia']?.[0];
      featured = media?.source_url || '';
    } catch {}

    return {
      id: p.id,
      title: { rendered: p.title?.rendered || '' },
      content: { rendered: p.content?.rendered || '' },
      excerpt: p.excerpt?.rendered || '',
      date: p.date,
      link: p.link,
      featured_image_url: featured,
      type: 'wordpress',
      slug: p.slug,
    } as WordpressPost;
  });

  return { posts, totalPages };
}

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function makeWindow(totalPages: number, current: number, maxButtons: number) {
  // Returns an array like [1, '…', 4, 5, 6, 7, 8, '…', 42]
  if (totalPages <= maxButtons) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }
  const pages: (number | string)[] = [];
  const siblings = Math.max(1, Math.floor((maxButtons - 5) / 2)); // keep 1, last, and two ellipses
  const left = clamp(current - siblings, 2, totalPages - 1);
  const right = clamp(current + siblings, 2, totalPages - 1);

  pages.push(1);
  if (left > 2) pages.push('…');

  for (let p = left; p <= right; p++) pages.push(p);

  if (right < totalPages - 1) pages.push('…');
  pages.push(totalPages);

  // Ensure current included if near edges
  if (!pages.includes(current)) {
    // Replace first middle with current if necessary
    const idx = pages.findIndex(
      (v) => typeof v === 'number' && v !== 1 && v !== totalPages,
    );
    if (idx !== -1) pages[idx] = current;
  }
  // Remove duplicates and sort numbers while keeping ellipses order
  const seen = new Set();
  return pages.filter((v) => (v === '…' ? true : !seen.has(v) && seen.add(v)));
}

export default async function Archive({
  page = 1,
  perPage = 12,
}: {
  page?: number;
  perPage?: number;
}) {
  const { posts, totalPages } = await fetchPostsPaged(page, perPage);

  const pagesToRender = makeWindow(totalPages, page, 5);

  return (
    <div>
      <ArticlesGrid articles={posts} />
      {totalPages > 1 && (
        <nav
          style={{
            display: 'flex',
            gap: 12,
            justifyContent: 'center',
            marginTop: 24,
          }}
        >
          {page > 1 && (
            <Link href={`/archives?page=${page - 1}`} prefetch>
              Précédent
            </Link>
          )}
          {pagesToRender.map((p, i) =>
            p === '…' ? (
              <Link href={`/archives?page=${p}`} prefetch>
                …
              </Link>
            ) : p === page ? (
              <span style={{ fontWeight: 'bold' }} key={i}>
                {p}
              </span>
            ) : (
              <Link href={`/archives?page=${p}`} prefetch>
                {p}
              </Link>
            ),
          )}
          <span></span>
          {page < totalPages && (
            <Link href={`/archives?page=${page + 1}`} prefetch>
              Suivant
            </Link>
          )}
        </nav>
      )}
    </div>
  );
}

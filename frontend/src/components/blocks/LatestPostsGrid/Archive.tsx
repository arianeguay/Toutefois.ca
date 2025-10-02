import { WordpressPost } from '@/types';
import Link from 'next/link';
import ArticlesGrid from './Grid';

async function fetchPostsPaged(page: number, perPage: number) {
  const base = (process.env.NEXT_PUBLIC_ADMIN_URL || 'https://admin.toutefois.arianeguay.ca').replace(/\/$/, '');
  const url = `${base}/wp-json/wp/v2/posts?page=${page}&per_page=${perPage}&_embed=1`;

  const response = await fetch(url, { next: { revalidate: 60 } });
  if (!response.ok) {
    throw new Error(`Failed to fetch posts: ${response.status} ${response.statusText}`);
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

export default async function Archive({ page = 1, perPage = 12 }: { page?: number; perPage?: number }) {
  const { posts, totalPages } = await fetchPostsPaged(page, perPage);

  return (
    <div>
      <ArticlesGrid articles={posts} />
      {totalPages > 1 && (
        <nav style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 24 }}>
          {page > 1 && (
            <Link href={`/archives?page=${page - 1}`} prefetch>
              Précédent
            </Link>
          )}
          <span>Page {page} / {totalPages}</span>
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

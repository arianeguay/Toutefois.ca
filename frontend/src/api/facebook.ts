import { FacebookPost } from '@/types';

/**
 * Fetches posts from a Facebook page
 * @param pageId Facebook page ID
 * @param limit Number of posts to fetch
 * @returns Array of FacebookPost objects
 */

interface FetchFacebookPostsParams {
  pageId?: string;
  /** Max number of posts to return after filtering */
  limit?: number;
  /** If true, only return posts that have an image */
  requireImage?: boolean;
  /**
   * Exclude posts if their message contains any of these keywords (case-insensitive)
   * Example: ['giveaway', 'promotion']
   */
  excludeKeywords?: string[];
  /** Exclude Facebook Event posts */
  excludeEvents?: boolean;
  /** Exclude Facebook Reels */
  excludeReels?: boolean;
  /**
   * Safety cap for how many pages to traverse when looking for older posts.
   * Each page size is controlled by pageSize.
   */
  maxPages?: number;
  /** Page size per Graph request (Facebook defaults to ~25 if not specified) */
  pageSize?: number;
}

// Return type for a single paged fetch with cursors
interface FacebookPageResult {
  posts: FacebookPost[];
  nextCursor?: string;
  prevCursor?: string;
  nextUrl?: string;
  prevUrl?: string;
}

interface FetchFacebookPostsPageParams extends Omit<FetchFacebookPostsParams, 'limit' | 'maxPages'> {
  /** Cursor from previous response to get the next page */
  after?: string;
  /** Cursor to get the previous page */
  before?: string;
  /** Page size for this request (default 25 or provided) */
  pageSize?: number;
}

export async function fetchFacebookPostsPage({
  pageId,
  pageSize = 25,
  requireImage,
  excludeKeywords,
  excludeEvents,
  excludeReels,
  after,
  before,
}: FetchFacebookPostsPageParams = {}): Promise<FacebookPageResult> {
  if (typeof window !== 'undefined') {
    console.warn('Client-side Facebook posts fetching not implemented');
    return { posts: [] };
  }

  const accessToken = process.env.NEXT_PUBLIC_FACEBOOK_ACCESS_TOKEN;
  const resolvedPageId =
    pageId || process.env.NEXT_PUBLIC_FACEBOOK_PAGE_ID || '104368542729089';
  if (!accessToken) {
    console.error('Facebook access token not found in environment variables');
    return { posts: [] };
  }

  const fields = [
    'permalink_url',
    'full_picture',
    'height',
    'message',
    'created_time',
    'attachments{title,url,type,media_type}',
  ].join(',');

  const search = new URLSearchParams();
  search.set('fields', fields);
  search.set('limit', String(pageSize));
  if (after) search.set('after', after);
  if (before) search.set('before', before);
  search.set('access_token', accessToken);

  const url = `https://graph.facebook.com/v23.0/${resolvedPageId}/feed?${search.toString()}`;
  const response = await fetch(url, { next: { revalidate: 3600 } });
  if (!response.ok) {
    throw new Error(`Failed to fetch Facebook posts: ${response.statusText}`);
  }
  const data = await response.json();
  const postsRaw: any[] = data.data || [];

  let posts: FacebookPost[] = [];
  for (const post of postsRaw) {
    const permalink: string = post.permalink_url || '';
    const picture: string = post.full_picture || '';
    const attachments: any[] = post.attachments?.data || [];
    const primaryAttachment = attachments[0] || {};
    const attachmentType: string = primaryAttachment?.type || '';

    if (excludeEvents) {
      const isEvent = attachmentType === 'event' || permalink.includes('/events/');
      if (isEvent) continue;
    }
    if (excludeReels) {
      const looksLikeReel = permalink.includes('/reel/');
      if (looksLikeReel) continue;
    }

    posts.push({
      id: post.id,
      message: post.message || '',
      picture: picture || '',
      created_time: post.created_time,
      permalink_url: permalink,
      type: 'facebook',
    });
  }

  // Secondary filters
  if (requireImage) posts = posts.filter((p) => !!p.picture);
  if (excludeKeywords?.length) {
    const checks = excludeKeywords.map((k) => k.toLowerCase());
    posts = posts.filter((p) => !checks.some((k) => (p.message || '').toLowerCase().includes(k)));
  }

  return {
    posts,
    nextCursor: data?.paging?.cursors?.after,
    prevCursor: data?.paging?.cursors?.before,
    nextUrl: data?.paging?.next,
    prevUrl: data?.paging?.previous,
  };
}

export async function fetchFacebookPosts({
  pageId,
  limit,
  requireImage,
  excludeKeywords,
  excludeEvents,
  excludeReels,
  maxPages = 4,
  pageSize,
}: FetchFacebookPostsParams = {}): Promise<FacebookPost[]> {
  // Check if we're on server side
  if (typeof window === 'undefined') {
    try {
      // For server-side rendering, use Facebook Graph API with an access token
      // This requires a Facebook App with appropriate permissions
      const accessToken = process.env.NEXT_PUBLIC_FACEBOOK_ACCESS_TOKEN;

      // Resolve page ID: env var takes precedence if provided, otherwise fallback
      const resolvedPageId =
        pageId || process.env.NEXT_PUBLIC_FACEBOOK_PAGE_ID || '104368542729089';

      if (!accessToken) {
        console.error(
          'Facebook access token not found in environment variables',
        );
        return [];
      }

      // Build base URL with requested fields
      const fields = [
        'permalink_url',
        'full_picture',
        'height',
        'message',
        'created_time',
        // include attachment type info to help filtering events/reels
        'attachments{title,url,type,media_type}',
      ].join(',');

      const baseUrl = `https://graph.facebook.com/v23.0/${resolvedPageId}/feed?fields=${encodeURIComponent(
        fields,
      )}`;

      // Use a working page size for deeper pagination while keeping payload reasonable
      const effectivePageSize = pageSize || Math.max(10, Math.min(limit || 25, 25));

      let url = `${baseUrl}&limit=${effectivePageSize}&access_token=${accessToken}`;
      const collected: FacebookPost[] = [];
      let pagesFetched = 0;

      // Traverse pages until we meet requested limit or reach safety cap
      // This allows fetching older posts (e.g., older than May) if they don't appear in the first page
      while (url && pagesFetched < maxPages && (!limit || collected.length < limit)) {
        const response = await fetch(url, { next: { revalidate: 3600 } });
        if (!response.ok) {
          throw new Error(`Failed to fetch Facebook posts: ${response.statusText}`);
        }

        const data = await response.json();
        const postsRaw: any[] = data.data || [];

        for (const post of postsRaw) {
          const permalink: string = post.permalink_url || '';
          const picture: string = post.full_picture || '';
          const attachments: any[] = post.attachments?.data || [];
          const primaryAttachment = attachments[0] || {};
          const attachmentType: string = primaryAttachment?.type || '';
          const attachmentMediaType: string = primaryAttachment?.media_type || '';

          // Heuristic filters on raw post
          if (excludeEvents) {
            const isEvent = attachmentType === 'event' || permalink.includes('/events/');
            if (isEvent) continue;
          }
          if (excludeReels) {
            const looksLikeReel = permalink.includes('/reel/');
            // Some reels may surface as videos; we keep normal videos but exclude explicit reels
            if (looksLikeReel) continue;
          }

          // Map after raw filters
          const mapped: FacebookPost = {
            id: post.id,
            message: post.message || '',
            picture: picture || '',
            created_time: post.created_time,
            permalink_url: permalink,
            type: 'facebook',
          };

          collected.push(mapped);
        }

        // Next page URL via paging.next (Graph API provides absolute URL)
        url = data?.paging?.next || '';
        pagesFetched += 1;
      }

      // Apply optional filters
      let filtered = collected;
      if (requireImage) {
        filtered = filtered.filter((p) => !!p.picture);
      }
      if (excludeKeywords && excludeKeywords.length > 0) {
        const checks = excludeKeywords.map((k) => k.toLowerCase());
        filtered = filtered.filter((p) => {
          const text = (p.message || '').toLowerCase();
          return !checks.some((k) => text.includes(k));
        });
      }

      // Respect limit after filtering
      return typeof limit === 'number' ? filtered.slice(0, limit) : filtered;
    } catch (error) {
      console.error('Error fetching Facebook posts:', error);
      return [];
    }
  } else {
    // For client-side rendering, we can't use the token directly due to security
    // Consider using a server endpoint that proxies the request instead
    console.warn('Client-side Facebook posts fetching not implemented');
    return [];
  }
}

/**
 * Development mock data for testing without an actual Facebook API connection
 */
export function getMockFacebookPosts(): FacebookPost[] {
  return [
    {
      id: 'fb_mock_1',
      message:
        "Nous sommes ravis d'annoncer notre nouvelle initiative culturelle qui débutera le mois prochain. Restez à l'affût pour plus de détails!",
      picture: 'https://via.placeholder.com/600x400?text=Facebook+Post+Image',
      created_time: new Date().toISOString(),
      permalink_url: 'https://facebook.com',
      type: 'facebook',
    },
    {
      id: 'fb_mock_2',
      message:
        'Retour sur notre événement de la semaine dernière. Merci à tous les participants qui ont fait de cette journée un succès!',
      picture: 'https://via.placeholder.com/600x400?text=Event+Recap',
      created_time: new Date(
        Date.now() - 7 * 24 * 60 * 60 * 1000,
      ).toISOString(),
      permalink_url: 'https://facebook.com',
      type: 'facebook',
    },
    {
      id: 'fb_mock_3',
      message:
        'Nouvelle collaboration artistique en cours. Nous avons hâte de vous montrer le résultat final dans les prochaines semaines.',
      picture: 'https://via.placeholder.com/600x400?text=New+Collaboration',
      created_time: new Date(
        Date.now() - 3 * 24 * 60 * 60 * 1000,
      ).toISOString(),
      permalink_url: 'https://facebook.com',
      type: 'facebook',
    },
  ];
}

import { FacebookPost } from '@/types';

/**
 * Fetches posts from a Facebook page
 * @param pageId Facebook page ID
 * @param limit Number of posts to fetch
 * @returns Array of FacebookPost objects
 */

interface FetchFacebookPostsParams {
  pageId?: string;
  limit?: number;
}

export async function fetchFacebookPosts({
  pageId,
  limit,
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

      const response = await fetch(
        `https://graph.facebook.com/v23.0/${resolvedPageId}/feed?fields=permalink_url,full_picture,height,message,created_time,attachments{title,url}${!!limit ? `&limit=${limit}` : ''}&access_token=${accessToken}`,
        { next: { revalidate: 3600 } }, // Revalidate every hour
      );

      if (!response.ok) {
        throw new Error(
          `Failed to fetch Facebook posts: ${response.statusText}`,
        );
      }

      const data = await response.json();

      // Map the response to our FacebookPost type
      return data.data.map((post: any) => ({
        id: post.id,
        message: post.message || '',
        picture: post.full_picture || '',
        created_time: post.created_time,
        permalink_url: post.permalink_url,
        type: 'facebook' as const,
      }));
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

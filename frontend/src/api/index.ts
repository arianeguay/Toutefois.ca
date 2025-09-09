import type {
  WordpressImage,
  WordpressMenuItem,
  WordpressPage,
  WordpressPost,
  WordpressProject,
  WordpressProjectFull,
  WordpressProjectGridData,
} from '../types';

class Api {
  private baseUrl: string;

  constructor() {
    this.baseUrl =
      process.env.NEXT_PUBLIC_API_URL ||
      'https://admin.toutefois.arianeguay.ca/wp-json';
  }

  async fetchFromApi(url: string) {
    const apiUrl = `${this.baseUrl}/${url}`;
    console.log('Fetching from API:', apiUrl);

    try {
      // First try with no Content-Type header
      console.log('Attempting fetch without Content-Type header');
      let response = await fetch(apiUrl, {
        method: 'GET',
        mode: 'cors',
        credentials: 'omit', // No credentials to avoid cookie issues
        headers: {
          Accept: 'application/json',
          // No Content-Type header
        },
        next: { revalidate: 60 }, // Enable ISR with a 60-second revalidation period
      });

      // Log response details for debugging
      console.log('Response status:', response.status);
      console.log('Response headers:', [
        ...new Array(response.headers.entries()),
      ]);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error Response:', errorText);
        throw new Error(
          `HTTP error! status: ${response.status}, URL: ${apiUrl}`,
        );
      }

      // Check if the response is actually JSON
      const contentType = response.headers.get('content-type');
      console.log('Content-Type:', contentType);

      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text();
        console.error(
          'Received non-JSON response:',
          text.substring(0, 500) + '...',
        );

        throw new Error(
          `Received non-JSON response from API (${contentType}). Check server configuration.`,
        );
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('API fetch error:', error);
      throw error;
    }
  }

  async fetchPosts(): Promise<WordpressPost[]> {
    return this.fetchFromApi('wp/v2/posts');
  }

  async fetchPostById(id: number): Promise<WordpressPost> {
    return this.fetchFromApi(`wp/v2/posts/${id}`);
  }

  async fetchPages(): Promise<WordpressPage[]> {
    return this.fetchFromApi('wp/v2/pages');
  }

  async fetchImageById(id: string): Promise<WordpressImage> {
    return this.fetchFromApi(`wp/v2/media/${id}`);
  }

  async fetchPageBySlug(
    slug: string,
  ): Promise<WordpressPage | WordpressPage[]> {
    console.log(slug);
    // First try direct slug match (which works for top-level pages)
    const directMatch = await this.fetchFromApi(
      `wp/v2/pages?slug=${encodeURIComponent(slug)}`,
    );
    console.log(directMatch);

    // If we found a direct match, return it
    if (Array.isArray(directMatch) && directMatch.length > 0) {
      return directMatch;
    }

    // If no direct match, try fetching by path (which works for hierarchical pages)
    try {
      // WordPress API has issues with hierarchical slugs, so we need to try a different approach
      // Fetch all pages and filter on the client side
      const allPages = await this.fetchPages();

      // Find pages with matching path
      const matchingPages = allPages.filter((page) => {
        // Normalize paths for comparison
        const normalizedSlug = slug.replace(/^\/|\/$/g, ''); // Remove leading/trailing slashes
        const normalizedPageSlug = page.slug.replace(/^\/|\/$/g, '');
        const normalizedPageLink = page.link
          .replace(/https?:\/\/[^/]+\//g, '')
          .replace(/^\/|\/$/g, '');

        // Try multiple matching strategies
        return (
          normalizedPageSlug === normalizedSlug ||
          normalizedPageLink === normalizedSlug ||
          normalizedPageLink.includes(normalizedSlug)
        );
      });

      if (matchingPages.length > 0) {
        return matchingPages;
      }

      // If still no match, return an empty array that can be handled as "not found" by consumers
      return [] as unknown as WordpressPage[];
    } catch (error) {
      console.error('Error fetching hierarchical page:', error);
      return [] as unknown as WordpressPage[];
    }
  }

  async fetchProjects() {
    return this.fetchFromApi('wp/v2/projet');
  }

  async fetchProjectById(id: number) {
    return this.fetchFromApi(`wp/v2/projet/${id}`);
  }

  async fetchProjectBySlug(slug: string): Promise<WordpressProjectFull> {
    console.log(`Fetching project with slug: ${slug}`);
    return this.fetchFromApi(`wp/v2/projet?slug=${slug}`);
  }

  async fetchMenu(): Promise<WordpressMenuItem[]> {
    return this.fetchFromApi('toutefois/v1/menu');
  }

  async fetchFeaturedProjects(): Promise<WordpressProject[]> {
    return this.fetchFromApi('toutefois/v1/featured-projects');
  }

  async fetchAllProjects(): Promise<WordpressProject[]> {
    return this.fetchFromApi('toutefois/v1/projects');
  }

  async fetchAllNews(): Promise<WordpressPost[]> {
    return this.fetchFromApi('toutefois/v1/news');
  }

  async fetchProjectsGrid(
    page = 1,
    perPage = 9,
  ): Promise<WordpressProjectGridData> {
    return this.fetchFromApi(
      `toutefois/v1/projects-grid?page=${page}&per_page=${perPage}`,
    );
  }

  async fetchMenuItems(): Promise<WordpressMenuItem[]> {
    return this.fetchFromApi('toutefois/v1/menu');
  }

  async fetchSpecialProjects(): Promise<WordpressMenuItem | null> {
    const specialProjects = await this.fetchFromApi(
      'toutefois/v1/special-projects',
    );

    if (!specialProjects?.length) {
      return null;
    }
    return specialProjects[0];
  }
}

// Create a singleton instance
const api = new Api();
export default api;

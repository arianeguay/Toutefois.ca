import type {
  WordpressCollaborator,
  WordpressFooter,
  WordpressImage,
  WordpressMenuItem,
  WordpressOptions,
  WordpressPage,
  WordpressPost,
  WordpressProject,
  WordpressProjectFull,
  WordpressProjectGridData,
} from '../types';

class Api {
  private baseUrl: string;

  constructor() {
    const raw =
      process.env.NEXT_PUBLIC_ADMIN_URL ||
      'https://admin.toutefois.arianeguay.ca/wp-json';
    // Ensure baseUrl ends with /wp-json and has no trailing slash beyond it
    let normalized = raw.trim();
    try {
      // If the provided URL does not include /wp-json, append it
      const u = new URL(normalized);
      if (!u.pathname.includes('/wp-json')) {
        normalized = `${u.origin.replace(/\/$/, '')}/wp-json`;
      } else {
        // Strip trailing slash for consistent joining
        normalized = `${u.origin}${u.pathname.replace(/\/$/, '')}`;
      }
    } catch {
      // Fallback: naive normalization
      if (!normalized.includes('/wp-json')) {
        normalized = normalized.replace(/\/$/, '') + '/wp-json';
      } else {
        normalized = normalized.replace(/\/$/, '');
      }
    }
    this.baseUrl = normalized;
  }

  async fetchFromApi(url: string) {
    const apiUrl = `${this.baseUrl.replace(/\/$/, '')}/${url.replace(/^\//, '')}`;

    try {
      // First try with no Content-Type header
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

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error Response:', errorText);
        throw new Error(
          `HTTP error! status: ${response.status}, URL: ${apiUrl}`,
        );
      }

      // Check if the response is actually JSON
      const contentType = response.headers.get('content-type');

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

  async fetchPostBySlug(slug: string): Promise<WordpressPost[]> {
    return this.fetchFromApi(`wp/v2/posts?slug=${slug}`);
  }

  async fetchPages(): Promise<WordpressPage[]> {
    return this.fetchFromApi('wp/v2/pages');
  }

  async fetchPageById(id: number): Promise<WordpressPage> {
    return this.fetchFromApi(`wp/v2/pages/${id}`);
  }

  async fetchImageById(id: string): Promise<WordpressImage> {
    return this.fetchFromApi(`wp/v2/media/${id}`);
  }

  async fetchPageBySlug(
    slug: string,
  ): Promise<WordpressPage | WordpressPage[]> {
    // First try direct slug match (which works for top-level pages)
    const directMatch = await this.fetchFromApi(
      `wp/v2/pages?slug=${encodeURIComponent(slug)}`,
    );

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
    // Ensure meta is included (e.g., _projet_is_main exposed via REST)
    const params = new URLSearchParams({ slug });
    // Request only needed fields including meta to keep payload small
    params.append(
      '_fields',
      [
        'id',
        'title',
        'content',
        'template',
        'slug',
        'date',
        'projet_is_main',
      ].join(','),
    );
    return this.fetchFromApi(`wp/v2/projet?${params.toString()}`);
  }

  async fetchMenu(): Promise<WordpressMenuItem[]> {
    return this.fetchFromApi('toutefois/v1/menu');
  }

  async fetchFeaturedProjects(): Promise<WordpressProject[]> {
    return this.fetchFromApi('toutefois/v1/featured-projects');
  }

  async fetchAllProjects(
    mainProject?: string | number,
  ): Promise<WordpressProject[]> {
    const qp = mainProject
      ? `?main_project=${encodeURIComponent(String(mainProject))}`
      : '';
    return this.fetchFromApi(`toutefois/v1/projects${qp}`);
  }
  async fetchAllProjectsByCategory(
    categoryId: string,
    mainProject?: string | number,
  ): Promise<WordpressProject[]> {
    const params = new URLSearchParams({ category: String(categoryId) });
    if (mainProject !== undefined) {
      params.set('main_project', String(mainProject));
    }
    return this.fetchFromApi(
      `toutefois/v1/projects-category-row?${params.toString()}`,
    );
  }

  async fetchAllNews(mainProject?: string | number): Promise<WordpressPost[]> {
    const qp = mainProject
      ? `?main_project=${encodeURIComponent(String(mainProject))}`
      : '';
    return this.fetchFromApi(`toutefois/v1/news${qp}`);
  }

  async fetchProjectsGrid(
    page = 1,
    perPage = 9,
    mainProject?: string | number,
  ): Promise<WordpressProjectGridData> {
    const params = new URLSearchParams({
      page: String(page),
      per_page: String(perPage),
    });
    if (mainProject !== undefined) {
      params.set('main_project', String(mainProject));
    }
    return this.fetchFromApi(`toutefois/v1/projects-grid?${params.toString()}`);
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

  async fetchFooter(): Promise<WordpressFooter | null> {
    const footer = await this.fetchFromApi('toutefois/v1/footer');

    return footer;
  }

  async fetchCollaborators({
    memberStatus,
    mainProject,
  }: {
    memberStatus: string;
    mainProject?: string | number;
  }): Promise<WordpressCollaborator[]> {
    const params = new URLSearchParams({ member_status: memberStatus });
    if (mainProject !== undefined) {
      params.set('main_project', String(mainProject));
    }
    return this.fetchFromApi(`toutefois/v1/collaborators?${params.toString()}`);
  }

  async fetchCollaboratorBySlug(slug: string): Promise<WordpressCollaborator> {
    return this.fetchFromApi(`toutefois/v1/collaborators/${slug}`);
  }

  async fetchOptions(): Promise<WordpressOptions> {
    return this.fetchFromApi('toutefois/v1/options');
  }
}

// Create a singleton instance
const api = new Api();
export default api;

import type {
  WordpressImage,
  WordpressMenuItem,
  WordpressPage,
  WordpressPost,
} from '../types';

const API_URL = import.meta.env.VITE_API_URL;
class Api {
  private baseUrl: string;

  constructor() {
    this.baseUrl = API_URL || 'https://admin.toutefois.arianeguay.ca/wp-json';
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
          'Accept': 'application/json',
          // No Content-Type header
        },
        cache: 'no-store', // Skip cache completely
      });
      
      // Log response details for debugging
      console.log('Response status:', response.status);
      console.log('Response headers:', [...response.headers.entries()]);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error Response:', errorText);
        throw new Error(`HTTP error! status: ${response.status}, URL: ${apiUrl}`);
      }

      // Check if the response is actually JSON
      const contentType = response.headers.get('content-type');
      console.log('Content-Type:', contentType);
      
      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text();
        console.error('Received non-JSON response:', text.substring(0, 500) + '...');
        
        // The response is HTML instead of JSON, which typically means:
        // 1. WordPress is returning an error page
        // 2. WordPress REST API might not be properly configured
        // 3. A redirect is happening to a login page
        throw new Error(`Received non-JSON response from API (${contentType}). Check server configuration.`);
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

  async fetchImageById(id: number): Promise<WordpressImage> {
    return this.fetchFromApi(`wp/v2/media/${id}`);
  }
  async fetchPageBySlug(slug: string): Promise<WordpressPage> {
    return this.fetchFromApi(`wp/v2/pages?slug=${slug}`);
  }

  async fetchProjects() {
    return this.fetchFromApi('wp/v2/projects');
  }

  async fetchProjectById(id: number) {
    return this.fetchFromApi(`wp/v2/projects/${id}`);
  }

  async fetchMenu(): Promise<WordpressMenuItem[]> {
    return this.fetchFromApi('toutefois/v1/menu');
  }

  async fetchFeaturedProjects() {
    return this.fetchFromApi('toutefois/v1/featured-projects');
  }

  async fetchAllProjects() {
    return this.fetchFromApi('toutefois/v1/projects');
  }

  async fetchAllNews() {
    return this.fetchFromApi('toutefois/v1/news');
  }

  async fetchProjectsGrid(page = 1, perPage = 9) {
    return this.fetchFromApi(
      `toutefois/v1/projects-grid?page=${page}&per_page=${perPage}`,
    );
  }
}

export default new Api();

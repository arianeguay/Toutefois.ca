import type { WordpressMenu, WordpressMenuItem, WordpressPage, WordpressPost } from "../types";

class Api {
    private baseUrl: string;

    constructor() {
        this.baseUrl = 'http://localhost/wp-json';
    }

    async fetchFromApi(url: string) {
        const apiUrl = `${this.baseUrl}/${url}`;

        const response = await fetch(apiUrl, {
            method: 'GET',
            mode: 'cors',
            credentials: 'include',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        return data;
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
}

export default new Api();

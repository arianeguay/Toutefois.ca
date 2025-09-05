import type { WordpressMenu, WordpressMenuItem, WordpressPage, WordpressPost } from "../types";

class Api {
    private baseUrl: string;

    constructor() {
        this.baseUrl = 'http://localhost/wp-json/wp/v2';
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
        return this.fetchFromApi('posts');
    }

    async fetchPostById(id: number): Promise<WordpressPost> {
        return this.fetchFromApi(`posts/${id}`);
    }

    async fetchPages(): Promise<WordpressPage[]> {
        return this.fetchFromApi('pages');
    }

    async fetchPageBySlug(slug: string): Promise<WordpressPage> {
        return this.fetchFromApi(`pages?slug=${slug}`);
    }

    async fetchProjects() {
        return this.fetchFromApi('projects');
    }

    async fetchProjectById(id: number) {
        return this.fetchFromApi(`projects/${id}`);
    }

    async fetchMenu(): Promise<WordpressMenuItem[]> {
        return this.fetchFromApi('menu-items');
    }
}

export default new Api();

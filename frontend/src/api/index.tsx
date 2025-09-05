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

    async fetchPosts() {
        return this.fetchFromApi('posts');
    }

    async fetchPostById(id: number) {
        return this.fetchFromApi(`posts/${id}`);
    }

    async fetchPages() {
        return this.fetchFromApi('pages');
    }

    async fetchPageById(id: number) {
        return this.fetchFromApi(`pages/${id}`);
    }

    async fetchProjects() {
        return this.fetchFromApi('projects');
    }

    async fetchProjectById(id: number) {
        return this.fetchFromApi(`projects/${id}`);
    }
}

export default new Api();

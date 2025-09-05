export interface WordpressPost {
  id: number;
  title: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  link: string;
}

export interface WordpressPage {
  id: number;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  link: string;
  slug: string;
}

export interface WordpressMenu {
  id: number;
  description: string;
  name: string;
}

export interface WordpressMenuItem {
  id: number;
  title: {
    rendered: string;
  };
  link: string;
  slug: string;
}

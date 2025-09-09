export interface WordpressPost {
  id: number;
  title: string;
  excerpt: string;
  link: string;
  featured_image_url: string;
  type?: 'wordpress';
  slug?: string;
}

export interface FacebookPost {
  id: string;
  message: string;
  picture?: string;
  created_time: string;
  permalink_url: string;
  type: 'facebook';
}

export type PostItem = WordpressPost | FacebookPost;

export interface WordpressPage {
  id: number;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  excerpt?: {
    rendered: string;
  };
  link: string;
  slug: string;
  parent?: number; // Parent page ID for hierarchical pages
  // Add additional WordPress fields that might be useful for debugging
  _links?: {
    [key: string]: any;
  };
  meta?: {
    main_color: string;
  };
}

export interface WordpressImage {
  id: number;
  title: string;
  alt_text: string;
  author: number;
  caption: string;
  class_list: string[];
  comment_status: string;
  date: string;
  date_gmt: string;
  description: string;
  featured_media: number;
  guid: string;
  link: string;
  source_url: string;
}

export interface WordpressMenu {
  id: number;
  description: string;
  name: string;
}

export interface WordpressProject {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  featured_image_url: string;
  slug: string;
  meta: {
    [key: string]: string[];
    _projet_image_id: string[];
    _projet_is_featured: string[];
    _projet_type: string[];
    _projet_date_debut: string[];
    _projet_date_fin: string[];
    _projet_credits: string[];
    _projet_personnes: string[];
    _projet_lien: string[];
  };
}

export interface WordpressProjectGridData {
  all_projects: WordpressProject[];
  by_category: {
    category: {
      id: number;
      name: string;
      slug: string;
    };
    projects: WordpressProject[];
  }[];
}

export interface WordpressProjectFull {
  id: number;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  featured_image_url: string;
}

export interface WordpressMenuItem {
  name: string;
  href: string;
  mainColor: string;
  previewImage: string;
}

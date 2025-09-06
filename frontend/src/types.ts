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

export interface WordpressMenuItem {
  id: number;
  title: {
    rendered: string;
  };
  link: string;
  slug: string;
}

export interface WordpressPost {
  id: number;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  excerpt: string;
  date: string;
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
  thumbnail?: string;
  link: string;
  slug: string;
  template?: string;
  parent?: number; // Parent page ID for hierarchical pages
  // Add additional WordPress fields that might be useful for debugging
  _links?: {
    [key: string]: any;
  };
  meta?: {
    main_color?: string;
    preview_image_url?: string;
  };
  isMainProject?: boolean;
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
  template?: string;
  date?: string;
  projet_date_debut?: string;
  projet_date_fin?: string;
  type?: string;
  lien_de_reservation?: string;
  categories?: {
    id: number;
    name: string;
    slug: string;
  }[];
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
  slug: string;
  date: string;
  content: {
    rendered: string;
  };
  featured_image_url: string;
  template?: string;
  toutefois_meta: {
    _projet_is_main: boolean;
    _projet_date_debut: string;
    _projet_date_fin: string;
    _projet_lien: string;
    _projet_is_featured: boolean;
    _main_project_id: number;
    main_color: string;
    preview_image_url: string;
  };
}

export interface WordpressMenuItem {
  name: string;
  href: string;
  mainColor: string;
  previewImage: string;
}

export interface WordpressFooter {
  phone: string;
  email: string;
  instagram: string;
  facebook: string;
  slogan: string;
}

export interface WordpressCollaborator {
  id: number;
  name: string;
  excerpt: string;
  content: string;
  position: string;
  photoUrl: string;
  slug: string;
  template?: string;
  meta: {
    main_color?: string;
  };
}

export interface WordpressOptions {
  error_title: string;
  error_message: string;
  donation_link: string;
}

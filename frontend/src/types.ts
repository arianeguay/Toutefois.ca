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
  title: { rendered: string };
  content: { rendered: string };
  excerpt?: { rendered: string };
  link: string;
  slug?: string;
  template?: string;
  meta?: {
    main_color?: string;
    preview_image_url?: string;
    // Facebook import meta
    _fb_permalink?: string;
    _fb_page_id?: string;
    _fb_page_name?: string;
  };
  isMainProject?: boolean;
  date?: string;
}

export interface OptionsResponse {
  site_name: string;
  site_description: string;
  homepage_title: string;
  homepage_description: string;
  error_title: string;
  error_message: string;
  donation_link: string;
  /**
   * Google Analytics 4 Measurement ID (e.g., G-XXXXXXXXXX) provided by WP options
   */
  ga_measurement_id?: string;
  /**
   * Google Search Console site verification token provided by WP options
   */
  google_site_verification?: string;
  /** Default Facebook Page info for author rendering */
  facebook_default?: {
    id?: string;
    name?: string;
    url?: string;
    logo?: string;
  };
  /** Optional list of additional Facebook pages (e.g., per project) */
  facebook_pages?: Array<{
    page_id: string;
    name?: string;
    url?: string;
    logo?: string;
    project_id?: number;
  }>;
}

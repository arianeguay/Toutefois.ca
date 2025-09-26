import type { MetadataRoute } from 'next';
import api from '@/api';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  const entries: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
  ];

  try {
    // Pages
    const pages = await api.fetchPages();
    for (const p of pages) {
      const path = `/${String(p.slug || '').replace(/^\//, '')}`;
      entries.push({
        url: `${baseUrl}${path}`,
        lastModified: p.meta?.main_color ? new Date() : new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
      });
    }
  } catch (e) {
    console.error('sitemap pages error:', e);
  }

  try {
    // Posts (archives)
    const posts = await api.fetchPosts();
    for (const post of posts) {
      const slug = (post as any).slug || '';
      if (!slug) continue;
      entries.push({
        url: `${baseUrl}/archives/${slug}`,
        lastModified: post.date ? new Date(post.date) : new Date(),
        changeFrequency: 'monthly',
        priority: 0.6,
      });
    }
  } catch (e) {
    console.error('sitemap posts error:', e);
  }

  try {
    // Projects (projets)
    const projects = await api.fetchAllProjects();
    for (const proj of projects) {
      if (!proj.slug) continue;
      entries.push({
        url: `${baseUrl}/projets/${proj.slug}`,
        lastModified: proj.date ? new Date(proj.date) : new Date(),
        changeFrequency: 'monthly',
        priority: 0.6,
      });
    }
  } catch (e) {
    console.error('sitemap projects error:', e);
  }

  return entries;
}

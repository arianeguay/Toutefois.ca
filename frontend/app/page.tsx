import { Metadata } from 'next';
import api from '../src/api';
import PageLayout from '../src/layout/Page';

export const metadata: Metadata = {
  title: 'Toutefois - Accueil',
  description: "Page d'accueil de Toutefois",
};

export default async function Home() {
  // Fetch the home page data
  const pages = await api.fetchPageBySlug('home');
  const homePage = Array.isArray(pages) ? pages[0] : pages;

  return <PageLayout page={homePage} />;
}

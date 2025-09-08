import { Metadata } from 'next';
import api from '../../src/api';
import PageLayout from '../../src/layout/Page';

export const metadata: Metadata = {
  title: 'Toutefois - Projets',
  description: 'Liste des projets de Toutefois',
};

export default async function ProjectsPage() {
  const page = await api.fetchPageBySlug('projects');
  return <PageLayout page={page} />;
}

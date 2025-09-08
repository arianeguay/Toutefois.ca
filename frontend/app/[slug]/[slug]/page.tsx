// app/[slug].tsx
import api from '@/api';
import PageLayout from '@/layout/Page';
import { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  // Handle home page separately
  if (params.slug === 'home') {
    return {
      title: 'Toutefois - Accueil',
      description: "Page d'accueil de Toutefois",
    };
  }

  try {
    const page = await api.fetchPageBySlug(params.slug);
    const pageData = Array.isArray(page) ? page[0] : page;

    return {
      title: `Toutefois - ${pageData.title.rendered}`,
      description: pageData.excerpt.rendered
        .replace(/<[^>]*>/g, '')
        .slice(0, 160),
    };
  } catch (error) {
    return {
      title: 'Toutefois',
      description: 'Page not found',
    };
  }
}

export default async function Page({ params }: { params: { slug: string } }) {
  // Redirect home route
  if (params.slug === 'home') {
    return redirect('/');
  }

  try {
    const page = await api.fetchPageBySlug(params.slug);
    const pageData = Array.isArray(page) ? page[0] : page;

    if (!pageData?.id) {
      notFound();
    }

    return <PageLayout page={pageData} />;
  } catch (error) {
    notFound();
  }
}

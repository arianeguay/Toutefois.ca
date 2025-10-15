import api from '@/api';
import PageLayout from '@/layout/Page';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const url = `${baseUrl}/archives`;
  const title = 'Toutefois - Archives';
  const description = 'Nouvelles et articles de Toutefois';
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { url, title, description, type: 'website' },
    twitter: { card: 'summary_large_image', title, description },
  };
}

export default async function Page({
  searchParams,
}: {
  searchParams?: Record<string, string | string[] | undefined>;
}) {
  try {
    const page = await api.fetchPageBySlug('archives');
    const pageData = Array.isArray(page) ? page[0] : page;
    if (!pageData?.id) {
      notFound();
    }

    const qPageRaw = searchParams?.page ?? searchParams?.p ?? '1';
    const qPage = Array.isArray(qPageRaw) ? qPageRaw[0] : qPageRaw;
    const archivePageNumber = Math.max(1, parseInt(String(qPage || '1'), 10) || 1);

    return <PageLayout page={pageData} archivePageNumber={archivePageNumber} />;
  } catch (error) {
    notFound();
  }
}

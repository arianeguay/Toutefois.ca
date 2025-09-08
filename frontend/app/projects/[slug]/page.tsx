import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import api from '../../../src/api';
import PageLayout from '../../../src/layout/Page';

// Generate metadata dynamically based on the project
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  try {
    const project = await api.fetchProjectBySlug(params.slug);
    const projectData = Array.isArray(project) ? project[0] : project;

    return {
      title: `Toutefois - ${projectData.title}`,
      description: projectData.excerpt.replace(/<[^>]*>/g, '').slice(0, 160),
    };
  } catch (error) {
    return {
      title: 'Toutefois - Projet',
      description: 'Détails du projet',
    };
  }
}

export default async function ProjectPage({
  params,
}: {
  params: { slug: string };
}) {
  try {
    const project = await api.fetchProjectBySlug(params.slug);
    const projectData = Array.isArray(project) ? project[0] : project;

    if (!projectData) {
      notFound();
    }

    // Fetch the project image
    let image = null;
    if (
      projectData.meta._projet_image_id &&
      projectData.meta._projet_image_id[0]
    ) {
      try {
        image = await api.fetchImageById(
          parseInt(projectData.meta._projet_image_id[0]),
        );
      } catch (error) {
        console.error('Failed to fetch project image:', error);
      }
    }

    return <PageLayout page={projectData} />;
  } catch (error) {
    console.error('Error fetching project:', error);
    notFound();
  }
}

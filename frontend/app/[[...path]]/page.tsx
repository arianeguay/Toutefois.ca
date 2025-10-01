import api from '@/api';
import PageLayout from '@/layout/Page';
import { WordpressPage } from '@/types';
import console from 'console';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';

// Generate metadata for the page
export async function generateMetadata({
  params,
}: {
  params: { path?: string[] };
}): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  // Handle root path (home)
  if (!params.path || params.path.length === 0) {
    const url = `${baseUrl}/`;
    const title = 'Toutefois - Accueil';
    const description = "Page d'accueil de Toutefois";
    return {
      title,
      description,
      alternates: { canonical: url },
      openGraph: {
        url,
        title,
        description,
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
      },
    };
  }

  // Handle direct 'home' path case
  if (params.path.length === 1 && params.path[0] === 'home') {
    const url = `${baseUrl}/`;
    const title = 'Toutefois - Accueil';
    const description = "Page d'accueil de Toutefois";
    return {
      title,
      description,
      alternates: { canonical: url },
      openGraph: { url, title, description, type: 'website' },
      twitter: { card: 'summary_large_image', title, description },
    };
  }

  try {
    // Construct the slug from the path segments
    const slug = params.path.join('/');
    // Handle projects (projets/[slug])
    if (params.path.length === 2 && params.path[0] === 'projets') {
      const projectData = await api.fetchProjectBySlug(params.path[1]);
      const project: any = Array.isArray(projectData)
        ? projectData[0]
        : projectData;

      if (!project?.id) {
        const url = `${baseUrl}/projets/${params.path[1]}`;
        const title = 'Toutefois - Projet non trouvé';
        const description = "Le projet que vous cherchez n'existe pas";
        return {
          title,
          description,
          alternates: { canonical: url },
          openGraph: { url, title, description, type: 'website' },
          twitter: { card: 'summary_large_image', title, description },
        };
      }

      const description = project?.content?.rendered
        ? project.content.rendered.replace(/<[^>]*>/g, '').slice(0, 160)
        : 'Toutefois';
      const url = `${baseUrl}/projets/${project.slug}`;
      const title = `Toutefois - ${project.title?.rendered || project.title}`;
      return {
        title,
        description,
        alternates: { canonical: url },
        openGraph: { url, title, description, type: 'website' },
        twitter: { card: 'summary_large_image', title, description },
      };
    }

    // Handle posts
    if (params.path.length === 2 && params.path[0] === 'archives') {
      const postData = await api.fetchPostBySlug(params.path[1]);
      const post = Array.isArray(postData) ? postData[0] : postData;

      if (!post?.id) {
        const url = `${baseUrl}/archives/${params.path[1]}`;
        const title = 'Toutefois - Article non trouvé';
        const description = "L'article que vous cherchez n'existe pas";
        return {
          title,
          description,
          alternates: { canonical: url },
          openGraph: { url, title, description, type: 'article' },
          twitter: { card: 'summary_large_image', title, description },
        };
      }

      const description = post.excerpt
        ? post.excerpt.replace(/<[^>]*>/g, '').slice(0, 160)
        : 'Toutefois';

      const url = `${baseUrl}/archives/${post.slug}`;
      const title = `Toutefois - ${post.title.rendered}`;
      return {
        title,
        description,
        alternates: { canonical: url },
        openGraph: { url, title, description, type: 'article' },
        twitter: { card: 'summary_large_image', title, description },
      };
    }

    const page = await api.fetchPageBySlug(slug);
    const pageData = Array.isArray(page) ? page[0] : page;

    if (!pageData?.id) {
      const url = `${baseUrl}/${params.path.join('/')}`;
      const title = 'Toutefois - Page non trouvée';
      const description = "La page que vous cherchez n'existe pas";
      return {
        title,
        description,
        alternates: { canonical: url },
        openGraph: { url, title, description, type: 'website' },
        twitter: { card: 'summary_large_image', title, description },
      };
    }

    // Generate the title and description safely handling optional excerpt
    const description = pageData.excerpt?.rendered
      ? pageData.excerpt.rendered.replace(/<[^>]*>/g, '').slice(0, 160)
      : pageData.content?.rendered
        ? pageData.content.rendered.replace(/<[^>]*>/g, '').slice(0, 160)
        : 'Toutefois';

    const url = pageData.link?.startsWith('http')
      ? pageData.link
      : `${baseUrl}/${params.path.join('/')}`;
    const title = `Toutefois - ${pageData.title.rendered}`;
    return {
      title,
      description,
      alternates: { canonical: url },
      openGraph: { url, title, description, type: 'website' },
      twitter: { card: 'summary_large_image', title, description },
    };
  } catch (error) {
    const url = params?.path?.length
      ? `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/${params.path.join('/')}`
      : process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const title = 'Toutefois - Page non trouvée';
    const description = "La page que vous cherchez n'existe pas";
    return {
      title,
      description,
      alternates: { canonical: url },
      openGraph: { url, title, description, type: 'website' },
      twitter: { card: 'summary_large_image', title, description },
    };
  }
}

// Optional: Generate static params for better performance
export async function generateStaticParams() {
  try {
    // Fetch all pages
    const pages = await api.fetchPages();

    // Format for Next.js static paths
    return pages.map((page) => {
      const slugParts = page.slug.split('/');
      return {
        path: slugParts,
      };
    });
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

export default async function Page({
  params,
}: {
  params: { path?: string[] };
}) {
  const options = await api.fetchOptions();
  const donation_link = options?.donation_link;

  // Handle root path (home)
  if (!params.path || params.path.length === 0) {
    // This is the root route - render your homepage
    // Fetch homepage data or use default
    try {
      const homePage = await api.fetchPageBySlug('home');
      const homePageData = Array.isArray(homePage) ? homePage[0] : homePage;

      return <PageLayout page={homePageData} donation_link={donation_link} />;
    } catch (error) {
      console.error('Error fetching home page:', error);
      return (
        <div>
          Une erreur est survenue lors du chargement de la page d'accueil.
          Veuillez
          <br />
          <br />
          <Link href="/">revenir à la page d'accueil</Link>
        </div>
      );
    }
  }

  // Handle direct 'home' path case (redirect to root)
  if (params.path.length === 1 && params.path[0] === 'home') {
    return redirect('/');
  }

  try {
    // Construct the slug from the path segments
    const slug = params.path.join('/');

    // Special handling for project routes - matches /projets/[slug] pattern
    if (params.path.length === 2 && params.path[0] === 'projets') {
      try {
        const projectData = await api.fetchProjectBySlug(params.path[1]);
        const project = Array.isArray(projectData)
          ? projectData[0]
          : projectData;

        if (project?.id) {
          // Determine main project flag robustly from meta
          const rawIsMain =
            project?.meta?._projet_is_main ??
            project?._projet_is_main ??
            project?.toutefois_meta?._projet_is_main;
          const isMainProject =
            rawIsMain === true ||
            rawIsMain === '1' ||
            rawIsMain === 1 ||
            rawIsMain === 'true';

          console.log(project);
          // Format the project data to match WordpressPage structure expected by PageLayout
          const formattedProjectPage: WordpressPage = {
            id: project.id,
            title: project.title,
            content: project.content,
            excerpt: project.excerpt,
            link: project.slug ? `/projets/${project.slug}` : '',
            slug: project.slug || '',
            template: project.template,
            // Include all original project data for custom components to use
            meta: project.meta || {},
            thumbnail: project.featured_image_url || '',
            isMainProject,
          };

          return (
            <PageLayout
              page={formattedProjectPage as any}
              backTo="/projets"
              donation_link={donation_link}
            />
          );
        } else {
          console.warn('Project not found:', params.path[1]);
          notFound();
        }
      } catch (projectError) {
        console.error('Error fetching project:', projectError);
        notFound();
      }
    }

    // Special handling for post routes - matches /archives/[slug] pattern
    if (params.path.length === 2 && params.path[0] === 'archives') {
      try {
        const postData = await api.fetchPostBySlug(params.path[1]);
        const post = Array.isArray(postData) ? postData[0] : postData;

        if (post?.id) {
          // Format the post data to match WordpressPage structure expected by PageLayout
          const formattedPostPage = {
            id: post.id,
            title: post.title,
            content: post.content,
            excerpt: post.excerpt,
            link: `/archives/${post.slug}`,
            slug: post.slug,
            isPost: true,
          };

          return (
            <PageLayout
              page={formattedPostPage as any}
              donation_link={donation_link}
              backTo="/archives"
            />
          );
        } else {
          console.warn('Post not found:', params.path[1]);
          notFound();
        }
      } catch (postError) {
        console.error('Error fetching post:', postError);
        notFound();
      }
    }

    // Regular page handling - try multiple hierarchical path resolution strategies
    let page;
    let pageData;

    // Strategy 1: Direct full path slug
    page = await api.fetchPageBySlug(slug);
    pageData = Array.isArray(page) ? page[0] : page;

    // Strategy 2: Try various path combinations recursively if we have multiple segments
    if (!pageData?.id && params.path.length > 1) {
      // Try the last segment which is often the actual page slug in WordPress
      const lastSegment = params.path[params.path.length - 1];
      page = await api.fetchPageBySlug(lastSegment);

      const possibleMatches = Array.isArray(page)
        ? page
        : [page].filter(Boolean);

      // If multiple pages have the same last segment, we need to find the one with matching ancestors
      if (possibleMatches.length > 0) {
        const normalizedRequestPath = slug.replace(/^\/|\/$/g, '');
        const bestMatch = possibleMatches.find((p) => {
          try {
            let pagePath;
            if (p.link.startsWith('http')) {
              const url = new URL(p.link);
              pagePath = url.pathname.replace(/^\/|\/$/g, '');
            } else {
              pagePath = p.link.replace(/^\/|\/$/g, '');
            }

            // Try multiple matching strategies
            return (
              pagePath === normalizedRequestPath ||
              pagePath.endsWith(`/${normalizedRequestPath}`) ||
              normalizedRequestPath.endsWith(pagePath) ||
              (params.path && p.slug === params.path[params.path.length - 1])
            ); // Match by last segment with null check
          } catch (e) {
            console.error('Error comparing paths:', e);
            return false;
          }
        });

        if (bestMatch) {
          pageData = bestMatch;
        }
      }
    }

    // Strategy 3: If still no match and we have at least 3 segments, try looking by parent-child relationship
    if (!pageData?.id && params.path.length >= 3) {
      // Fetch all pages to analyze parent-child relationships
      const allPages = await api.fetchPages();

      // Try to find a match by iterating through possible parent-child combinations
      for (let i = params.path.length - 1; i >= 0; i--) {
        const currentSegment = params.path[i];
        const potentialPage = allPages.find((p) => p.slug === currentSegment);

        if (potentialPage) {
          // If this is the deepest child segment, we found our page
          if (i === params.path.length - 1) {
            pageData = potentialPage;
            break;
          }

          // Otherwise, verify if the hierarchy matches by checking parent IDs
          let currentPage = potentialPage;
          let hierarchyMatches = true;

          // Walk up the hierarchy to check if parent slugs match our path
          for (let j = i - 1; j >= 0; j--) {
            const parentSegment = params.path[j];
            const parentPage = allPages.find(
              (p) => p.id === currentPage.parent,
            );

            if (!parentPage || parentPage.slug !== parentSegment) {
              hierarchyMatches = false;
              break;
            }

            currentPage = parentPage;
          }

          if (hierarchyMatches) {
            pageData = potentialPage;
            break;
          }
        }
      }
    }
    if (!pageData?.id) {
      notFound();
    }

    return <PageLayout page={pageData} donation_link={donation_link} />;
  } catch (error) {
    console.error('Error fetching page:', error);
    notFound();
  }
}

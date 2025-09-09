import api from '@/api';
import PageLayout from '@/layout/Page';
import { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';

// Generate metadata for the page
export async function generateMetadata({
  params,
}: {
  params: { path?: string[] };
}): Promise<Metadata> {
  // Handle root path (home)
  if (!params.path || params.path.length === 0) {
    return {
      title: 'Toutefois - Accueil',
      description: "Page d'accueil de Toutefois",
    };
  }

  // Handle direct 'home' path case
  if (params.path.length === 1 && params.path[0] === 'home') {
    return {
      title: 'Toutefois - Accueil',
      description: "Page d'accueil de Toutefois",
    };
  }

  try {
    // Construct the slug from the path segments
    const slug = params.path.join('/');
    const page = await api.fetchPageBySlug(slug);
    const pageData = Array.isArray(page) ? page[0] : page;

    if (!pageData?.id) {
      return {
        title: 'Toutefois - Page non trouvée',
        description: "La page que vous cherchez n'existe pas",
      };
    }

    // Generate the title and description safely handling optional excerpt
    const description = pageData.excerpt?.rendered
      ? pageData.excerpt.rendered.replace(/<[^>]*>/g, '').slice(0, 160)
      : pageData.content?.rendered
        ? pageData.content.rendered.replace(/<[^>]*>/g, '').slice(0, 160)
        : 'Toutefois';

    return {
      title: `Toutefois - ${pageData.title.rendered}`,
      description,
    };
  } catch (error) {
    return {
      title: 'Toutefois - Page non trouvée',
      description: "La page que vous cherchez n'existe pas",
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
  console.log('Fetching page with params:', params);
  // Handle root path (home)
  if (!params.path || params.path.length === 0) {
    // This is the root route - render your homepage
    // Fetch homepage data or use default
    try {
      const homePage = await api.fetchPageBySlug('');
      console.log(homePage);
      const homePageData = Array.isArray(homePage) ? homePage[0] : homePage;

      return <PageLayout page={homePageData} />;
    } catch (error) {
      console.error('Error fetching home page:', error);
      return <div>Welcome to Toutefois</div>;
    }
  }

  // Handle direct 'home' path case (redirect to root)
  if (params.path.length === 1 && params.path[0] === 'home') {
    return redirect('/');
  }

  try {
    // Construct the slug from the path segments
    const slug = params.path.join('/');
    console.log('Fetching page with slug:', slug);

    // Special handling for project routes - matches /projets/[slug] pattern
    if (params.path.length === 2 && params.path[0] === 'projets') {
      console.log('Detected project route. Fetching project:', params.path[1]);
      try {
        const projectData = await api.fetchProjectBySlug(params.path[1]);
        const project = Array.isArray(projectData)
          ? projectData[0]
          : projectData;

        if (project?.id) {
          console.log('Found project:', project);

          console.log(project);
          // Format the project data to match WordpressPage structure expected by PageLayout
          const formattedProjectPage = {
            id: project.id,
            // title: {
            //   rendered: project.title || '',
            // },
            // content: {
            //   rendered: project.content || '',
            // },
            excerpt: {
              rendered: project.excerpt || '',
            },
            link: project.slug ? `/projets/${project.slug}` : '',
            slug: project.slug || '',
            // Include all original project data for custom components to use
            meta: project.meta || {},
            featured_image_url: project.featured_image_url || '',
            // Add a flag to indicate this is a project
            isProject: true,
          };

          return <PageLayout page={formattedProjectPage as any} />;
        } else {
          console.log('Project not found:', params.path[1]);
          notFound();
        }
      } catch (projectError) {
        console.error('Error fetching project:', projectError);
        notFound();
      }
    }

    // Regular page handling - try multiple hierarchical path resolution strategies
    let page;
    let pageData;

    // Strategy 1: Direct full path slug
    console.log('Strategy 1: Trying direct full slug:', slug);
    page = await api.fetchPageBySlug(slug);
    pageData = Array.isArray(page) ? page[0] : page;

    if (pageData?.id) {
      console.log('Found page with direct full slug match');
    }

    // Strategy 2: Try various path combinations recursively if we have multiple segments
    if (!pageData?.id && params.path.length > 1) {
      console.log('Strategy 2: Trying recursive path combinations');

      // Try the last segment which is often the actual page slug in WordPress
      const lastSegment = params.path[params.path.length - 1];
      console.log('Trying last segment only:', lastSegment);
      page = await api.fetchPageBySlug(lastSegment);

      const possibleMatches = Array.isArray(page)
        ? page
        : [page].filter(Boolean);
      console.log(
        `Found ${possibleMatches.length} potential pages with slug '${lastSegment}'`,
      );

      // If multiple pages have the same last segment, we need to find the one with matching ancestors
      if (possibleMatches.length > 0) {
        // Extract all page paths for comparison - handle URLs safely
        const paths = possibleMatches.map((p) => {
          try {
            // Handle both full URLs and relative paths
            let pathName;
            if (p.link.startsWith('http')) {
              const url = new URL(p.link);
              pathName = url.pathname;
            } else {
              pathName = p.link;
            }
            return pathName.replace(/^\/|\/$/g, ''); // Remove leading/trailing slashes
          } catch (e) {
            console.error('Error parsing URL:', e);
            return p.slug || '';
          }
        });
        console.log('Possible page paths:', paths);

        // Find the best match comparing full hierarchical paths
        const normalizedRequestPath = slug.replace(/^\/|\/$/g, '');
        const bestMatch = possibleMatches.find((p) => {
          try {
            // Handle both full URLs and relative paths safely
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
          console.log('Found best matching page:', bestMatch.slug);
          pageData = bestMatch;
        }
      }
    }

    // Strategy 3: If still no match and we have at least 3 segments, try looking by parent-child relationship
    if (!pageData?.id && params.path.length >= 3) {
      console.log('Strategy 3: Trying parent-child relationship lookup');

      // Fetch all pages to analyze parent-child relationships
      const allPages = await api.fetchPages();
      console.log(`Analyzing ${allPages.length} pages for hierarchy matches`);

      // Try to find a match by iterating through possible parent-child combinations
      for (let i = params.path.length - 1; i >= 0; i--) {
        const currentSegment = params.path[i];
        const potentialPage = allPages.find((p) => p.slug === currentSegment);

        if (potentialPage) {
          console.log(
            `Found potential match at segment ${i}: ${currentSegment}`,
          );

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
            console.log('Found match through parent-child hierarchy');
            pageData = potentialPage;
            break;
          }
        }
      }
    }

    console.log('Final page data:', pageData);
    if (!pageData?.id) {
      console.log('Page not found for slug:', slug);
      notFound();
    }

    return <PageLayout page={pageData} />;
  } catch (error) {
    console.error('Error fetching page:', error);
    notFound();
  }
}

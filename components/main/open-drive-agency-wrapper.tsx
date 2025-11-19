import OpenDriveAgency from "./open-drive-agency";

// Server Component wrapper that fetches data and passes it to the client component
export default async function OpenDriveAgencyWrapper() {
  let title: string | undefined;
  let subtitle: string | undefined;
  let backgroundImageUrl: string | undefined;
  let ctaText: string | undefined;
  let statsText: string | undefined;

  try {
    const baseURL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
    const apiToken = process.env.STRAPI_API_TOKEN || process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

    if (!apiToken) {
      throw new Error('Missing Strapi API token');
    }

    const response = await fetch(`${baseURL}/api/open-drive-agency?populate[0]=backgroundImage`, {
      headers: {
        'Authorization': `Bearer ${apiToken}`,
        'Content-Type': 'application/json',
      },
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(10000),
    });

    interface OpenDriveAgencyData {
      title?: string;
      subtitle?: string;
      ctaText?: string;
      statsText?: string;
      backgroundImage?: {
        data?: {
          attributes?: {
            url?: string;
          };
        };
        attributes?: {
          url?: string;
        };
        url?: string;
      };
    }

    let data: OpenDriveAgencyData | null = null;

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to fetch open-drive-agency: ${response.status} - ${errorText}`);
    }

    const result = await response.json();
    const node = result?.data;
    data = node ? (node.attributes ?? node) : null;

    if (data) {
      title = data.title;
      subtitle = data.subtitle;
      ctaText = data.ctaText;
      statsText = data.statsText;

      const bg = data.backgroundImage;
      const imgAttr = bg?.data?.attributes ?? bg; // Support both nested and direct media
      const imgUrl = imgAttr?.url;
      if (imgUrl) {
        backgroundImageUrl = imgUrl.startsWith('http') ? imgUrl : `${baseURL}${imgUrl}`;
      }
    }
  } catch (err) {
    console.error('Error fetching open-drive-agency section:', err);
  }

  return (
    <OpenDriveAgency
      backgroundImageUrl={backgroundImageUrl}
      title={title}
      subtitle={subtitle}
      ctaText={ctaText}
      statsText={statsText}
    />
  );
}



import MaximizeYourProfitability from "./maximize-your-profitability";
import { getImageUrl } from "@/lib/strapi";

export default async function MaximizeYourProfitabilityWrapper() {
  let title: string | undefined;
  let description: string | undefined;
  let imageUrl: string | undefined;

  try {
    const baseURL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
    const apiToken = process.env.STRAPI_API_TOKEN || process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

    if (!apiToken) {
      throw new Error('Missing Strapi API token');
    }

    const response = await fetch(`${baseURL}/api/maximize-your-profitability?populate[0]=image`, {
      headers: {
        'Authorization': `Bearer ${apiToken}`,
        'Content-Type': 'application/json',
      },
      next: { 
        revalidate: 3600,
        tags: ['strapi-api::maximize-your-profitability.maximize-your-profitability']
      },
      signal: AbortSignal.timeout(10000),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to fetch maximize-your-profitability: ${response.status} - ${errorText}`);
    }

    const result = await response.json();
    const node = result?.data;
    const data = node ? (node.attributes ?? node) : null;

    if (data) {
      title = data.title;
      description = data.description;

      const imageData = data.image;
      if (imageData) {
        const computedUrl = getImageUrl(imageData, baseURL);
        if (computedUrl) {
          imageUrl = computedUrl;
        }
      }
    }
  } catch (err) {
    console.error('Error fetching maximize-your-profitability section:', err);
  }

  return (
    <MaximizeYourProfitability
      title={title}
      description={description}
      imageUrl={imageUrl}
    />
  );
}


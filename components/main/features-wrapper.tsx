import Features from "./features";
import type { StrapiFeatureItem } from "./features";

// Server Component wrapper that fetches data and passes it to the client component
export default async function FeaturesWrapper() {
  let features: StrapiFeatureItem[] = [];
  let error: string | null = null;

  try {
    const baseURL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
    const response = await fetch(`${baseURL}/api/features?populate[0]=image&sort[0]=order`, {
      headers: {
        'Authorization': `Bearer ${process.env.STRAPI_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      next: { 
        revalidate: 3600, // Revalidate every hour
        tags: ['strapi-api::feature.feature'] // Tag pour revalidation à la demande
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch features: ${response.status}`);
    }

    const result = await response.json();
    features = result.data || [];
  } catch (err) {
    console.error('Error fetching features:', err);
    error = err instanceof Error ? err.message : 'Failed to load features';
  }

  return (
    <Features 
      features={features}
      error={error}
    />
  );
}









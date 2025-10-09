import { FAQ } from "@/constants/faqs";
import FAQs from "./faqs";

// Server Component wrapper that fetches data and passes it to the client component
export default async function FAQsWrapper() {
  let strapiFAQs: any[] = [];
  let error: string | null = null;

  try {
    // Fetch FAQs from Strapi API server-side
    const baseURL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
    const response = await fetch(`${baseURL}/api/faqs?sort[0]=order`, {
      headers: {
        'Authorization': `Bearer ${process.env.STRAPI_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      // Enable caching for better performance
      next: { revalidate: 7200 }, // Revalidate every 2 hours
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch FAQs: ${response.status}`);
    }

    const result = await response.json();
    strapiFAQs = result.data || [];
  } catch (err) {
    console.error('Error fetching FAQs:', err);
    error = err instanceof Error ? err.message : 'Failed to load FAQs';
    strapiFAQs = FAQ; // Fallback to static data
  }

  return (
    <FAQs 
      strapiFAQs={strapiFAQs}
      error={error}
    />
  );
}

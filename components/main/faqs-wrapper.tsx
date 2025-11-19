import { FAQ } from "@/constants/faqs";
import FAQs from "./faqs";

// Server Component wrapper that fetches data and passes it to the client component
export default async function FAQsWrapper() {
  let strapiFAQs: any[] = [];
  let error: string | null = null;

  try {
    // Fetch FAQs from Strapi API server-side (single type with repeatable components)
    const baseURL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
    const response = await fetch(`${baseURL}/api/faq?populate=*`, {
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
    // Extract the faqs array from the single type response
    // Components are returned as an array in the attributes
    const node = result?.data;
    const attributes = node ? (node.attributes ?? node) : null;
    const faqsData = attributes?.faqs || [];
    
    // Transform component format to our expected format
    // Components have id, title, content, order directly
    strapiFAQs = Array.isArray(faqsData) 
      ? faqsData
          .map((item: any) => ({
            id: item.id || item.title?.substring(0, 10) || Math.random().toString(),
            title: item.title || '',
            content: item.content || '',
            order: item.order || 0,
          }))
          .sort((a: any, b: any) => (a.order || 0) - (b.order || 0))
      : [];
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

import { FAQ } from "@/constants/faqs";
import FAQs from "./faqs";

interface FAQItem {
  id?: string | number;
  title?: string;
  content?: string;
  order?: number;
}

// Server Component wrapper that fetches data and passes it to the client component
export default async function FAQsWrapper() {
  let strapiFAQs: FAQItem[] = [];
  let error: string | null = null;
  let leftImageUrl: string | undefined;
  let rightImageUrl: string | undefined;

  try {
    // Fetch FAQs from Strapi API server-side (single type with repeatable components)
    const baseURL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
    const response = await fetch(`${baseURL}/api/faq?populate=*`, {
      headers: {
        'Authorization': `Bearer ${process.env.STRAPI_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      // Enable caching with tag for on-demand revalidation
      next: { 
        revalidate: 7200, // Revalidate every 2 hours
        tags: ['strapi-api::faq.faq'] // Tag pour revalidation à la demande
      },
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
    
    const getMediaUrl = (media: unknown): string | undefined => {
      if (!media || typeof media !== 'object') return undefined;

      let url: string | undefined;

      if ('data' in media && media.data) {
        const data = media.data as { attributes?: { url?: string }; url?: string };
        url = data.attributes?.url || data.url;
      }

      if (!url && 'attributes' in media && media.attributes) {
        const attrs = media.attributes as { url?: string };
        url = attrs.url;
      }

      if (!url && 'url' in media && typeof media.url === 'string') {
        url = media.url;
      }

      if (!url || url.trim() === '') return undefined;

      return url.startsWith('http') ? url : `${baseURL}${url}`;
    };

    leftImageUrl = getMediaUrl(attributes?.leftImage);
    rightImageUrl = getMediaUrl(attributes?.rightImage);
    
    // Transform component format to our expected format
    // Components have id, title, content, order directly
    strapiFAQs = Array.isArray(faqsData) 
      ? faqsData
          .map((item: FAQItem) => ({
            id: item.id || item.title?.substring(0, 10) || Math.random().toString(),
            title: item.title || '',
            content: item.content || '',
            order: item.order || 0,
          }))
          .sort((a, b) => (a.order || 0) - (b.order || 0))
      : [];
  } catch (err) {
    console.error('Error fetching FAQs:', err);
    error = err instanceof Error ? err.message : 'Failed to load FAQs';
    strapiFAQs = FAQ; // Fallback to static data
  }

  return (
    <FAQs 
      strapiFAQs={strapiFAQs}
      leftImageUrl={leftImageUrl}
      rightImageUrl={rightImageUrl}
      error={error}
    />
  );
}

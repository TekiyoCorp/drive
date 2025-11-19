import { TESTIMONIALS } from "@/constants/testimonials";
import OurTestimonials from "./our-testimonials";

interface TestimonialData {
  id?: number;
  attributes?: {
    name?: string;
    location?: string;
    quote?: string;
    avatar?: unknown;
  };
  name?: string;
  location?: string;
  quote?: string;
  avatar?: unknown;
}

// Server Component wrapper that fetches data and passes it to the client component
export default async function OurTestimonialsWrapper() {
  let testimonials: TestimonialData[] = [];
  let error: string | null = null;

  try {
    // Fetch testimonials from Strapi API server-side
    const baseURL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
    const response = await fetch(`${baseURL}/api/testimonials?populate[0]=avatar&sort[0]=order`, {
      headers: {
        'Authorization': `Bearer ${process.env.STRAPI_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      // Enable caching with tag for on-demand revalidation
      next: { 
        revalidate: 3600, // Revalidate every hour
        tags: ['strapi-api::testimonial.testimonial'] // Tag pour revalidation à la demande
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch testimonials: ${response.status}`);
    }

    const result = await response.json();
    testimonials = result.data || [];
  } catch (err) {
    console.error('Error fetching testimonials:', err);
    error = err instanceof Error ? err.message : 'Failed to load testimonials';
    testimonials = TESTIMONIALS; // Fallback to static data
  }

  return (
    <OurTestimonials 
      testimonials={testimonials}
      error={error}
    />
  );
}

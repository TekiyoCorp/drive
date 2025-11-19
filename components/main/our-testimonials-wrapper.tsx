import { TESTIMONIALS } from "@/constants/testimonials";
import OurTestimonials from "./our-testimonials";

// Server Component wrapper that fetches data and passes it to the client component
export default async function OurTestimonialsWrapper() {
  let testimonials: any[] = [];
  let error: string | null = null;

  try {
    // Fetch testimonials from Strapi API server-side
    const baseURL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
    const response = await fetch(`${baseURL}/api/testimonials?populate[0]=avatar&sort[0]=order`, {
      headers: {
        'Authorization': `Bearer ${process.env.STRAPI_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      // Enable caching for better performance
      next: { revalidate: 3600 }, // Revalidate every hour
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

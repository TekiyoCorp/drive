import Hero from "./hero";

interface HeroData {
  id?: number;
  attributes?: {
    title?: string;
    subtitle?: string;
    description?: string;
    backgroundImage?: unknown;
    ctaText?: string;
    ctaLink?: string;
    createdAt?: string;
    updatedAt?: string;
    publishedAt?: string;
  };
  title?: string;
  subtitle?: string;
  backgroundImage?: unknown;
  ctaText?: string;
  ctaLink?: string;
}

// Server Component wrapper that fetches data and passes it to the client component
export default async function HeroWrapper() {
  let heroData: HeroData | null = null;
  let error: string | null = null;

  try {
    // Fetch hero data from Strapi API server-side
    const baseURL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
    const apiToken = process.env.STRAPI_API_TOKEN || process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
    
    if (!apiToken) {
      throw new Error('Missing Strapi API token');
    }

    console.log('Fetching hero data from:', `${baseURL}/api/hero?populate[0]=backgroundImage`);
    
    const response = await fetch(`${baseURL}/api/hero?populate[0]=backgroundImage`, {
      headers: {
        'Authorization': `Bearer ${apiToken}`,
        'Content-Type': 'application/json',
      },
      // Enable caching for better performance
      next: { revalidate: 3600 }, // Revalidate every hour
      // Add timeout to prevent hanging requests
      signal: AbortSignal.timeout(10000), // 10 second timeout
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Strapi API Error:', response.status, errorText);
      throw new Error(`Failed to fetch hero data: ${response.status} - ${errorText}`);
    }

    const result = await response.json();
    console.log('Hero data fetched successfully:', result);
    
    if (!result.data) {
      throw new Error('No hero data found in response');
    }
    
    heroData = result.data;
  } catch (err) {
    console.error('Error fetching hero data:', err);
    error = err instanceof Error ? err.message : 'Failed to load hero data';
    
    // Enhanced fallback data with better structure
    heroData = {
      id: 1,
      attributes: {
        title: "La confiance au volant.",
        subtitle: "Simplifiez la vente ou l'achat de votre voiture premium grâce à notre réseau de courtiers certifiés.",
        description: "Découvrez notre plateforme premium pour la vente et l'achat de véhicules d'exception.",
        backgroundImage: null, // Will fallback to static image
        ctaText: "Vendre",
        ctaLink: "/vendre",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        publishedAt: new Date().toISOString(),
      }
    };
  }

  return (
    <Hero 
      heroData={heroData}
      error={error}
    />
  );
}

// Initialize Strapi client only on client side to prevent SSR issues
let strapiClient: any = null;

// Lazy load Strapi client with better error handling
const getStrapiClient = async () => {
  if (typeof window === 'undefined') {
    // Return a mock client for SSR that provides better error messages
    return {
      collection: (resource: string) => ({
        find: async (params?: any) => {
          console.warn(`SSR: Mock collection.find called for ${resource}`, params);
          return { data: [] };
        },
        findOne: async (id: any, params?: any) => {
          console.warn(`SSR: Mock collection.findOne called for ${resource}`, id, params);
          return { data: null };
        },
      }),
      single: (resource: string) => ({
        find: async (params?: any) => {
          console.warn(`SSR: Mock single.find called for ${resource}`, params);
          return { data: null };
        },
      }),
    };
  }

  if (!strapiClient) {
    try {
      const { strapi } = await import('@strapi/client');
      
      const baseURL = process.env.NEXT_PUBLIC_STRAPI_URL;
      const apiToken = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
      
      if (!baseURL) {
        throw new Error('Missing NEXT_PUBLIC_STRAPI_URL environment variable');
      }
      
      if (!apiToken) {
        throw new Error('Missing NEXT_PUBLIC_STRAPI_API_TOKEN environment variable');
      }
      
      console.log('Initializing Strapi client with baseURL:', baseURL);
      
      strapiClient = strapi({
        baseURL: `${baseURL}/api`,
        auth: apiToken,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      });
      
      console.log('Strapi client initialized successfully');
    } catch (error) {
      console.error('Failed to initialize Strapi client:', error);
      throw error;
    }
  }

  return strapiClient;
};

// Export the function for use in API layer
export { getStrapiClient };

// Type definitions for Strapi responses
export interface StrapiResponse<T> {
  data: T;
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface StrapiEntity {
  id: number;
  attributes: Record<string, any>;
}

// Vehicle types based on schema
export interface Vehicle {
  id: number;
  attributes: {
    title: string;
    subtitle: string;
    price: string;
    km: string;
    year: string;
    fuel: string;
    trans: string;
    images?: {
      data: Array<{
        id: number;
        attributes: {
          name: string;
          alternativeText?: string;
          caption?: string;
          width: number;
          height: number;
          formats: any;
          hash: string;
          ext: string;
          mime: string;
          size: number;
          url: string;
          previewUrl?: string;
          provider: string;
          provider_metadata?: any;
          createdAt: string;
          updatedAt: string;
        };
      }>;
    };
    description?: string;
    features?: any;
    specifications?: any;
    status: 'available' | 'sold' | 'reserved';
    featured: boolean;
    order: number;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
}

// Testimonial types based on schema
export interface Testimonial {
  id: number;
  attributes: {
    name: string;
    location: string;
    quote: string;
    avatar?: {
      data: {
        id: number;
        attributes: {
          name: string;
          alternativeText?: string;
          caption?: string;
          width: number;
          height: number;
          formats: any;
          hash: string;
          ext: string;
          mime: string;
          size: number;
          url: string;
          previewUrl?: string;
          provider: string;
          provider_metadata?: any;
          createdAt: string;
          updatedAt: string;
        };
      } | null;
    };
    order: number;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
}

// FAQ types based on schema
// FAQ item type (from single type JSON array)
export interface FAQ {
  id: string | number;
  title: string;
  content: string;
  order?: number;
  // Legacy support for collection type format
  attributes?: {
    question?: string;
    answer?: string;
    order?: number;
    createdAt?: string;
    updatedAt?: string;
    publishedAt?: string;
  };
}

// Hero content types
export interface Hero {
  id: number;
  attributes: {
    title: string;
    subtitle: string;
    description: string;
    backgroundImage?: {
      data: {
        id: number;
        attributes: {
          name: string;
          alternativeText?: string;
          caption?: string;
          width: number;
          height: number;
          formats: any;
          hash: string;
          ext: string;
          mime: string;
          size: number;
          url: string;
          previewUrl?: string;
          provider: string;
          provider_metadata?: any;
          createdAt: string;
          updatedAt: string;
        };
      } | null;
    };
    ctaText: string;
    ctaLink: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
}

// Global content types
export interface GlobalContent {
  id: number;
  attributes: {
    siteName: string;
    siteDescription: string;
    logo?: {
      data: {
        id: number;
        attributes: {
          name: string;
          alternativeText?: string;
          caption?: string;
          width: number;
          height: number;
          formats: any;
          hash: string;
          ext: string;
          mime: string;
          size: number;
          url: string;
          previewUrl?: string;
          provider: string;
          provider_metadata?: any;
          createdAt: string;
          updatedAt: string;
        };
      } | null;
    };
    footerText: string;
    socialLinks: any;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
}

// Header content types
export interface Header {
  id: number;
  attributes: {
    logo?: {
      data: {
        id: number;
        attributes: {
          name: string;
          alternativeText?: string;
          caption?: string;
          width: number;
          height: number;
          formats: any;
          hash: string;
          ext: string;
          mime: string;
          size: number;
          url: string;
          previewUrl?: string;
          provider: string;
          provider_metadata?: any;
          createdAt: string;
          updatedAt: string;
        };
      } | null;
    };
    logoSmall?: {
      data: {
        id: number;
        attributes: {
          name: string;
          alternativeText?: string;
          caption?: string;
          width: number;
          height: number;
          formats: any;
          hash: string;
          ext: string;
          mime: string;
          size: number;
          url: string;
          previewUrl?: string;
          provider: string;
          provider_metadata?: any;
          createdAt: string;
          updatedAt: string;
        };
      } | null;
    };
    navigationLinks?: Array<{
      id: number;
      name: string;
      link: string;
    }>;
    openAgencyButtonText?: string;
    openAgencyButtonLink?: string;
    appointmentButtonText?: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
}

// Footer content types
export interface Footer {
  id: number;
  attributes: {
    logo?: {
      data: {
        id: number;
        attributes: {
          name: string;
          alternativeText?: string;
          caption?: string;
          width: number;
          height: number;
          formats: any;
          hash: string;
          ext: string;
          mime: string;
          size: number;
          url: string;
          previewUrl?: string;
          provider: string;
          provider_metadata?: any;
          createdAt: string;
          updatedAt: string;
        };
      } | null;
    };
    navigationTitle?: string;
    navigationLinks?: Array<{
      id: number;
      name: string;
      link: string;
    }>;
    contactTitle?: string;
    contactLinks?: Array<{
      id: number;
      name: string;
      link: string;
      type?: string;
      disabled?: boolean;
    }>;
    socialTitle?: string;
    socialLinks?: Array<{
      id: number;
      platform: string;
      url: string;
    }>;
    legalTitle?: string;
    copyrightText?: string;
    tekiyoLogo?: {
      data: {
        id: number;
        attributes: {
          name: string;
          alternativeText?: string;
          caption?: string;
          width: number;
          height: number;
          formats: any;
          hash: string;
          ext: string;
          mime: string;
          size: number;
          url: string;
          previewUrl?: string;
          provider: string;
          provider_metadata?: any;
          createdAt: string;
          updatedAt: string;
        };
      } | null;
    };
    tekiyoCopyright?: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
}

// Query parameters for filtering and sorting
export interface QueryParams {
  populate?: string | string[];
  filters?: Record<string, any>;
  sort?: string | string[];
  pagination?: {
    page?: number;
    pageSize?: number;
  };
  locale?: string;
}

// Helper function to get full image URL
export const getImageUrl = (imageData: any, baseUrl?: string): string => {
  if (!imageData?.data?.attributes?.url) return '';
  
  const url = imageData.data.attributes.url;
  if (url.startsWith('http')) return url;
  
  const strapiUrl = baseUrl || process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
  return `${strapiUrl}${url}`;
};

// Helper function to get multiple image URLs
export const getImageUrls = (imagesData: any, baseUrl?: string): string[] => {
  if (!imagesData?.data || !Array.isArray(imagesData.data)) return [];
  
  return imagesData.data.map((image: any) => getImageUrl({ data: image }, baseUrl));
};

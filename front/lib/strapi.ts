import { strapi } from '@strapi/client';

// Initialize Strapi client with configuration from environment variables
export const strapiClient = strapi({
  baseURL: process.env.NEXT_PUBLIC_STRAPI_URL + '/api',
  auth: process.env.NEXT_PUBLIC_STRAPI_API_TOKEN,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

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
export interface FAQ {
  id: number;
  attributes: {
    question: string;
    answer: string;
    order: number;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
}

// Franchise types based on schema
export interface Franchise {
  id: number;
  attributes: {
    title: string;
    description: string;
    location: string;
    contact: string;
    image?: {
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

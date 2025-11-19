import { getStrapiClient, QueryParams, Vehicle, Testimonial, FAQ, Hero, GlobalContent } from './strapi';

// API functions for fetching data from Strapi

export const api = {
  // Vehicle endpoints
  vehicles: {
    async findAll(params?: QueryParams): Promise<Vehicle[]> {
      try {
        const client = await getStrapiClient();
        const response = await client.collection('vehicles').find(params);
        return response.data || [];
      } catch (error) {
        console.error('Error fetching vehicles:', error);
        throw new Error(`Failed to fetch vehicles: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    },

    async findOne(id: number, params?: QueryParams): Promise<Vehicle> {
      try {
        const client = await getStrapiClient();
        const response = await client.collection('vehicles').findOne(id, params);
        if (!response.data) {
          throw new Error(`Vehicle with id ${id} not found`);
        }
        return response.data;
      } catch (error) {
        console.error(`Error fetching vehicle ${id}:`, error);
        throw new Error(`Failed to fetch vehicle: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    },

    async findFeatured(params?: QueryParams): Promise<Vehicle[]> {
      try {
        const client = await getStrapiClient();
        const featuredParams = {
          ...params,
          filters: {
            ...params?.filters,
            featured: { $eq: true },
          },
        };
        const response = await client.collection('vehicles').find(featuredParams);
        return response.data || [];
      } catch (error) {
        console.error('Error fetching featured vehicles:', error);
        throw new Error(`Failed to fetch featured vehicles: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    },

    async findByStatus(status: 'available' | 'sold' | 'reserved', params?: QueryParams): Promise<Vehicle[]> {
      try {
        const client = await getStrapiClient();
        const statusParams = {
          ...params,
          filters: {
            ...params?.filters,
            status: { $eq: status },
          },
        };
        const response = await client.collection('vehicles').find(statusParams);
        return response.data || [];
      } catch (error) {
        console.error(`Error fetching vehicles with status ${status}:`, error);
        throw new Error(`Failed to fetch vehicles: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    },
  },

  // Testimonial endpoints
  testimonials: {
    async findAll(params?: QueryParams): Promise<Testimonial[]> {
      try {
        const client = await getStrapiClient();
        const response = await client.collection('testimonials').find(params);
        return response.data || [];
      } catch (error) {
        console.error('Error fetching testimonials:', error);
        throw new Error(`Failed to fetch testimonials: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    },

    async findOne(id: number, params?: QueryParams): Promise<Testimonial> {
      try {
        const client = await getStrapiClient();
        const response = await client.collection('testimonials').findOne(id, params);
        if (!response.data) {
          throw new Error(`Testimonial with id ${id} not found`);
        }
        return response.data;
      } catch (error) {
        console.error(`Error fetching testimonial ${id}:`, error);
        throw new Error(`Failed to fetch testimonial: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    },
  },

  // FAQ endpoints (single type)
  faqs: {
    async findAll(params?: QueryParams): Promise<FAQ[]> {
      try {
        const client = await getStrapiClient();
        // Populate components for single type
        const populateParams = {
          ...params,
          populate: '*',
        };
        const response = await client.single('faq').find(populateParams);
        if (!response.data) {
          throw new Error('FAQ content not found');
        }
        // Extract the faqs array from the single type response
        const attributes = response.data.attributes || response.data;
        const faqsArray = attributes.faqs || [];
        // Transform component format to our expected format
        interface FAQItem {
          id?: string | number;
          title?: string;
          content?: string;
          order?: number;
        }
        
        const transformedFAQs = Array.isArray(faqsArray)
          ? faqsArray.map((item: FAQItem) => ({
              id: item.id || item.title?.substring(0, 10) || Math.random().toString(),
              title: item.title || '',
              content: item.content || '',
              order: item.order || 0,
            }))
          : [];
        // Sort by order if order field exists
        return transformedFAQs.sort((a, b) => (a.order || 0) - (b.order || 0));
      } catch (error) {
        console.error('Error fetching FAQs:', error);
        throw new Error(`Failed to fetch FAQs: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    },
  },

  // Hero content endpoints
  hero: {
    async find(params?: QueryParams): Promise<Hero> {
      try {
        const client = await getStrapiClient();
        const response = await client.single('hero').find(params);
        if (!response.data) {
          throw new Error('Hero content not found');
        }
        return response.data;
      } catch (error) {
        console.error('Error fetching hero content:', error);
        throw new Error(`Failed to fetch hero content: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    },
  },

  // Global content endpoints
  globalContent: {
    async find(params?: QueryParams): Promise<GlobalContent> {
      try {
        const client = await getStrapiClient();
        const response = await client.single('global-content').find(params);
        if (!response.data) {
          throw new Error('Global content not found');
        }
        return response.data;
      } catch (error) {
        console.error('Error fetching global content:', error);
        throw new Error(`Failed to fetch global content: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    },
  },
};

// Default query parameters for common use cases
export const defaultQueries = {
  // Populate all relations
  populateAll: {
    populate: '*',
  },

  // Populate only images
  populateImages: {
    populate: ['images', 'avatar', 'backgroundImage', 'logo'],
  },

  // Sort by order ascending
  sortByOrder: {
    sort: ['order:asc'],
  },

  // Sort by creation date descending
  sortByNewest: {
    sort: ['createdAt:desc'],
  },

  // Sort by creation date ascending
  sortByOldest: {
    sort: ['createdAt:asc'],
  },

  // Only published content
  publishedOnly: {
    filters: {
      publishedAt: { $notNull: true },
    },
  },

  // Pagination helpers
  pagination: {
    small: { pagination: { pageSize: 6 } },
    medium: { pagination: { pageSize: 12 } },
    large: { pagination: { pageSize: 24 } },
  },
};

// Combined query helpers
export const queryHelpers = {
  // Get featured vehicles with images
  featuredVehicles: {
    ...defaultQueries.populateImages,
    ...defaultQueries.sortByOrder,
    ...defaultQueries.publishedOnly,
    filters: {
      featured: { $eq: true },
      status: { $eq: 'available' },
    },
  },

  // Get available vehicles with pagination
  availableVehicles: (pageSize = 12) => ({
    ...defaultQueries.populateImages,
    ...defaultQueries.sortByNewest,
    ...defaultQueries.publishedOnly,
    filters: {
      status: { $eq: 'available' },
    },
    pagination: { pageSize },
  }),

  // Get testimonials with avatars
  testimonialsWithAvatars: {
    ...defaultQueries.populateImages,
    ...defaultQueries.sortByOrder,
    ...defaultQueries.publishedOnly,
  },

  // Get FAQs (single type, already sorted by order in the response)
  faqsOrdered: {
    ...defaultQueries.publishedOnly,
  },
};

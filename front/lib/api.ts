import { strapiClient, QueryParams, Vehicle, Testimonial, FAQ, Franchise, Hero, GlobalContent } from './strapi';

// API functions for fetching data from Strapi

export const api = {
  // Vehicle endpoints
  vehicles: {
    async findAll(params?: QueryParams): Promise<Vehicle[]> {
      const response = await strapiClient.collection('vehicles').find(params);
      return response.data;
    },

    async findOne(id: number, params?: QueryParams): Promise<Vehicle> {
      const response = await strapiClient.collection('vehicles').findOne(id, params);
      return response.data;
    },

    async findFeatured(params?: QueryParams): Promise<Vehicle[]> {
      const featuredParams = {
        ...params,
        filters: {
          ...params?.filters,
          featured: { $eq: true },
        },
      };
      const response = await strapiClient.collection('vehicles').find(featuredParams);
      return response.data;
    },

    async findByStatus(status: 'available' | 'sold' | 'reserved', params?: QueryParams): Promise<Vehicle[]> {
      const statusParams = {
        ...params,
        filters: {
          ...params?.filters,
          status: { $eq: status },
        },
      };
      const response = await strapiClient.collection('vehicles').find(statusParams);
      return response.data;
    },
  },

  // Testimonial endpoints
  testimonials: {
    async findAll(params?: QueryParams): Promise<Testimonial[]> {
      const response = await strapiClient.collection('testimonials').find(params);
      return response.data;
    },

    async findOne(id: number, params?: QueryParams): Promise<Testimonial> {
      const response = await strapiClient.collection('testimonials').findOne(id, params);
      return response.data;
    },
  },

  // FAQ endpoints
  faqs: {
    async findAll(params?: QueryParams): Promise<FAQ[]> {
      const response = await strapiClient.collection('faqs').find(params);
      return response.data;
    },

    async findOne(id: number, params?: QueryParams): Promise<FAQ> {
      const response = await strapiClient.collection('faqs').findOne(id, params);
      return response.data;
    },
  },

  // Franchise endpoints
  franchises: {
    async findAll(params?: QueryParams): Promise<Franchise[]> {
      const response = await strapiClient.collection('franchises').find(params);
      return response.data;
    },

    async findOne(id: number, params?: QueryParams): Promise<Franchise> {
      const response = await strapiClient.collection('franchises').findOne(id, params);
      return response.data;
    },
  },

  // Hero content endpoints
  hero: {
    async find(params?: QueryParams): Promise<Hero> {
      const response = await strapiClient.single('hero').find(params);
      return response.data;
    },
  },

  // Global content endpoints
  globalContent: {
    async find(params?: QueryParams): Promise<GlobalContent> {
      const response = await strapiClient.single('global-content').find(params);
      return response.data;
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

  // Get FAQs sorted by order
  faqsOrdered: {
    ...defaultQueries.sortByOrder,
    ...defaultQueries.publishedOnly,
  },

  // Get franchises with images
  franchisesWithImages: {
    ...defaultQueries.populateImages,
    ...defaultQueries.sortByOrder,
    ...defaultQueries.publishedOnly,
  },
};

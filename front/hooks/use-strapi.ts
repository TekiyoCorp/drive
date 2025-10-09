'use client';

import { useState, useEffect, useCallback } from 'react';
import { api, queryHelpers } from '@/lib/api';
import { Vehicle, Testimonial, FAQ, Franchise, Hero, GlobalContent, QueryParams } from '@/lib/strapi';

// Generic hook for fetching Strapi data
export function useStrapiData<T>(
  fetchFn: (params?: QueryParams) => Promise<T>,
  params?: QueryParams,
  dependencies: any[] = []
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await fetchFn(params);
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Strapi fetch error:', err);
    } finally {
      setLoading(false);
    }
  }, [fetchFn, params, ...dependencies]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}

// Specific hooks for different content types

// Vehicles hooks
export function useVehicles(params?: QueryParams) {
  return useStrapiData(api.vehicles.findAll, params);
}

export function useVehicle(id: number, params?: QueryParams) {
  return useStrapiData(() => api.vehicles.findOne(id, params), undefined, [id]);
}

export function useFeaturedVehicles() {
  return useStrapiData(() => api.vehicles.findFeatured(queryHelpers.featuredVehicles));
}

export function useAvailableVehicles(pageSize = 12) {
  return useStrapiData(() => api.vehicles.findByStatus('available', queryHelpers.availableVehicles(pageSize)), undefined, [pageSize]);
}

// Testimonials hooks
export function useTestimonials(params?: QueryParams) {
  return useStrapiData(api.testimonials.findAll, params);
}

export function useTestimonialsWithAvatars() {
  return useStrapiData(() => api.testimonials.findAll(queryHelpers.testimonialsWithAvatars));
}

export function useTestimonial(id: number, params?: QueryParams) {
  return useStrapiData(() => api.testimonials.findOne(id, params), undefined, [id]);
}

// FAQs hooks
export function useFAQs(params?: QueryParams) {
  return useStrapiData(api.faqs.findAll, params);
}

export function useFAQsOrdered() {
  return useStrapiData(() => api.faqs.findAll(queryHelpers.faqsOrdered));
}

export function useFAQ(id: number, params?: QueryParams) {
  return useStrapiData(() => api.faqs.findOne(id, params), undefined, [id]);
}

// Franchises hooks
export function useFranchises(params?: QueryParams) {
  return useStrapiData(api.franchises.findAll, params);
}

export function useFranchisesWithImages() {
  return useStrapiData(() => api.franchises.findAll(queryHelpers.franchisesWithImages));
}

export function useFranchise(id: number, params?: QueryParams) {
  return useStrapiData(() => api.franchises.findOne(id, params), undefined, [id]);
}

// Hero content hooks
export function useHero(params?: QueryParams) {
  return useStrapiData(api.hero.find, params);
}

// Global content hooks
export function useGlobalContent(params?: QueryParams) {
  return useStrapiData(api.globalContent.find, params);
}

// Hook for multiple data fetching
export function useMultipleStrapiData<T extends Record<string, any>>(
  fetchFunctions: T
): {
  data: { [K in keyof T]: T[K] extends (...args: any[]) => Promise<infer R> ? R | null : never };
  loading: { [K in keyof T]: boolean };
  error: { [K in keyof T]: string | null };
  refetch: () => void;
} {
  const keys = Object.keys(fetchFunctions) as (keyof T)[];
  
  const [data, setData] = useState<{ [K in keyof T]: T[K] extends (...args: any[]) => Promise<infer R> ? R | null : never }>(() => {
    const initialData = {} as any;
    keys.forEach(key => {
      initialData[key] = null;
    });
    return initialData;
  });
  
  const [loading, setLoading] = useState<{ [K in keyof T]: boolean }>(() => {
    const initialLoading = {} as any;
    keys.forEach(key => {
      initialLoading[key] = true;
    });
    return initialLoading;
  });
  
  const [error, setError] = useState<{ [K in keyof T]: string | null }>(() => {
    const initialError = {} as any;
    keys.forEach(key => {
      initialError[key] = null;
    });
    return initialError;
  });

  const fetchAllData = useCallback(async () => {
    const promises = keys.map(async (key) => {
      try {
        setLoading(prev => ({ ...prev, [key]: true }));
        setError(prev => ({ ...prev, [key]: null }));
        
        const result = await (fetchFunctions[key] as any)();
        
        setData(prev => ({ ...prev, [key]: result }));
        setLoading(prev => ({ ...prev, [key]: false }));
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'An error occurred';
        setError(prev => ({ ...prev, [key]: errorMessage }));
        setLoading(prev => ({ ...prev, [key]: false }));
        console.error(`Strapi fetch error for ${String(key)}:`, err);
      }
    });

    await Promise.all(promises);
  }, [fetchFunctions]);

  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

  return { data, loading, error, refetch: fetchAllData };
}

// Hook for homepage data
export function useHomepageData() {
  return useMultipleStrapiData({
    hero: () => api.hero.find({ populate: ['backgroundImage'] }),
    featuredVehicles: () => api.vehicles.findFeatured(queryHelpers.featuredVehicles),
    testimonials: () => api.testimonials.findAll(queryHelpers.testimonialsWithAvatars),
    globalContent: () => api.globalContent.find({ populate: ['logo'] }),
  });
}

// Hook for catalog page data
export function useCatalogData(pageSize = 12) {
  return useMultipleStrapiData({
    vehicles: () => api.vehicles.findByStatus('available', queryHelpers.availableVehicles(pageSize)),
    featuredVehicles: () => api.vehicles.findFeatured(queryHelpers.featuredVehicles),
  });
}

// Hook for franchise page data
export function useFranchisePageData() {
  return useMultipleStrapiData({
    franchises: () => api.franchises.findAll(queryHelpers.franchisesWithImages),
    hero: () => api.hero.find({ populate: ['backgroundImage'] }),
  });
}

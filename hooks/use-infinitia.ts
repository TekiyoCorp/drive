'use client';

import { useCallback, useState } from 'react';
import { fetchInfinitiaVehicles, InfinitiaVehiclesResponse, FetchInfinitiaVehiclesOptions } from '@/lib/infinitia';

export function useInfinitiaVehicles(agencyId: number, options: Omit<FetchInfinitiaVehiclesOptions, 'revalidateSeconds'> = {}) {
  const [data, setData] = useState<InfinitiaVehiclesResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refetch = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await fetchInfinitiaVehicles(agencyId, options);
      setData(result);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch vehicles';
      setError(message);
      // eslint-disable-next-line no-console
      console.error('Infinitia vehicles fetch error:', err);
    } finally {
      setLoading(false);
    }
  }, [agencyId, JSON.stringify(options)]);

  return { data, loading, error, refetch };
}



"use client";

import { useState, useEffect, useCallback } from "react";
import { IS_DEMO } from "@/lib/demo";
import { fetcher } from "@/lib/fetcher";

interface UseDataOptions<T> {
  /** Mock data to use when DEMO_MODE is on */
  mockData: T;
  /** API endpoint to fetch from when DEMO_MODE is off */
  apiUrl: string;
  /** Whether to fetch immediately on mount (default: true) */
  immediate?: boolean;
}

interface UseDataResult<T> {
  data: T;
  loading: boolean;
  error: string | null;
  isDemo: boolean;
  refetch: () => Promise<void>;
}

/**
 * Hook that returns mock data in demo mode, or fetches from API in real mode.
 * Demo mode is completely safe — returns mock data synchronously, no API calls.
 */
export function useData<T>({
  mockData,
  apiUrl,
  immediate = true,
}: UseDataOptions<T>): UseDataResult<T> {
  const [data, setData] = useState<T>(mockData);
  const [loading, setLoading] = useState(!IS_DEMO);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (IS_DEMO) return;

    setLoading(true);
    setError(null);
    try {
      const result = await fetcher<T>(apiUrl);
      setData(result);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to fetch data");
      // Keep mock data as fallback on error
      setData(mockData);
    } finally {
      setLoading(false);
    }
  }, [apiUrl, mockData]);

  useEffect(() => {
    if (immediate && !IS_DEMO) {
      fetchData();
    }
  }, [immediate, fetchData]);

  return {
    data,
    loading,
    error,
    isDemo: IS_DEMO,
    refetch: fetchData,
  };
}

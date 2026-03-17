"use client";

import { useState, useCallback } from "react";
import { IS_DEMO } from "@/lib/demo";
import { fetcher } from "@/lib/fetcher";

interface UseMutationOptions<TInput, TOutput> {
  /** API endpoint */
  apiUrl: string;
  /** HTTP method (default: POST) */
  method?: "POST" | "PUT" | "PATCH" | "DELETE";
  /** Mock response to return in demo mode */
  mockResponse?: TOutput;
  /** Called on success */
  onSuccess?: (data: TOutput) => void;
  /** Called on error */
  onError?: (error: string) => void;
}

interface UseMutationResult<TInput, TOutput> {
  mutate: (input: TInput) => Promise<TOutput | null>;
  loading: boolean;
  error: string | null;
  isDemo: boolean;
}

export function useMutation<TInput = unknown, TOutput = unknown>({
  apiUrl,
  method = "POST",
  mockResponse,
  onSuccess,
  onError,
}: UseMutationOptions<TInput, TOutput>): UseMutationResult<TInput, TOutput> {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mutate = useCallback(
    async (input: TInput): Promise<TOutput | null> => {
      if (IS_DEMO) {
        const result = (mockResponse ?? null) as TOutput | null;
        if (result && onSuccess) onSuccess(result);
        return result;
      }

      setLoading(true);
      setError(null);
      try {
        const result = await fetcher<TOutput>(apiUrl, {
          method,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(input),
        });
        onSuccess?.(result);
        return result;
      } catch (e) {
        const msg = e instanceof Error ? e.message : "Request failed";
        setError(msg);
        onError?.(msg);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [apiUrl, method, mockResponse, onSuccess, onError],
  );

  return { mutate, loading, error, isDemo: IS_DEMO };
}

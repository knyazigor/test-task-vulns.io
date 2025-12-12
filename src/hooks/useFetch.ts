import { useState, useCallback, useRef } from "react";

export interface UseFetchOptions extends RequestInit {
  headers?: Record<string, string>;
}

export interface UseFetchResult<TData = unknown> {
  data: TData | null;
  loading: boolean;
  error: string | null;
  fetchData: <TResponse extends TData = TData>(
    url: string,
    options?: UseFetchOptions
  ) => Promise<TResponse | undefined>;
  abort: () => void;
}

export function useFetch<TData = unknown>(): UseFetchResult<TData> {
  const [data, setData] = useState<TData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const controllerRef = useRef<AbortController | null>(null);

  const fetchData = useCallback(
    async <TResponse extends TData = TData>(
      url: string,
      options: UseFetchOptions = {}
    ): Promise<TResponse | undefined> => {
      if (controllerRef.current) {
        controllerRef.current.abort();
      }

      const controller = new AbortController();
      controllerRef.current = controller;

      setLoading(true);
      setError(null);

      try {
        const response = await fetch(url, {
          ...options,
          signal: controller.signal,
          headers: {
            "Content-Type": "application/json",
            ...options.headers,
          },
        });

        if (!response.ok) {
          const errorText = await response.text().catch(() => "Unknown error");
          throw new Error(`HTTP ${response.status}: ${errorText}`);
        }

        const result: TResponse = await response.json();
        setData(result);
        return result;
      } catch (err) {
        if (err instanceof Error) {
          if (err.name !== "AbortError") {
            const errorMessage = err.message || "Something went wrong";
            setError(errorMessage);
            console.error("Fetch error:", err);
          }
        } else {
          setError("An unknown error occurred");
          console.error("Fetch error:", err);
        }
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const abort = useCallback(() => {
    if (controllerRef.current) {
      controllerRef.current.abort();
      controllerRef.current = null;
    }
  }, []);

  return { data, loading, error, fetchData, abort };
}

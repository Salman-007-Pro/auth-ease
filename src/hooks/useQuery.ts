import cacheService from '@/utilities/services/cache.service';
import { useCallback, useEffect, useState } from 'react';

/**
 * Options for configuring the useQuery hook
 * @template T The type of data being fetched
 */
type UseQueryOptions<T> = {
    /** Time-to-live for cache in milliseconds */
    ttl?: number;
    /** Whether the query should execute automatically */
    enabled?: boolean;
    /** Whether to refetch data when component mounts */
    refetchOnMount?: boolean;
    /** Callback fired on successful data fetch */
    onSuccess?: (data: T) => void;
    /** Callback fired when an error occurs */
    onError?: (error: string) => void;
    /** Callback fired after query completes (success or error) */
    onSettled?: (data: T | null, error: string | null) => void;
};

/**
 * Result object returned by useQuery hook
 * @template T The type of data being fetched
 */
type UseQueryResult<T> = {
    /** The fetched data or null if not yet loaded */
    data: T | null;
    /** Error message if query failed, null otherwise */
    error: string | null;
    /** Whether the initial data fetch is in progress */
    isLoading: boolean;
    /** Whether a manual refetch is in progress */
    isRefetching: boolean;
    /** Function to manually trigger a refetch */
    refetch: () => Promise<void>;
};

/**
 * Builds a cache key from an array of values
 * @param keyArray Array of values to build key from
 * @returns String key for caching
 */
const buildKey = (keyArray: any[]): string => {
    return keyArray.map((part) => (typeof part === 'string' ? part : JSON.stringify(part))).join('__');
};

/**
 * Custom hook for data fetching with caching support
 * @template T The type of data being fetched
 * @param key Array of values that uniquely identify this query
 * @param fetchFn Function that returns a promise resolving to the data
 * @param options Configuration options for the query
 * @returns Query result object containing data, loading states and refetch function
 */
export function useQuery<T>(
    key: any[],
    fetchFn: () => Promise<T>,
    options: UseQueryOptions<T> = {},
): UseQueryResult<T> {
    const { ttl, enabled = true, refetchOnMount = false, onSuccess, onError, onSettled } = options;

    const cacheKey = buildKey(key);
    const [data, setData] = useState<T | null>(cacheService.getCachedData(cacheKey));
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isRefetching, setIsRefetching] = useState<boolean>(false);

    const loadData = useCallback(
        async (forceRefresh = false) => {
            if (forceRefresh) {
                setIsRefetching(true);
            }
            setError(null);

            try {
                const cachedData = cacheService.getCachedData(cacheKey);
                if (cachedData) {
                    setData(cachedData);

                    // If there is cached data, and we are not forcing a refresh, call the onSuccess callback
                    if (!forceRefresh) {
                        onSuccess?.(cachedData);
                        onSettled?.(cachedData, null);
                        return;
                    }
                }

                // If there is no cached data, set the loading state
                if (!cachedData) {
                    setIsLoading(true);
                }

                const result = await fetchFn();
                setData(result);
                cacheService.setCachedData(cacheKey, result, ttl);
                onSuccess?.(result);
                onSettled?.(result, null);
            } catch (err: unknown) {
                const message = err instanceof Error ? err.message : 'Unknown error';
                console.log(message);
                setError(message);
                onError?.(message);
                onSettled?.(null, message);
            } finally {
                setIsLoading(false);
                setIsRefetching(false);
            }
        },
        [cacheKey, fetchFn, ttl, onSuccess, onError, onSettled],
    );

    useEffect(() => {
        if (enabled) {
            loadData(refetchOnMount);
        }
    }, [enabled, cacheKey, refetchOnMount]);

    const refetch = async () => {
        cacheService.invalidateCache(cacheKey);
        await loadData(true);
    };

    return { data, error, isLoading, isRefetching, refetch };
}

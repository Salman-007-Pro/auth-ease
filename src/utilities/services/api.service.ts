import { API_URL } from '@/constants';

import utilService from './utils.service';

/**
 * Default timeout in milliseconds for API requests
 */
const TIMEOUT = 10000; // 10 seconds

/**
 * Default number of retry attempts for failed requests
 */
const DEFAULT_RETRIES = 1;

/**
 * Type definition for HTTP request options
 */
export type RequestOptions = {
    method: string;
    headers?: Record<string, string>;
    body?: string;
    signal?: AbortSignal;
};

/**
 * API service module providing HTTP request methods with retry functionality
 */
const apiService = (() => {
    /**
     * Base URL for the API endpoints
     */
    const BASE_URL = API_URL.BASE_URL;

    /**
     * Performs a fetch request with timeout and retry capabilities
     * @param url - The URL to fetch from
     * @param options - Request options (method, headers, body etc)
     * @param timeout - Timeout duration in milliseconds
     * @param maxRetries - Maximum number of retry attempts
     * @param retryDelay - Delay between retries in milliseconds
     * @returns Promise resolving to JSON or text response
     * @throws Error if request fails after all retries
     */
    async function fetchWithTimeout(
        url: string,
        options: RequestOptions = { method: 'GET' },
        timeout = TIMEOUT,
        maxRetries = DEFAULT_RETRIES,
        retryDelay = 500,
    ): Promise<any> {
        let attempts = 0;

        while (attempts <= maxRetries) {
            const localController = new AbortController();
            const id = setTimeout(() => localController.abort(), timeout);

            try {
                const response = await fetch(url, {
                    ...options,
                    signal: localController.signal,
                });

                clearTimeout(id);

                if (!response.ok) {
                    const errorText = await response.text().catch(() => '');
                    throw new Error(`Error ${response.status}: ${response.statusText}\n${errorText}`);
                }

                const contentType = response.headers.get('content-type');
                return contentType?.includes('application/json') ? await response.json() : await response.text();
            } catch (err: any) {
                clearTimeout(id);
                attempts += 1;

                const isLastAttempt = attempts > maxRetries;

                if (err.name === 'AbortError') {
                    if (isLastAttempt) throw new Error('Request timed out.');
                } else if (isLastAttempt) {
                    throw new Error(err.message || 'Unknown error occurred.');
                }

                // Optional delay between retries
                await utilService.delay(retryDelay);
            }
        }
    }

    /**
     * Performs a GET request
     * @param endpoint - API endpoint path
     * @param queryParams - Optional query parameters
     * @param retries - Number of retry attempts
     * @returns Promise resolving to the response data
     */
    function GET(endpoint: string, queryParams?: Record<string, string | number>, retries = DEFAULT_RETRIES) {
        let url = `${BASE_URL}/${endpoint}`;
        console.log(url);
        if (queryParams) {
            const queryString = new URLSearchParams(queryParams as any).toString();
            url += `?${queryString}`;
        }
        return fetchWithTimeout(url, { method: 'GET' }, TIMEOUT, retries);
    }

    /**
     * Performs a POST request
     * @param endpoint - API endpoint path
     * @param body - Request body data
     * @param retries - Number of retry attempts
     * @returns Promise resolving to the response data
     */
    function POST(endpoint: string, body: any, retries = DEFAULT_RETRIES) {
        const url = `${BASE_URL}/${endpoint}`;
        return fetchWithTimeout(
            url,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            },
            TIMEOUT,
            retries,
        );
    }

    /**
     * Performs a PATCH request
     * @param endpoint - API endpoint path
     * @param body - Request body data
     * @param retries - Number of retry attempts
     * @returns Promise resolving to the response data
     */
    function PATCH(endpoint: string, body: any, retries = DEFAULT_RETRIES) {
        const url = `${BASE_URL}/${endpoint}`;
        return fetchWithTimeout(
            url,
            {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            },
            TIMEOUT,
            retries,
        );
    }

    /**
     * Performs a PUT request
     * @param endpoint - API endpoint path
     * @param body - Request body data
     * @param retries - Number of retry attempts
     * @returns Promise resolving to the response data
     */
    function PUT(endpoint: string, body: any, retries = DEFAULT_RETRIES) {
        const url = `${BASE_URL}/${endpoint}`;
        return fetchWithTimeout(
            url,
            {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            },
            TIMEOUT,
            retries,
        );
    }

    /**
     * Performs a DELETE request
     * @param endpoint - API endpoint path
     * @param retries - Number of retry attempts
     * @returns Promise resolving to the response data
     */
    function DELETE(endpoint: string, retries = DEFAULT_RETRIES) {
        const url = `${BASE_URL}/${endpoint}`;
        return fetchWithTimeout(url, { method: 'DELETE' }, TIMEOUT, retries);
    }

    return {
        fetchWithTimeout,
        GET,
        POST,
        PATCH,
        PUT,
        DELETE,
    };
})();

export default apiService;

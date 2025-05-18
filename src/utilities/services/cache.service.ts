
import storageService from "./storage.service";
import toastService from "./toast.service";

/** Prefix used for cache keys */
export const CACHE_PREFIX = 'CACHE_';

/** Default time-to-live for cached items in milliseconds (5 minutes) */
export const DEFAULT_TTL = 5 * 60 * 1000;

/** 
 * Structure for cached data entries
 * @property {any} data - The cached data
 * @property {number} expiry - Timestamp when the cache entry expires
 */
export type CacheEntry = {
  data: any;
  expiry: number;
};

const cacheService = (() => {    
    // Get storage service functions
    const { getItem, removeKey, setItem, getAllKeys } = storageService;

     /**
     * Creates a cache key by adding prefix
     * @param {string} key - Original key
     * @returns {string} Prefixed cache key
     */
     const makeKey = (key: string) => `${CACHE_PREFIX}_${key}`;

      /**
     * Retrieves cached data if not expired
     * @param {string} key - Cache key
     * @returns {any | null} Cached data if valid, null if expired or not found
     */
      function getCachedData(key: string): any | null {
        try {
            const raw = getItem(makeKey(key));
            if (!raw) return null;
        
            const parsed: CacheEntry = JSON.parse(raw);
            const now = Date.now();
        
            if (now < parsed.expiry) return parsed.data;
        
            // Expired
            removeKey(makeKey(key));
            return null;
        } catch (err) {
            console.error('MMKV get error:', err);
            toastService.error('Error getting cached data');
            return null;
        }
    }
    
    /**
     * Stores data in cache with expiration
     * @param {string} key - Cache key
     * @param {any} data - Data to cache
     * @param {number} ttl - Time to live in milliseconds
     */
    function setCachedData(key: string, data: any, ttl = DEFAULT_TTL) {
        const entry: CacheEntry = {
            data,
            expiry: Date.now() + ttl,
        };
    
        try {
            setItem(makeKey(key), JSON.stringify(entry));
        } catch (err) {
            console.error('MMKV set error:', err);
            toastService.error('Error setting cached data');
        }
    }
    
    /**
     * Removes a specific cache entry
     * @param {string} key - Cache key to invalidate
     */
    function invalidateCache(key: string) {
        try {
            removeKey(makeKey(key));
        } catch (err) {
            console.error('MMKV delete error:', err);
            toastService.error('Error invalidating cache');
        }
    }
    
    /**
     * Removes all cached entries
     */
    function clearAllCache():void {
        try {
            const keys = getAllKeys();
            keys.forEach(key => {
                if (key.startsWith(CACHE_PREFIX)) removeKey(key);
            });
        } catch (err) {
            console.error('MMKV clear error:', err);
            toastService.error('Error clearing cache');
        }
    }

    return {
        getCachedData,
        setCachedData,
        invalidateCache,
        clearAllCache
    };
})();


export default cacheService;

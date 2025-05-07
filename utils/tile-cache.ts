/**
 * TileCacheManager - Utility for managing tile image caching
 * Provides mechanisms to control when map tiles are refreshed
 */

/**
 * Manager for controlling tile cache behavior
 */
export const TileCacheManager = {
  timestamp: Date.now(),
  // Use a shorter representation for efficiency
  cacheKey: Math.floor(Date.now() / 1000).toString(36),
  
  /**
   * Reset the cache timestamp to force fresh tile loading
   * @param useDate - Whether to use a full date (true) or a compact timestamp (false)
   * @returns The new cache key
   */
  resetCache: (useDate: boolean = false): string => {
    TileCacheManager.timestamp = Date.now();
    // Generate a more compact cache key using base36 encoding
    TileCacheManager.cacheKey = useDate 
      ? TileCacheManager.timestamp.toString() 
      : Math.floor(Date.now() / 1000).toString(36);
    return TileCacheManager.cacheKey;
  },
  
  /**
   * Get the current cache key
   * @param useDate - Whether to return a full date (true) or a compact timestamp (false)
   * @returns The current cache key
   */
  getCacheKey: (useDate: boolean = false): string => {
    return useDate ? TileCacheManager.timestamp.toString() : TileCacheManager.cacheKey;
  }
};

/**
 * Create a cache-busting URL by appending a cache key parameter
 * @param baseUrl - The base URL template
 * @param cacheKey - The cache key to append
 * @returns A URL with cache-busting parameter
 */
export const createCacheBustingUrl = (baseUrl: string, cacheKey: string): string => {
  return `${baseUrl}?v=${cacheKey}`;
};

export default TileCacheManager;
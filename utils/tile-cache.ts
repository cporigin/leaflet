import dayjs from 'dayjs';

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
  cacheKey: dayjs().format('YYMMDDHHmm'),
  
  /**
   * Reset the cache timestamp to force fresh tile loading
   * @param useDate - Whether to use a full date (true) or a compact timestamp (false)
   * @returns The new cache key
   */
  resetCache: (): string => {
    TileCacheManager.timestamp = Date.now();
    TileCacheManager.cacheKey = dayjs(TileCacheManager.timestamp).format('YYMMDDHHmm');
    return TileCacheManager.cacheKey;
  },
  
  /**
   * Get the current cache key
   * @param useDate - Whether to return a full date (true) or a compact timestamp (false)
   * @returns The current cache key
   */
  getCacheKey: (useDate: boolean = false): string => {
    return useDate
      ? dayjs(TileCacheManager.timestamp).format('YYMMDDHHmm')
      : TileCacheManager.cacheKey;
  },
  
  /**
   * Check if the cache should be reset based on a time threshold
   * @param thresholdMinutes - Minutes to keep the cache before resetting (default: 1)
   * @returns Object containing whether reset is needed and the cache key
   */
  shouldResetCache: (thresholdMinutes: number = 1): { shouldReset: boolean, cacheKey: string } => {
    const currentTime = Date.now();
    const thresholdMs = thresholdMinutes * 60 * 1000;
    const timeSinceLastReset = currentTime - TileCacheManager.timestamp;
    
    if (timeSinceLastReset >= thresholdMs) {
      // Reset cache if threshold has passed
      const newCacheKey = TileCacheManager.resetCache();
      return { shouldReset: true, cacheKey: newCacheKey };
    }
    
    // Return current cache key if threshold hasn't passed
    return { shouldReset: false, cacheKey: TileCacheManager.cacheKey };
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
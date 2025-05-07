/**
 * Map event handlers for the Leaflet component
 */
import { useEffect } from 'react';
import { useMap, useMapEvents } from 'react-leaflet';
import floorPlanStore from '../stores/floor-plan.store';
import TileCacheManager from './tile-cache';

interface InitMapStoreProps {
  /**
   * Callback function triggered when the cache is reset
   * @param key The new cache key
   */
  onCacheReset?: (key: string) => void;
}

/**
 * Component that initializes the map store and handles map events
 * Triggers cache reset when zoom changes
 */
export const InitMapStore = ({ onCacheReset }: InitMapStoreProps) => {
  const map = useMap();
  const [setMap, setZoomAmplified] = floorPlanStore((e) => [
    e.setMap,
    e.setZoomAmplified,
  ]);

  const mapEvents = useMapEvents({
    zoomend: () => {
      // Update zoom level in store
      setZoomAmplified(mapEvents.getZoom());
      
      // Reset cache when zoom changes and notify parent
      const newCacheKey = TileCacheManager.resetCache();
      if (onCacheReset) {
        onCacheReset(newCacheKey);
      }
    },
  });

  useEffect(() => {
    if (map) {
      setMap(map);
    }

    return () => {
      console.log("map component unmounted");
      setZoomAmplified(1);
    };
  }, [map, setMap, setZoomAmplified]);

  return null;
};

export default InitMapStore;
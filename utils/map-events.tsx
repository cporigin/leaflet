/**
 * Map event handlers for the Leaflet component
 */
import { useEffect, useRef } from "react";
import { useMap, useMapEvents } from "react-leaflet";
import floorPlanStore from "../stores/floor-plan.store";
import TileCacheManager from "./tile-cache";

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

  const setMap = floorPlanStore((e) => e.setMap);
  const setZoomAmplified = floorPlanStore((e) => e.setZoomAmplified);
  const currentZoom = floorPlanStore((e) => e.zoomAmplified);

  const lastCacheKey = useRef(TileCacheManager.getCacheKey());

  const mapEvents = useMapEvents({
    zoomend: () => {
      const newZoom = mapEvents.getZoom();
      // Only update zoom if it has changed
      if (newZoom !== currentZoom) {
        setZoomAmplified(newZoom);
      }

      // Only reset cache and notify parent if cache key has changed
      const newCacheKey = TileCacheManager.getCacheKey();
      if (newCacheKey !== lastCacheKey.current && onCacheReset) {
        lastCacheKey.current = newCacheKey;
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
    };
  }, [map, setMap]);

  return null;
};

export default InitMapStore;

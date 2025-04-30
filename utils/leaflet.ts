/**
 * Utility functions for Leaflet operations
 */
import polylabel from "polylabel";
import { IPosition } from "../types/common";

/**
 * Calculate the center point of a collection of geographic positions
 * 
 * @param positions - Array of positions with lat/lng coordinates
 * @returns - Array containing [centerLat, centerLng]
 */
export function calculateCenterOfPositions(positions: IPosition[]): [number, number] {
  const numPositions = positions.length;

  let totalLat = 0;
  let totalLng = 0;

  for (let i = 0; i < numPositions; i++) {
    totalLat += positions[i].lat;
    totalLng += positions[i].lng;
  }

  const centerLat = totalLat / numPositions;
  const centerLng = totalLng / numPositions;

  return [centerLat, centerLng];
}

/**
 * Calculate the pole of inaccessibility for a polygon using polylabel
 * The "pole of inaccessibility" is the most distant internal point from the polygon outline
 * 
 * @param positions - Array of positions with lat/lng coordinates forming a polygon
 * @returns - Array containing [poleLat, poleLng]
 */
export function calculatePolybelOfPositions(positions: IPosition[]): [number, number] {
  const newPositions = polylabel([positions.map((e) => [e.lat, e.lng])], 10);

  const [poleLat, poleLng] = newPositions;
  
  return [poleLat, poleLng];
}
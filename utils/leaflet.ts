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

/**
 * Convert rectangle bounds to polygon coordinates
 * Takes the rectangle bounds and returns an array of 4 corner positions that form a polygon
 * 
 * @param bounds - Rectangle bounds object with getSouthWest() and getNorthEast() methods
 * @returns - Array of 4 IPosition objects representing the rectangle corners
 */
export function convertRectangleToPolygonCoordinates(bounds: any): IPosition[] {
  const southWest = bounds.getSouthWest();
  const northEast = bounds.getNorthEast();
  
  // Create 4 corner coordinates: SW, SE, NE, NW (clockwise from southwest)
  return [
    { lat: southWest.lat, lng: southWest.lng }, // Southwest
    { lat: southWest.lat, lng: northEast.lng }, // Southeast  
    { lat: northEast.lat, lng: northEast.lng }, // Northeast
    { lat: northEast.lat, lng: southWest.lng }, // Northwest
  ];
}
import { isNil } from "lodash";
import polylabel from "polylabel";

export function calculateCenterOfPositions(positions) {
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

export function calculatePolybelOfPositions(positions) {
  const newPositions = polylabel([positions.map((e) => [e.lat, e.lng])], 10);

  return newPositions;
}

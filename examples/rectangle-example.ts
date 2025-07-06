/**
 * Example demonstrating rectangle drawing functionality
 * This shows how to programmatically create and manage rectangles
 */

import { ILayer } from '../types/common';

// Example of creating rectangle layers programmatically
export const createExampleRectangles = (): ILayer[] => {
  return [
    {
      id: 'rect-1',
      type: 'rectangle',
      position_data: [
        { lat: 51.506, lng: -0.10 },
        { lat: 51.506, lng: -0.08 },
        { lat: 51.504, lng: -0.08 },
        { lat: 51.504, lng: -0.10 },
      ],
      category: 'building',
      status: 'active'
    },
    {
      id: 'rect-2',
      type: 'rectangle',
      position_data: [
        { lat: 51.508, lng: -0.07 },
        { lat: 51.508, lng: -0.05 },
        { lat: 51.506, lng: -0.05 },
        { lat: 51.506, lng: -0.07 },
      ],
      category: 'parking',
      status: 'inactive'
    }
  ];
};

// Example usage with the store
export const rectangleUsageExample = `
import { floorPlanStore } from '@cporigin/leaflet';
import { createExampleRectangles } from './examples/rectangle-example';

// Enable drawing mode
floorPlanStore.getState().setMode('add');

// Add example rectangles
const rectangles = createExampleRectangles();
rectangles.forEach(rect => {
  floorPlanStore.getState().addTempLayer(rect);
});

// Switch to edit mode to modify rectangles
floorPlanStore.getState().setMode('edit');

// Select a rectangle for editing
floorPlanStore.getState().setSelectedSpace({ id: 'rect-1' });
`;

console.log('Rectangle usage example:');
console.log(rectangleUsageExample);
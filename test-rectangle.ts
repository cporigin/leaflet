/**
 * Simple test file to validate rectangle drawing functionality
 * This tests the basic structure and type definitions
 */

// Import types to validate they are properly defined
import { ILayer, IPosition, ITempPayload } from './types/common';

// Test rectangle layer creation
function testRectangleLayer(): void {
  const rectangleLayer: ILayer = {
    id: 'test-rectangle-1',
    type: 'rectangle',
    position_data: [
      { lat: 51.505, lng: -0.09 },
      { lat: 51.505, lng: -0.08 },
      { lat: 51.504, lng: -0.08 },
      { lat: 51.504, lng: -0.09 },
    ],
    status: 'active',
    category: 'test'
  };

  console.log('Rectangle layer created:', rectangleLayer);
}

// Test temp payload with rectangle type
function testRectangleTempPayload(): void {
  const tempPayload: ITempPayload = {
    type: 'rectangle',
    position_data: [
      { lat: 51.505, lng: -0.09 },
      { lat: 51.505, lng: -0.08 },
      { lat: 51.504, lng: -0.08 },
      { lat: 51.504, lng: -0.09 },
    ]
  };

  console.log('Rectangle temp payload created:', tempPayload);
}

// Test rectangle bounds conversion (simulating Leaflet bounds)
function testRectangleBoundsConversion(): void {
  // Simulate Leaflet bounds object
  const mockBounds = {
    getNorth: () => 51.505,
    getSouth: () => 51.504,
    getEast: () => -0.08,
    getWest: () => -0.09
  };

  // Convert bounds to position data (as done in handleCreated)
  const positionData: IPosition[] = [
    { lat: mockBounds.getNorth(), lng: mockBounds.getWest() },
    { lat: mockBounds.getNorth(), lng: mockBounds.getEast() },
    { lat: mockBounds.getSouth(), lng: mockBounds.getEast() },
    { lat: mockBounds.getSouth(), lng: mockBounds.getWest() },
  ];

  console.log('Converted bounds to position data:', positionData);

  // Verify we have 4 corners for a rectangle
  if (positionData.length !== 4) {
    throw new Error('Rectangle should have exactly 4 position points');
  }

  // Verify bounds are consistent
  const lats = positionData.map(p => p.lat);
  const lngs = positionData.map(p => p.lng);
  
  if (Math.max(...lats) !== mockBounds.getNorth()) {
    throw new Error('North bound mismatch');
  }
  if (Math.min(...lats) !== mockBounds.getSouth()) {
    throw new Error('South bound mismatch');
  }
  if (Math.max(...lngs) !== mockBounds.getEast()) {
    throw new Error('East bound mismatch');
  }
  if (Math.min(...lngs) !== mockBounds.getWest()) {
    throw new Error('West bound mismatch');
  }

  console.log('✓ Rectangle bounds conversion test passed');
}

// Run tests
export function runRectangleTests(): void {
  console.log('Running rectangle drawing tests...');
  
  try {
    testRectangleLayer();
    testRectangleTempPayload();
    testRectangleBoundsConversion();
    
    console.log('✓ All rectangle tests passed!');
  } catch (error) {
    console.error('✗ Rectangle test failed:', error);
    throw error;
  }
}

// Export for potential use in other test files
export {
  testRectangleLayer,
  testRectangleTempPayload,
  testRectangleBoundsConversion
};
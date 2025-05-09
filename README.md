# @cporigin/leaflet

A TypeScript-based Leaflet component library for React applications, providing interactive maps with customizable markers, polygons, and editing capabilities.

## Features

- **Interactive Map**: Built on React Leaflet with drawing and editing controls
- **Customizable Components**: Easily override default components with your own implementations
- **State Management**: Zustand-based stores for efficient state handling
- **TypeScript Support**: Full TypeScript support with comprehensive type definitions
- **Extensible Architecture**: Designed to be extended with custom features

## Installation

```bash
bun install @cporigin/leaflet
# or
npm install @cporigin/leaflet
# or
yarn add @cporigin/leaflet
```

Make sure to install the required peer dependencies:

```bash
bun install react react-dom @mui/material @mui/icons-material leaflet react-leaflet
```

## Using as a Local Package

To use this package locally in other projects during development:

### Method 1: Using a Tarball (Recommended)

1. Build and create a tarball package:
```bash
bun run tarball
```

This will create a file named `cporigin-leaflet-0.1.71.tgz`.

2. Install the tarball in your consuming project:
```bash
cd /path/to/your-project
bun install /path/to/leaflet/cporigin-leaflet-0.1.71.tgz
```

### Method 2: Using yalc

1. Install yalc if you haven't already:
```bash
bun add -g yalc
# or
npm install -g yalc
```

2. Build and publish the package to yalc:
```bash
bun run build
yalc publish
```

3. Add to your consuming project and install:
```bash
# Add this to your project's package.json scripts section
"link:leaflet": "bunx yalc add @cporigin/leaflet && bun install"
```

4. Run the script in your consuming project:
```bash
bun run link:leaflet
```

### Method 3: Direct File Path Reference

Add the package directly to your project's package.json using a local file path:

```json
{
  "dependencies": {
    "@cporigin/leaflet": "file:../path/to/leaflet"
  }
}
```

Then run `bun install` in your consuming project.

### Method 4: Using Bun Link

If you prefer to use linking (may require extra setup):

1. Build the package:
```bash
bun run build
```

2. Link the package globally:
```bash
bun link
```

3. In your consuming project, link to this package:
```bash
cd /path/to/your-project
bun link @cporigin/leaflet
```

### Using npm

1. Build the package:
```bash
npm run build
```

2. Link the package globally:
```bash
npm link
```

3. In your consuming project, link to this package:
```bash
cd /path/to/your-project
npm link @cporigin/leaflet
```

Alternatively, you can add it directly to another project's package.json using a local file path:

```json
{
  "dependencies": {
    "@cporigin/leaflet": "file:../path/to/leaflet"
  }
}
```

Then run `npm install` in your consuming project.

## Basic Usage

```tsx
import Leaflet from '@cporigin/leaflet';
import { SPACE_STATUS } from '@cporigin/leaflet/constants/space';

function MyMap() {
  return (
    <Leaflet 
      url="https://your-tile-server/{z}/{x}/{y}.png"
      height={600}
      polygonColor={SPACE_STATUS}
      markerColor={SPACE_STATUS}
    />
  );
}
```

## Advanced Usage

### Customizing Components

You can provide your own components to override the default ones:

```tsx
import Leaflet from '@cporigin/leaflet';
import MyCustomTooltip from './MyCustomTooltip';
import MyCustomLabel from './MyCustomLabel';
import MyCustomMarker from './MyCustomMarker';

function MyAdvancedMap() {
  return (
    <Leaflet 
      url="https://your-tile-server/{z}/{x}/{y}.png"
      height={600}
      components={{
        Tooltip: MyCustomTooltip,
        Label: MyCustomLabel,
        PolygonMarker: MyCustomMarker,
        polygonProps: ({ layer, status, center }) => ({
          // Custom polygon props
          onClick: () => console.log('Polygon clicked', layer.id),
        }),
        polygonHandleClick: (id) => console.log('Handle polygon click', id),
      }}
    />
  );
}
```

### Accessing Stores

The library exports stores that you can use to interact with the map programmatically:

```tsx
import { floorPlanStore, markerStore, polygonStore } from '@cporigin/leaflet';

// Set map mode
floorPlanStore.getState().setMode('edit');

// Add a marker
floorPlanStore.getState().addTempLayer({
  type: 'marker',
  position_data: [{ lat: 10, lng: 20 }],
});

// Save changes
floorPlanStore.getState().saveTempLayers();
```

## Key Components

### Leaflet

Main container component for the map. Accepts the following props:

| Prop | Type | Description |
|------|------|-------------|
| url | string | URL template for map tiles |
| height | number \| string | Height of the map container (default: 600px) |
| polygonColor | IStatusColorMap | Status colors for polygons |
| markerColor | IStatusColorMap | Status colors for markers |
| components | Partial<ComponentStore> | Custom component overrides |
| sx | SxProps<Theme> | Additional style properties |

### Markers

Supports different types of markers:

- **Circle Marker**: Simple circular marker with customizable colors
- **Pin Marker**: Pin-shaped marker with dragging support in edit mode

### Polygons

Interactive polygons with:
- Editing capabilities
- Center marker
- Tooltip display
- Custom label

## State Management

The library uses Zustand stores for state management:

- **floorPlanStore**: Manages map mode, layers, temporary layers, selected spaces
- **markerStore**: Handles marker styling and status colors
- **polygonStore**: Controls polygon styling and status colors
- **componentStore**: Allows overriding default components

## TypeScript Types

The library provides comprehensive type definitions:

```typescript
// Common position interface
interface IPosition {
  lat: number;
  lng: number;
}

// Layer interface
interface ILayer {
  id: string | number;
  type?: string;
  position_data?: IPosition[];
  status?: string;
  category?: string;
  code?: string;
  [key: string]: any;
}

// And many more...
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This library is licensed under the MIT License.

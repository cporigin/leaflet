import { MapContainer, TileLayer, useMap } from 'react-leaflet';

import { Box } from '@mui/material';
import { memo, useEffect, useRef } from 'react';
import motionStore from 'stores/motion.store';

import FeatureLeaflet from './features';

const Leaflet = memo(function LeaftletComponent(props) {
  const [mode, layers, addTempLayer, updateTempLayer, selectedSpace, mapRef] =
    motionStore((e) => [
      e.mode,
      e.layers,
      e.addTempLayer,
      e.updateTempLayer,
      e.selectedSpace,
      e.mapRef
    ]);

  return (
    <Box
      id="markers-canvas-container"
      sx={{
        textAlign: 'center',
        '& .leaflet-container': {
          height: props.height ?? 600
        },
        '& .leaflet-draw-actions': {
          display: 'none !important'
        },
        '& .leaflet-draw-section': {
          display: 'none'
        },
        '& .leaflet-div-icon': {
          height: '12px !important',
          width: '12px !important'
        },
        '& .leaflet-container .leaflet-control-attribution': {
          display: 'none'
        }
      }}>
      <Box
        alt="floorplan-image"
        component={MapContainer}
        zoom={1}
        maxZoom={5}
        ref={mapRef}
        sx={{
          bgcolor: 'white'
        }}
        maxBounds={[
          [-100, -220],
          [100, 220]
        ]}
        boundsOptions={{ padding: 0 }}
        center={[51.505, -0.09]}>
        <TileLayer
          attribution="meow"
          noWrap
          url={`${props.url}/{z}/{x}/{y}.png`}
        />
        <InitMapStore />
        <FeatureLeaflet />
      </Box>
    </Box>
  );
});

function InitMapStore() {
  const map = useMap();

  const setMap = motionStore((e) => e.setMap);

  useEffect(() => {
    setMap(map);
  }, [map]);

  return <></>;
}

export default Leaflet;

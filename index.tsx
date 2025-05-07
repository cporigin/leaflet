/**
 * Main Leaflet component - entry point for the leaflet map implementation
 */
import { FC, memo, useEffect } from "react";
import { Box, SxProps, Theme } from "@mui/material";
import { MapContainer, TileLayer, useMap, useMapEvents } from "react-leaflet";
import { LatLngExpression, LatLngTuple } from "leaflet";

import floorPlanStore from "./stores/floor-plan.store";
import markerStore from "./stores/marker.store";
import polygonStore from "./stores/polygon.store";
import componentStore, { ComponentStore } from "./stores/component.store";
import FeatureLeaflet from "./features";
import { IStatusColorMap } from "./types/common";

interface LeafletProps {
  /** URL template for map tiles */
  url: string;
  
  /** Height of the map container (default: 600px) */
  height?: number | string;
  
  /** Status colors for polygons */
  polygonColor?: IStatusColorMap;
  
  /** Status colors for markers */
  markerColor?: IStatusColorMap;
  
  /** Custom component overrides */
  components?: Partial<ComponentStore>;
  
  /** Additional style properties */
  sx?: SxProps<Theme>;
}

/**
 * Internal component that initializes map store
 */
function InitMapStore() {
	const map = useMap();

	const [setMap, setZoomAmplified] = floorPlanStore((e) => [
		e.setMap,
		e.setZoomAmplified,
	]);

	const mapEvents = useMapEvents({
		zoomend: () => setZoomAmplified(mapEvents.getZoom()),
	});

	useEffect(() => {
		if (map) {
			setMap(map);
		}

		return () => {
			console.log("unmount");
			setZoomAmplified(1);
		};
	}, [map, setMap, setZoomAmplified]);

	return <></>;
}

/**
 * Main Leaflet component
 * Provides a configurable map with markers, polygons, and interactive features
 * 
 * @param props - Component properties including URL, height and color configurations
 * @returns Map container component with configured features
 */
const Leaflet = memo<LeafletProps>(function Component(props) {
	useEffect(() => {
		polygonStore.setState({ statusColor: props.polygonColor || {} });
		markerStore.setState({ statusColor: props.markerColor || {} });
		componentStore.setState(props.components || {});
	}, [props.polygonColor, props.markerColor, props.components]);

	const center: LatLngTuple = [51.505, -0.09];
	const southWest: LatLngTuple = [-100, -220];
	const northEast: LatLngTuple = [100, 220];

	return (
		<Box
			id="markers-canvas-container"
			sx={{
				textAlign: "center",
				"& .leaflet-container": {
					height: props.height ?? 600,
				},
				"& .leaflet-draw-actions": {
					display: "none !important",
				},
				"& .leaflet-draw-section": {
					display: "none",
				},
				"& .leaflet-div-icon": {
					height: "12px !important",
					width: "12px !important",
				},
				"& .leaflet-container .leaflet-control-attribution": {
					display: "none",
				},
				...(props.sx || {}),
			}}
		>
			<MapContainer
				zoom={1}
				maxZoom={5}
				style={{ backgroundColor: "white" }}
				maxBounds={[southWest, northEast]}
				boundsOptions={{ padding: [0, 0] }}
				center={center}
			>
				<TileLayer
					attribution="meow"
					noWrap
					url={`${props.url}/{z}/{x}/{y}.png`}
				/>
				<InitMapStore />
				<FeatureLeaflet />
			</MapContainer>
		</Box>
	);
});

export { floorPlanStore, markerStore, polygonStore };

export default Leaflet;
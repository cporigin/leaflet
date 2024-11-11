import { MapContainer, TileLayer, useMap, useMapEvents } from "react-leaflet";

import { Box } from "@mui/material";
import { memo, useEffect } from "react";
import floorPlanStore from "./stores/floor-plan.store";
import markerStore from "./stores/marker.store";
import polygonStore from "./stores/polygon.store";
import componentStore from "./stores/component.store";

import FeatureLeaflet from "./features";

const Leaflet = memo(function Component(props) {
	useEffect(() => {
		polygonStore.setState({ statusColor: props.polygonColor });
		markerStore.setState({ statusColor: props.markerColor });
		componentStore.setState(props.components);
	}, [props.polygonColor, props.markerColor, props.components]);

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
			}}
		>
			<Box
				alt="floorplan-image"
				component={MapContainer}
				zoom={1}
				maxZoom={5}
				sx={{
					bgcolor: "white",
				}}
				maxBounds={[
					[-100, -220],
					[100, 220],
				]}
				boundsOptions={{ padding: 0 }}
				center={[51.505, -0.09]}
			>
				<TileLayer
					attribution="meow"
					noWrap
					url={`${props.url}/{z}/{x}/{y}.png`}
				/>
				<InitMapStore />
				<FeatureLeaflet layers={props?.layers} />
			</Box>
		</Box>
	);
});

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
	}, [map]);

	return <></>;
}

export { floorPlanStore, markerStore, polygonStore };

export default Leaflet;

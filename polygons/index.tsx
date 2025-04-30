/**
 * Component that renders all polygons on the map
 */
import { filter, isEmpty, map } from "lodash";
import floorPlanStore from "../stores/floor-plan.store";
import Polygon from "./polygon";
import { ILayer } from "../types/common";

/**
 * Container component for all polygons on the map
 * Filters layers with position data from the store and renders them
 * 
 * @returns Collection of polygon components
 */
export default function Polygons() {
	const [tempMarkers, selectedSpace] = floorPlanStore((e) => [
		filter(e.tempLayers, (el) => el.position_data) as ILayer[],
		e.selectedSpace,
	]);

	if (isEmpty(tempMarkers)) {
		return <></>;
	}

	return (
		<>
			{map(tempMarkers, (layer, index) => (
				<Polygon 
					key={layer.id?.toString() || index}
					layer={layer} 
					selectedLayer={layer.id === selectedSpace.id} 
				/>
			))}
		</>
	);
}
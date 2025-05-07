/**
 * Feature component that manages all map features (markers and polygons)
 */
import { FC } from "react";
import { isEmpty } from "lodash";
import floorPlanStore from "./stores/floor-plan.store";
import CustomEditControl from "./edit-control";
import Markers from "./markers";
import Polygons from "./polygons";

/**
 * Container component for all map features
 * Controls edit mode and manages the visibility of markers and polygons
 * 
 * @returns Component with appropriate edit controls and map features
 */
const FeatureLeaflet: FC = () => {
	const tempMarkers = floorPlanStore((e) => e.tempLayers);
	const selectedLayerNotEmpty = floorPlanStore((e) => !isEmpty(e.selectedLayer));
	const isNotAdding = floorPlanStore((e) => e.mode !== "add");

	if (isEmpty(tempMarkers)) {
		return <CustomEditControl />;
	}

	return (
		// if mode === 'add' will enable and must
		<CustomEditControl disabled={isNotAdding || selectedLayerNotEmpty}>
			<Markers />
			<Polygons />
		</CustomEditControl>
	);
};

export default FeatureLeaflet;
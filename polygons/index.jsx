import { filter, isEmpty, map } from "lodash";
import floorPlanStore from "../stores/floor-plan.store";
import Polygon from "./polygon";

export default function Polygons(props) {
	const [tempMarkers, selectedSpace] = floorPlanStore((e) => [
		filter(e.tempLayers, (el) => el.position_data),
		e.selectedSpace,
	]);

	if (isEmpty(tempMarkers)) {
		return <></>;
	}

	if (props?.layers) {
		return map(props?.layers, (e, index) => (
			<Polygon layer={e} selectedLayer={e.id === selectedSpace.id} />
		));
	}

	return (
		<>
			{map(tempMarkers, (e, index) => (
				<Polygon layer={e} selectedLayer={e.id === selectedSpace.id} />
			))}
		</>
	);
}

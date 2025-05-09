/**
 * Custom edit control component for Leaflet with drawing capabilities
 */
import { ControlPosition } from "leaflet";
import {
  FC,
  ReactNode,
  memo,
  useCallback,
  useEffect,
  useRef,
} from "react";
import { FeatureGroup } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import floorPlanStore from "./stores/floor-plan.store";
import { ILayer, IPosition } from "./types/common";

interface CustomEditControlProps {
  disabled?: boolean;
  children?: ReactNode;
}

/**
 * Edit control component that handles drawing and editing map elements
 *
 * @param props - Component props including disabled state and children elements
 * @returns Edit control with feature group container
 */
const CustomEditControl: FC<CustomEditControlProps> = memo((props) => {
  const mode = floorPlanStore((e) => e.mode);
  const addTempLayer = floorPlanStore((e) => e.addTempLayer);
  const removeTempLayer = floorPlanStore((e) => e.removeTempLayer);
  const isAdding = floorPlanStore((e) => e.mode === "add");
  const tempLayers = floorPlanStore((e) => e.tempLayers);
  const setTempLayers = floorPlanStore((e) => e.setTempLayers);

  const drawControlRef = useRef<any>(null);

  function onMounted(ctl: any) {
    drawControlRef.current = ctl;
  }

  const handleCreated = useCallback(
    (e: any) => {
      const { layerType: type, layer } = e;

      // multiple draw logic
      if (type === "polygon") {
        const { _leaflet_id } = layer;
        const newLayer = {
          type,
          position_data: layer.getLatLngs()[0] as IPosition[],
        };

        addTempLayer(newLayer);
        e.target?._layers?.[_leaflet_id]?.remove();
      }

      if (type === "circle") {
        console.log(e);
      }

      if (type === "marker") {
        const { lat = null, lng = null } = { ...layer?._latlng };

        addTempLayer({ type, position_data: [{ lat, lng }] });
        layer.remove(layer._leaflet_id);
      }
    },
    [addTempLayer]
  );

  const onEditVertex = useCallback(
    (e: any) => {
      const { poly } = e;
      const result = tempLayers.map((tempLayer: ILayer) => {
        if (tempLayer?.id === poly.options?.attribution) {
          return { ...tempLayer, position_data: poly.editing.latlngs[0][0] };
        }
        return tempLayer;
      });

      setTempLayers(result);
    },
    [tempLayers, setTempLayers]
  );

  const handleDeleted = useCallback(
    (e: any) => {
      const {
        layers: { _layers },
      } = e;

      const removeList: string[] = [];

      Object.values(_layers).forEach((id) => {
        removeList.push(id as string);
      });

      removeList.forEach((id) => removeTempLayer(id));
    },
    [removeTempLayer]
  );

  const defaultControl = {
    position: "topright" as ControlPosition,
    draw: {
      circle: false,
      polyline: false,
      circlemarker: false,
      rectangle: false,
      marker: false,
      polygon: isAdding,
    },
    edit: {
      featureGroup: false,
      edit: false,
      remove: false,
    },
    onCreated: handleCreated,
    onDeleted: handleDeleted,
    onMounted,
    onEditVertex,
  };

  useEffect(() => {
    if (mode === "add") {
      if (drawControlRef.current) {
        drawControlRef.current._toolbars.draw._modes.polygon.handler.enable();
      }
    }
  }, [mode]);

  if (props.disabled) {
    return <>{props.children}</>;
  }

  return (
    <>
      <FeatureGroup>
        <EditControl ref={drawControlRef} {...defaultControl} />
        {props.children}
      </FeatureGroup>
    </>
  );
});

export default CustomEditControl;

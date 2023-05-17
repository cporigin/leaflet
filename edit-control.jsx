import { useCallback, useEffect, useRef } from "react";
import { FeatureGroup } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import floorPlanStore from "./stores/floor-plan.store";

export default function CustomEditControl(props) {
  if (props.disabled) {
    return props.children;
  }

  const [
    mode,
    addTempLayer,
    removeTempLayer,
    isAdding,
    tempLayers,
    setTempLayers,
  ] = floorPlanStore((e) => [
    e.mode,
    e.addTempLayer,
    e.removeTempLayer,
    e.mode === "add",
    e.tempLayers,
    e.setTempLayers,
  ]);

  const drawControlRef = useRef();

  function onMounted(ctl) {
    drawControlRef.current = ctl;
  }

  const handleCreated = useCallback((e) => {
    const { layerType: type, layer } = e;

    // multiple draw logic
    if (type === "polygon") {
      const { _leaflet_id } = layer;
      const newLayer = {
        type,
        position_data: [{ positions: layer.getLatLngs()[0] }],
      };

      addTempLayer(newLayer);
      e.target?._layers?.[_leaflet_id]?.remove();
    }

    if (type === "circle") {
      console.log(e);
    }

    if (type === "marker") {
      const { lat = null, lng = null } = { ...layer?._latlng };

      addTempLayer({ type, position_data: [{ positions: [{ lat, lng }] }] });
      layer.remove(layer._leaflet_id);
    }
  }, []);

  console.log("tempLayers", tempLayers);
  const onEditVertex = useCallback((e) => {
    const { poly } = e;
    const result = tempLayers.map((tempLayer) => {
      if (tempLayer?.id === poly.options?.attribution) {
        return { ...tempLayer, positions: poly.editing.latlngs[0][0] };
      }
      return tempLayer;
    });

    setTempLayers(result);
  }, []);

  const handleDeleted = useCallback((e) => {
    const {
      layers: { _layers },
    } = e;

    const removeList = [];

    Object.values(_layers).map((id) => {
      removeList.push(id);
    });

    removeTempLayer(removeList);
  }, []);

  const defaultControl = {
    position: "topright",
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

  return (
    <>
      <FeatureGroup>
        <EditControl ref={drawControlRef} {...defaultControl} />
        {props.children}
      </FeatureGroup>
    </>
  );
}

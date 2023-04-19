import L from "leaflet";
import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Marker } from "react-leaflet";

/**
 * React-leaflet marker that allows for fully interactive JSX in icon
 */
export const JSXMarker = React.forwardRef(
  ({ children, iconOptions, ...rest }, refInParent) => {
    const [ref, setRef] = useState();

    const node = React.useMemo(
      () => (ref ? ReactDOM.createRoot(ref.getElement()) : null),
      [ref]
    );

    return (
      <>
        {React.useMemo(
          () => (
            <Marker
              {...rest}
              ref={(r) => {
                setRef(r);
                if (refInParent) {
                  // @ts-expect-error fowardref ts defs are tricky
                  refInParent.current = r;
                }
              }}
              icon={L.divIcon(iconOptions)}
            />
          ),
          []
        )}
        {ref && node.render(children)}
      </>
    );
  }
);

JSXMarker.displayName = "Marker";

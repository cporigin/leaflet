import L from "leaflet";
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { Marker } from "react-leaflet";

/**
 * React-leaflet marker that allows for fully interactive JSX in icon
 */
export const JSXMarker = React.forwardRef(
  ({ children, iconOptions, ...rest }, refInParent) => {
    const [ref, setRef] = useState(null);
    const [renderedChildren, setRenderedChildren] = useState(null);

    useEffect(() => {
      if (ref) {
        const node = ReactDOM.createRoot(ref.getElement());
        setRenderedChildren(node.render(children));
      }
    }, [ref, children]);

    return (
      <>
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
        {renderedChildren}
      </>
    );
  }
);

JSXMarker.displayName = "JSXMarker";

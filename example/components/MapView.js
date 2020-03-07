import React from "react";
import { useMap } from "../../.";

// hooks allow us to create a map component as a function
function MapView() {
  // takes initial map and view properties as a POJO
  const properties = {
    map: {
      basemap: "streets"
    },
    view: {
      center: [15, 65],
      zoom: 4
    }
  };
  // returns a ref you can use to assign a container DOM node
  const [ref] = useMap(properties);
  return <div style={{ height: 400 }} ref={ref} />;
}

export default MapView;

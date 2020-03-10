import React from "react";
import { useMap } from "../../.";

// hooks allow us to create a map component as a function
function MapView() {
  // takes initial map and view properties as POJOs
  const map = {
    basemap: "streets"
  };
  const view = {
    center: [15, 65],
    zoom: 4
  };
  // returns a ref you can use to assign a container DOM node
  const [ref] = useMap(map, { view });
  return <div style={{ height: 400 }} ref={ref} />;
}

export default MapView;

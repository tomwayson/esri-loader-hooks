import React from "react";
import { useMap, useGraphics } from "../../.";
import {
  pointGraphicJson,
  polylineGraphicJson,
  polygonGraphicJson
} from "../data/graphics";

// hooks allow us to create a map component as a function
function GraphicsMap() {
  // takes initial map and view properties as a POJO
  const properties = {
    map: {
      basemap: "hybrid"
    },
    view: {
      center: [-80, 35],
      zoom: 3
    }
  };
  // returns a ref you can use to assign a container DOM node
  // and returns the map view instance, which you can pass to other hooks
  const [ref, view] = useMap(properties);
  // takes a view instance and an array of graphic POJOs
  const graphics = [pointGraphicJson, polylineGraphicJson, polygonGraphicJson];
  useGraphics(view, graphics);
  // TODO: load the graphics
  return <div style={{ height: 400 }} ref={ref} />;
}

export default GraphicsMap;

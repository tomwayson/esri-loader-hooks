import React from "react";
import { useScene } from "../../.";

// hooks allow us to create a map component as a function
function SceneView() {
  // takes initial map and view properties as POJOs
  const map = {
    basemap: "streets",
    ground: "world-elevation"
  };
  const view = {
    scale: 50000000, // Sets the initial scale to 1:50,000,000
    center: [-101.17, 21.78] // Sets the center point of view with lon/lat
  };
  // returns a ref you can use to assign a container DOM node
  const [ref] = useScene(map, { view });
  return <div style={{ height: 400 }} ref={ref} />;
}

export default SceneView;

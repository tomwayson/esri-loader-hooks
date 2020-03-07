import React from "react";
import { useWebScene } from "../../.";

// hooks allow us to create a map component as a function
function WebScene({ id }) {
  // this custom hook takes an item id and
  // returns a ref you can use to assign a container DOM node
  const [ref] = useWebScene(id);
  return <div style={{ height: 400 }} ref={ref} />;
}

export default WebScene;

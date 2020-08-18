import React from 'react';
import { useWebMap, useIdentityManager } from '../../.';

// hooks allow us to create a map component as a function
function WebMapAuth({ id }) {
  useIdentityManager([
    {
      appId: 'q244Lb8gDRgWQ8hM',
      popup: false,
    },
  ]);

  // this custom hook takes an item id and
  // returns a ref you can use to assign a container DOM node
  const [ref] = useWebMap(id);
  return <div style={{ height: 400 }} ref={ref} />;
}

export default WebMapAuth;
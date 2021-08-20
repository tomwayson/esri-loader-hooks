import React from 'react';
import { useFeatureTable } from '../../.';

// hooks allow us to create a map component as a function
function FeatureTable({ layer, tableOptions }) {
  // this custom hook takes a layer & an optional tableOptions objects and
  // returns a ref you can use to assign a container DOM node
  const [ref] = useFeatureTable(layer, tableOptions);
  return <div style={{ height: 400 }} ref={ref} />;
}

export default FeatureTable;

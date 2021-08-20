import { useRef, useEffect, useState } from 'react';
import { loadTable, destroyView } from '../utils/arcgis';

/**
 *
 * @param layer - Layer itemId, layer url, or layer instance
 * @param tableOptions - optional options object to configure the feature table. See https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-FeatureTable.html#properties-summary
 * @param portal - optional url to main portal entry point. Defaults to 'https://www.arcgis.com' and should only be changed if you have access to other private portals.
 * @returns Array[ref, table]
 */
export function useFeatureTable(layer: any, tableOptions?: {[index:string]:any}, portal: string = 'https://www.arcgis.com') {
  // create a ref to element to be used as the table's container
  const elRef = useRef(null);
  // hold on to the table in state
  const [table, setTable] = useState(null);
  // use a ref so we can use initial values in a componentDidMount-like effect
  // otherwise we'd get a lint error, or have to make it a dependency of the effect
  // see: https://github.com/facebook/react/issues/15865#issuecomment-540715333
  const initialArguments = useRef({ layer, tableOptions, portal });

  // use a side effect to create the table after react has rendered the DOM
  useEffect(() => {
    // define local variables to be used in the clean up function
    let cancelled = false;
    let _table: any;
    async function load() {
      const { layer, tableOptions, portal } = initialArguments.current;
      _table = await loadTable({
        layer,
        portalUrl: portal,
        ...tableOptions
      });
      if (cancelled) {
        return;
      }
      // show the view at the element & add it to the state
      _table.container = elRef.current;
      setTable(_table);
    }
    load();
    return function cleanUp() {
      // cancel any pending attempts to load the view
      // see: https://juliangaramendy.dev/use-promise-subscription/
      cancelled = true;
      // clean up the map view
      destroyView(_table);
    };
  }, []); // similar to componentDidMount(), componentWillUnmount()

  // return the ref and the view
  return [elRef, table];
}

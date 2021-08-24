import { useRef, useEffect, useState } from 'react';
import { loadTable, destroyView } from '../utils/arcgis';

interface IFeatureTableOptions {
  portalUrl?: string;
  [index:string]:any;
}

/**
 *
 * @param layer - Layer itemId, layer url, or layer instance
 * @param options - optional options object to configure the feature table. See https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-FeatureTable.html#properties-summary
 * @returns Array[ref, table]
 */
export function useFeatureTable(layer: any, options?: IFeatureTableOptions) {
  // create a ref to element to be used as the table's container
  const elRef = useRef(null);
  // hold on to the table in state
  const [table, setTable] = useState(null);
  // use a ref so we can use initial values in a componentDidMount-like effect
  // otherwise we'd get a lint error, or have to make it a dependency of the effect
  // see: https://github.com/facebook/react/issues/15865#issuecomment-540715333
  const initialArguments = useRef({ layer, options });

  // use a side effect to create the table after react has rendered the DOM
  useEffect(() => {
    // define local variables to be used in the clean up function
    let cancelled = false;
    let _table: any;
    async function load() {
      const { layer, options } = initialArguments.current;
      const { portalUrl = 'https://www.arcgis.com', ...tableOptions} = options as IFeatureTableOptions;
      _table = await loadTable({
        layer,
        portalUrl,
        ...tableOptions
      });
      if (cancelled) {
        return;
      }
      // show the table at the element & add it to the state
      _table.container = elRef.current;
      setTable(_table);
    }
    load();
    return function cleanUp() {
      // cancel any pending attempts to load the table
      // see: https://juliangaramendy.dev/use-promise-subscription/
      cancelled = true;
      // clean up the table view
      destroyView(_table);
    };
  }, []); // similar to componentDidMount(), componentWillUnmount()

  // return the ref and the table
  return [elRef, table];
}

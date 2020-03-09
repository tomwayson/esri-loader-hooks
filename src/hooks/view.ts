import { useRef, useEffect, useState } from 'react';
import { loadView, destroyView } from '../utils/arcgis';

export function useWebMap(item: any, options?: any) {
  return useView({ item, ...options });
}

export function useWebScene(item: any, options?: any) {
  return useView({ item, ...options, isScene: true });
}

export function useMap(options?: any) {
  return useView(options);
}

export function useScene(options?: any) {
  return useView({ ...options, isScene: true });
}

function useView(options = {}) {
  // create a ref to element to be used as the view's container
  const elRef = useRef(null);
  // hold on to the view in state
  const [view, setView] = useState(null);
  // use a ref so we can use initial values in a componentDidMount-like effect
  // otherwise we'd get a lint error, or have to make it a dependency of the effect
  // see: https://github.com/facebook/react/issues/15865#issuecomment-540715333
  const initialOptions = useRef(options);

  // use a side effect to create the view after react has rendered the DOM
  useEffect(() => {
    // define local variables to be used in the clean up function
    let cancelled = false;
    let _view: any;
    async function load() {
      _view = await loadView(elRef.current, initialOptions.current);
      // hold onto the view in state
      !cancelled && setView(_view);
    }
    load();
    return function cleanUp() {
      // cancel any pending attempts to load the view
      // see: https://juliangaramendy.dev/use-promise-subscription/
      cancelled = true;
      // clean up the map view
      destroyView(_view);
    };
  }, []); // similar to componentDidMount, componentWillUnmount

  // return the ref and the view
  return [elRef, view];
}

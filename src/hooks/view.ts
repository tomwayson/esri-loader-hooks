import { useRef, useEffect, useState } from 'react';
import { loadView } from '../utils/arcgis';

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

export function useView(options = {}) {
  // create a ref to element to be used as the map's container
  const elRef = useRef(null);
  // hold on to the view in state
  const [view, setView] = useState(null);
  // use a ref so we can use initial values in a componentDidMount-like effect
  // otherwise we'd get a lint error, or have to make it a dependency of the effect
  const initialOptions = useRef(options);

  // use a side effect to create the map after react has rendered the DOM
  useEffect(() => {
    // define the view here so it can be referenced in the clean up function
    let _view: any;
    async function load() {
      _view = await loadView(elRef.current, initialOptions.current);
      setView(_view);
    }
    load();
    return function cleanUp() {
      // clean up the map view
      if (!!_view) {
        _view.destroy();
        // TODO: setView(null)?
        _view = null;
      }
    };
  }, []); // componentDidMount, componentWillUnmount

  // return the ref and the view
  return [elRef, view];
}

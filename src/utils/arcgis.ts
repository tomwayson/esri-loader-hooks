import { loadModules } from 'esri-loader';

// is this a web map/scene?
function isItem(map: any) {
  return typeof map === 'string' || !!map.baseMap || !!map.operationalLayers;
}

// TODO: make this real
export interface ILoadViewOptions {
  isScene?: boolean;
  view?: any;
  // [index: string]: any;
}

export function loadView(map: any, options?: ILoadViewOptions) {
  return isItem(map) ? loadItem(map, options) : loadMap(map, options);
}

export function loadMap(mapProperties: any, options: ILoadViewOptions = {}) {
  const viewModule = `esri/views/${options.isScene ? 'Scene' : 'Map'}View`;
  return loadModules(['esri/Map', viewModule]).then(([Map, ViewClass]) => {
    // then we create a map (or scene)
    const map = new Map({ ...mapProperties });
    // and return a view with that map (or scene)
    const { view } = options;
    return new ViewClass({
      ...view,
      map,
    });
  });
}

export function loadItem(item: any, options: ILoadViewOptions = {}) {
  const modules = options.isScene
    ? ['esri/views/SceneView', 'esri/WebScene']
    : ['esri/views/MapView', 'esri/WebMap'];
  return loadModules(modules).then(([ViewClass, MapClass]) => {
    // then we create a wem map (or scene) from the item
    const map =
      typeof item === 'string'
        ? new MapClass({
            portalItem: {
              id: item,
            },
          })
        : MapClass.fromJSON(item);
    // and return a view with that web map (or scene)
    const { view } = options;
    return new ViewClass({
      ...view,
      map,
    });
  });
}

export function destroyView(view: any) {
  if (!view) {
    return;
  }
  // undocumented way to destroy a view
  view = view.container = null;
}

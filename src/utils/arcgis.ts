import { loadModules } from 'esri-loader';

// is this a web map/scene?
function isItem(map: any) {
  return typeof map === 'string' || !!map.baseMap || !!map.operationalLayers;
}

// TODO: make this real
export interface ILoadViewOptions {
  isScene?: boolean;
  view?: any;
  portalUrl?: string; // defaults to 'https://www.arcgis.com'
  // [index: string]: any;
}

export interface ILoadTableOptions {
  layer: any,
  portalUrl?: string; // defaults to 'https://www.arcgis.com'
  [index: string]: any; // could copy all the config options from FeatureTable (https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-FeatureTable.html#properties-summary)
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
    const { portalUrl = 'https://www.arcgis.com' } = options;
    // then we create a wem map (or scene) from the item
    const map =
      typeof item === 'string'
        ? new MapClass({
            portalItem: {
              id: item,
              portal: {
                url: portalUrl,
              },
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

export function layerFromId(id: string, portalUrl = 'https://www.arcgis.com') {
  return loadModules(['esri/layers/Layer']).then(([Layer]) => {
    return Layer.fromPortalItem({
      portalItem: ({
        id,
        portal: ({
          url: portalUrl,
        }),
      })
    });
  });
}

export function layerFromUrl(url: string) {
  return loadModules(['esri/layers/Layer']).then(([Layer]) => {
    return Layer.fromArcGISServerUrl({ url });
  });
}

export function loadLayer(layer: string, portalUrl = 'https://www.arcgis.com') {
  return (layer.indexOf('http') === 0) ? layerFromUrl(layer) : layerFromId(layer, portalUrl);
}

export function loadTable(options: ILoadTableOptions) {
  return loadModules(['esri/widgets/FeatureTable']).then(([FeatureTable]) => {
    const { layer, portalUrl, ...opts } = options;
    if(typeof layer === 'string'){
      return loadLayer(layer, portalUrl).then((layer) => {
        return new FeatureTable({
          layer,
          ...opts,
        });
      });
    } else {
      return new FeatureTable({
        layer,
        ...opts,
      });
    }
  });
}

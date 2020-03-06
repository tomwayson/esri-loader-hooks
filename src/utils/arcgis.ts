import { loadModules } from "esri-loader";

// TODO: make this real
export interface ILoadViewOptions {
  asScene?: boolean,
  [index: string]: any
}

export function loadView(container: any, { item, ...options }: ILoadViewOptions = {}) {
  return item
    ? loadItem(container, item, options)
    : loadMap(container, options);
}

export function loadMap(container: any, options: ILoadViewOptions = {}) {
  const viewModule = `esri/views/${options.asScene ? "Scene" : "Map"}View`;
  return loadModules(["esri/Map", viewModule]).then(([Map, ViewClass]) => {
    const { map: mapProperties, view: viewProperties } = options;
    // then we create a map
    const map = new Map(mapProperties);
    // and we show that map in a container
    return new ViewClass({
      ...viewProperties,
      map,
      container
    });
  });
}

export function loadItem(container: any, item: any, options: ILoadViewOptions = {}) {
  const modules = options.asScene
    ? ["esri/views/SceneView", "esri/WebScene"]
    : ["esri/views/MapView", "esri/WebMap"];
  return loadModules(modules).then(([ViewClass, MapClass]) => {
    // then we create a map (or scene)
    const map =
      typeof item === "string"
        ? new MapClass({
            portalItem: {
              id: item
            }
          })
        : MapClass.fromJSON(item);
    // and we show that map (or scene) in a container
    return new ViewClass({
      // ...options.view,
      map,
      container
    });
  });
}

export function loadWidget(name: string, properties: any) {
  const widgetModule = `esri/widgets/${name}`;
  return loadModules([widgetModule]).then(([WidgetClass]) => {
    return new WidgetClass(properties);
  });
}

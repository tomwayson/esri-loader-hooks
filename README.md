# esri-loader-hooks

Custom React [hooks](https://reactjs.org/docs/hooks-intro.html) for using the [ArcGIS API for JavaScript](https://developers.arcgis.com/javascript/) with [esri-loader](https://github.com/Esri/esri-loader).

## Install

```bash
npm install --save esri-loader esri-loader-hooks
```

or

```bash
yarn add esri-loader esri-loader-hooks
```

## Usage

This library provides a handful of hooks for loading ArcGIS maps and scenes in you components, and then registering [event or watch handles](#events-and-watches), or adding [graphics](#graphics).

### Maps, Scenes, and Views

You'll want to start with one of the hooks for working with [maps](https://developers.arcgis.com/javascript/latest/api-reference/esri-Map.html), scenes, and their associated [views](https://developers.arcgis.com/javascript/latest/api-reference/esri-views-View.html). 

All of these hooks return an array where the first element is a [ref](https://reactjs.org/docs/refs-and-the-dom.html) you use to set the DOM node to be used as the view's [container](https://developers.arcgis.com/javascript/latest/api-reference/esri-views-View.html#container), and the second element is the instance of the view, which you can use with the [handler](#events-and-watches) or [graphics](#graphics) hooks below

All of these hooks clean up after themselves by destroying view instance when the component will un-mount.

#### useWebMap

Load a [`WebMap`](https://developers.arcgis.com/javascript/latest/api-reference/esri-WebMap.html) in a [`MapView`](https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html).

```jsx
import React from 'react';
import { useWebMap } from 'esri-loader-hooks';

function WebMap({ id }) {
  // takes map as a string (item id), or JSON (item data)
  const [ref] = useWebMap(id);
  return <div style={{ height: 400 }} ref={ref} />;
}
```

#### useWebScene

Load a [`WebScene`](https://developers.arcgis.com/javascript/latest/api-reference/esri-WebScene.html) in a [`SceneView`](https://developers.arcgis.com/javascript/latest/api-reference/esri-views-SceneView.html).


```jsx
import React from 'react';
import { useWebScene } from 'esri-loader-hooks';

function WebScene({ id }) {
  // takes scene as a string (item id), or JSON (item data)
  const [ref] = useWebScene(id);
  return <div style={{ height: 400 }} ref={ref} />;
}
```

#### useMap

Load a [`Map`](https://developers.arcgis.com/javascript/latest/api-reference/esri-Map.html) in a [`MapView`](https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html).

```jsx
import React from 'react';
import { useMap } from 'esri-loader-hooks';

function MapView() {
  // takes initial map and view properties as a POJO
  const properties = {
    map: {
      basemap: "streets"
    },
    view: {
      center: [15, 65],
      zoom: 4
    }
  };
  const [ref] = useMap(properties);
  return <div style={{ height: 400 }} ref={ref} />;
}
```

#### useScene

Load a [`Map`](https://developers.arcgis.com/javascript/latest/api-reference/esri-Map.html) in a [`SceneView`](https://developers.arcgis.com/javascript/latest/api-reference/esri-views-SceneView.html).

```jsx
import React from 'react';
import { useScene } from 'esri-loader-hooks';

function SceneView() {
  // takes initial map and view properties as a POJO
  const properties = {
    map: {
      basemap: "streets",
      ground: "world-elevation"
    },
    view: {
      scale: 50000000,
      center: [-101.17, 21.78]
    }
  };
  const [ref] = useScene(properties);
  return <div style={{ height: 400 }} ref={ref} />;
}
```

### Events and Watches

Once you've used one of the above hooks to load a view, you can register event handlers or watch for property changes with the hooks below.

All of these hooks clean up after themselves by removing the event or watch handle when the callback changes or the component will un-mount.

#### useEvents

```jsx
import React from 'react';
import { useMap, useEvent } from 'esri-loader-hooks';

function ClickableMap({ onClick }) {
  const properties = {
    map: {
      basemap: "streets"
    },
    view: {
      center: [15, 65],
      zoom: 4
    }
  };
  const [ref, view] = useMap(properties);
  // we use the second element returned above to get the view instance
  useEvent(view, "click", onClick);
  return <div style={{ height: 400 }} ref={ref} />;
}
```

#### useEvents

You can register the same callback for multiple events with `useEvents(view, arrayOfEventNames, callback)`.

#### useWatch

You can watch for changes to the view, or any instance of [`Accessor`](https://developers.arcgis.com/javascript/latest/api-reference/esri-core-Accessor.html) with the hooks below.

```jsx
import React from 'react';
import { useScene, useWatch } from 'esri-loader-hooks';

function WatchedScene({ onUpdateChange }) {
  // takes initial map and view properties as a POJO
  const properties = {
    map: {
      basemap: "streets",
      ground: "world-elevation"
    },
    view: {
      scale: 50000000,
      center: [-101.17, 21.78]
    }
  };
  const [ref, view] = useScene(properties);
  // we use the second element returned above to get the view instance
  useWatch(view, 'updating', onUpdateChange);
  return <div style={{ height: 400 }} ref={ref} />;
}
```

#### useWatches

You can use the same callabck to watch changes to multiple properties with `useWatches(anyAccessor, arrayOfPropertyNames, callback)`.

### Graphics

Sometimes you have a component that takes a property like coordinates, or an array of geocoding results, and needs to show them as graphics on the view. The hooks below let you do that.

#### useGraphic

```jsx
import React from "react";
import { useMap, useGraphics } from "esri-loader-hooks";

// hooks allow us to create a map component as a function
function PointMap({ latitude, longitude }) {
  const geometry = {
    type: "point", // autocasts as new Point()
    latitude, 
    longitude
  };
  var symbol = {
    type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
    color: [226, 119, 40],
  };
  const properties = {
    map: {
      basemap: "hybrid"
    },
    view: {
      center: [-80, 35],
      zoom: 3
    }
  };
  const [ref, view] = useMap(properties);
  // takes a view instance and graphic as a POJO
  // the point will be replaced if the lat/lng props change
  useGraphic(view, { geometry, symbol });
  return <div style={{ height: 400 }} ref={ref} />;
}
```

#### useGraphics

You can add multiple graphics at the same time with `useGraphics(view, arrayOfJsonGraphics)`.

## FAQ

#### Do these hooks work with version 3.x of the ArcGIS API?

No.

#### How does this compare to react-arcgis?

This library is like a hooks version of [react-arcgis](https://github.com/Esri/react-arcgis), which is a library of a few generic components to get you started using esri-loader. My hypothesis is that a library of generic hooks will be more <em>use</em>ful than generic components. This is because the hooks should be easier to compose into many different custom components.

#### Can I use this with the [@arcgis/webpack-plugin](https://github.com/esri/arcgis-webpack-plugin#readme)?

No. The view and graphics hooks are bound to esri-loader. That said, the event and watch hooks could be used without esri-loader. Ideally someone would move those into their own library (cough, Rene) that could be used in both types of apps.

#### Can I use this in my production app?

I'm not (yet), but you go ahead.

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md).

## Development

See [the development instructions](./CONTRIBUTING.md#development).

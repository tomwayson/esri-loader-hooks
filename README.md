# esri-loader-hooks

Custom React [hooks](https://reactjs.org/docs/hooks-intro.html) for using the [ArcGIS API for JavaScript](https://developers.arcgis.com/javascript/) with [esri-loader].

## Install

`npm install --save esri-loader esri-loader-hooks` or `yarn add esri-loader esri-loader-hooks`

## Usage

```jsx
import {
  useMap, useScene, useWebMap, useWebScene, // create a map or scene
  useEvent, useEvents, useWatch, useWatches, // handle events or property changes
  useGraphic, useGraphics // add graphics to a map/scene
} from 'esri-loader-hooks';
```

This library provides a handful of hooks for [loading ArcGIS maps and scenes](#maps-scenes-and-views) in you components, and then registering [event or watch handles](#events-and-watches), or adding [graphics](#graphics).

### Configure esri-loader

Before using these hooks you'll need to at least [load the ArcGIS API styles](https://github.com/Esri/esri-loader#loading-styles) and optionally [configure esri-loader](https://github.com/Esri/esri-loader#configuring-esri-loader).

### Maps, Scenes, and Views

You'll want to start with one of the hooks for working with [maps](https://developers.arcgis.com/javascript/latest/api-reference/esri-Map.html), scenes, and their associated [views](https://developers.arcgis.com/javascript/latest/api-reference/esri-views-View.html).

All of these hooks return an array where the first element is a [ref](https://reactjs.org/docs/refs-and-the-dom.html) you use to set the DOM node to be used as the view's [container](https://developers.arcgis.com/javascript/latest/api-reference/esri-views-View.html#container), and the second element is the instance of the view, which you can use with the [handler](#events-and-watches) and [graphics](#graphics) hooks below, or in your own hooks.

See below for more information on [working with view hooks](#working-with-view-hooks).

#### useWebMap

Load a [`WebMap`](https://developers.arcgis.com/javascript/latest/api-reference/esri-WebMap.html) in a [`MapView`](https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html).

```jsx
import React from 'react';
import { useWebMap } from 'esri-loader-hooks';

function WebMap() {
  // takes map as a string (item id), or JSON (item data)
  const [ref] = useWebMap('e691172598f04ea8881cd2a4adaa45ba');
  return <div style={{ height: 400 }} ref={ref} />;
}
```

You can also override view properties by passing [`options`](#arguments).

#### useWebScene

Load a [`WebScene`](https://developers.arcgis.com/javascript/latest/api-reference/esri-WebScene.html) in a [`SceneView`](https://developers.arcgis.com/javascript/latest/api-reference/esri-views-SceneView.html).


```jsx
import React from 'react';
import { useWebScene } from 'esri-loader-hooks';

function WebScene() {
  // takes scene as a string (item id), or JSON (item data)
  const [ref] = useWebScene('3a9976baef9240ab8645ee25c7e9c096');
  return <div style={{ height: 400 }} ref={ref} />;
}
```

You can also override view properties by passing [`options`](#arguments).

#### useMap

Load a [`Map`](https://developers.arcgis.com/javascript/latest/api-reference/esri-Map.html) in a [`MapView`](https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html) with the given [`options`](#options-argument).

```jsx
import React from 'react';
import { useMap } from 'esri-loader-hooks';

function MapView() {
  // takes initial map and view properties as POJOs
  const map = {
    basemap: "streets"
  };
  const options = {
    view: {
      center: [15, 65],
      zoom: 4
    }
  };
  const [ref] = useMap(map, options);
  return <div style={{ height: 400 }} ref={ref} />;
}
```

#### useScene

Load a [`Map`](https://developers.arcgis.com/javascript/latest/api-reference/esri-Map.html) in a [`SceneView`](https://developers.arcgis.com/javascript/latest/api-reference/esri-views-SceneView.html) with the given [`options`](#options-argument).

```jsx
import React from 'react';
import { useScene } from 'esri-loader-hooks';

function SceneView() {
  // takes initial map and view properties as POJOs
  const map = {
    basemap: "streets",
    ground: "world-elevation"
  };
  const options = {
    view: {
      scale: 50000000,
      center: [-101.17, 21.78]
    }
  };
  const [ref] = useScene(map, options);
  return <div style={{ height: 400 }} ref={ref} />;
}
```

### FeatureTables

You can use the `useFeatureTable` hook to load a stand-alone table or use it in conjunction with a view containing the layer that the table is configured with to enable table to map or table to scene interaction.

Like the hooks above, this hook returns an array where the first element is a [ref](https://reactjs.org/docs/refs-and-the-dom.html) you use to set the DOM node to be used as the table's [container](https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-FeatureTable.html#container), and the second element is the instance of the table, which you can use with the [handler](#events-and-watches) hook below, or in your own hooks.

#### useFeatureTable

The `useFeatureTable` hook takes a `layer` parameter which can be a layer item id, a url to a feature layer or scene layer, or a feature or scene layer instance. The second optional parameter is an `options` object used to set any constructor options on the FeatureTable. See [options](#arguments) for general information about this parameter or [FeatureTable properties](https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-FeatureTable.html#properties-summary) for the specific table options you can set.

Load a stand-alone FeatureTable from a layer's URL without a selector column:

```jsx
import React from 'react';
import {useFeatureTable} from 'esri-loader-hooks';

function FeatureTable() {
  const layerUrl = 'https://services.arcgis.com/V6ZHFr6zdgNZuVG0/arcgis/rest/services/CollegesUniversities/FeatureServer/0';
  const tableOptions = {
    visibleElements: { selectionColumn: false }
  };
  const [ref] = useFeatureTable(layerUrl, tableOptions);
  return <div style={{ height: 600 }} ref={ref} />;
}
```

### Events and watches

Once you've used one of the above hooks to load a view, you can register event handlers or watch for property changes with the hooks below.

All of these hooks clean up after themselves by removing the event or watch handle when the callback changes or the component will un-mount.

#### useEvent

```jsx
import React from 'react';
import { useMap, useEvent } from 'esri-loader-hooks';

function ClickableMap({ onClick }) {
  const map = {
    basemap: "streets"
  };
  const options = {
    view: {
      center: [15, 65],
      zoom: 4
    }
  };
  const [ref, view] = useMap(map, options);
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
  const map = {
    basemap: "streets",
    ground: "world-elevation"
  };
  const options = {
    view: {
      scale: 50000000,
      center: [-101.17, 21.78]
    }
  };
  const [ref, view] = useScene(map, options);
  // we use the second element returned above to get the view instance
  useWatch(view, 'updating', onUpdateChange);
  return <div style={{ height: 400 }} ref={ref} />;
}
```

#### useWatches

You can use the same callback to watch changes to multiple properties with `useWatches(anyAccessor, arrayOfPropertyNames, callback)`.

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
  const map = {
    basemap: "hybrid"
  };
  const options = {
    view: {
      center: [longitude, latitude],
      zoom: 3
    }
  };
  const [ref, view] = useMap(map, options);
  // takes a view instance and graphic as a POJO
  // the point will be replaced if the lat/lng props change
  useGraphic(view, { geometry, symbol });
  return <div style={{ height: 400 }} ref={ref} />;
}
```

#### useGraphics

You can add multiple graphics at the same time with `useGraphics(view, arrayOfJsonGraphics)`.

### Working with view hooks

#### Arguments

All of these hooks take an optional `options` hash as the final argument. You can pass initial view properties via `options.view`.

One optional property you can pass to the `options` hash that is not a view or map constructor option is `portalUrl`. Most users will not need to set this and it defaults to ArcGIS Online ('https://www.arcgis.com'). However, if you have a private portal or are a member of the Early Adopters program you may need to load an item or layer from somewhere other than the default ArcGIS Online portal.

**NOTE**: All of the arguments to these hooks will _only_ be used in the map and view constructors. Even if you pass in component props or state the corresponding instance properties will **not** be updated as your component updates.

If you need to "bind" map and/or view properties to props or state, you can add your own `useEffect()` hook like this:

```jsx
import React, { useEffect } from 'react';
import { useMap } from 'esri-loader-hooks';

function ZoomingMap({ zoom = 4 }) {
  const map = {
    basemap: 'streets'
  };
  const options = {
    view: {
      center: [15, 65],
      // pass zoom in options to set initial zoom (in constructor)
      zoom
    }
  };
  const [ref, view] = useMap(map, options);
  // watch for changes to zoom prop and update view
  useEffect(() => {
    if (!view) {
      // view hasn't been created yet
      return;
    }
    if (view.zoom !== Math.round(zoom, 0)) {
      // zoom prop has changed, update view
      view.zoom = zoom;
    }
  }, [zoom, view]);
  return <div style={{ height: 400 }} ref={ref} />;
}
```

#### Clean up

All of these hooks clean up after themselves by destroying the view instance when the component will un-mount.

## FAQ

#### Do these hooks work with version 3.x of the ArcGIS API?

No.

#### How does this compare to react-arcgis?

This library is like a hooks version of [react-arcgis](https://github.com/Esri/react-arcgis), which is a library of a few generic components to get you started using esri-loader. My hypothesis is that a library of generic hooks will be more <em>use</em>ful than generic components. This is because the hooks should be easier to compose into many different custom components.

#### Can I use this with the [@arcgis/webpack-plugin](https://github.com/esri/arcgis-webpack-plugin)?

No. The view and graphics hooks use [esri-loader].

That said, you probably don't need a library like this if you're using the webpack plugin. The view and graphics hooks help deal with the complexity introduced by the fact that [`loadModules()` is always asynchronous](https://github.com/Esri/esri-loader/#loading-modules-from-the-arcgis-api-for-javascript).

The event and watch hooks could be used without esri-loader. For now you can copy and paste them into your application. If we add more hooks there, it may make sense to move those into their own library that could be used in both types of applications.

#### Can I use this in my production app?

I'm not (yet), mainly because I don't have a production React app, but you go ahead.

#### What is the minimum version of React I can use?

[React v16.8](https://reactjs.org/blog/2019/02/06/react-v16.8.0.html) added hooks, so that is the minimum version you should use with this library.

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md).

## Development

See [the development instructions](./CONTRIBUTING.md#development).

[esri-loader]:https://github.com/Esri/esri-loader

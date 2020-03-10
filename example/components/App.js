import * as React from 'react';
import "react-tabs/style/react-tabs.css";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import WebMap from './WebMap';
import MapView from './MapView';
import WebScene from './WebScene';
import SceneView from './SceneView';
import EventsMap from './EventsMap';
import GraphicsMap from './GraphicsMap';

function App() {
  return (
    <Tabs>
      <h1>esri-loader-hooks</h1>
      <p>
        Custom hooks for using the ArcGIS API for JavaScript in React
        components.
      </p>
      <TabList>
        <Tab>Web Map</Tab>
        <Tab>Web Scene</Tab>
        <Tab>Map</Tab>
        <Tab>Scene</Tab>
        <Tab>Events</Tab>
        <Tab>Graphics</Tab>
      </TabList>

      <TabPanel>
        <p>
          <code>const [ref] = useWebMap(id);</code>
        </p>
        <WebMap id="e691172598f04ea8881cd2a4adaa45ba" />
        <p>
          Based on the{" "}
          <a href="https://developers.arcgis.com/javascript/latest/sample-code/webmap-basic/index.html">
            Load a basic WebMap
          </a>{" "}
          sample.
        </p>
      </TabPanel>
      <TabPanel>
        <p>
          <code>const [ref] = useWebScene(id);</code>
        </p>
        <WebScene id="3a9976baef9240ab8645ee25c7e9c096" />
        <p>
          Based on the{" "}
          <a href="https://developers.arcgis.com/javascript/latest/sample-code/webscene-basic/index.html">
            Load a basic WebScene
          </a>{" "}
          sample.
        </p>
      </TabPanel>
      <TabPanel>
        <p>
          <code>{`const [ref] = useMap({basemap: "streets"}, {view: {center, zoom}});`}</code>
        </p>
        <MapView />
        <p>
          Based on the{" "}
          <a href="https://developers.arcgis.com/javascript/latest/sample-code/intro-mapview/index.html">
            Intro to MapView
          </a>{" "}
          sample.
        </p>
      </TabPanel>
      <TabPanel>
        <p>
          <code>{`const [ref] = useScene({basemap, ground}, {view: {center, zoom});`}</code>
        </p>
        <SceneView />
        <p>
          Based on the{" "}
          <a href="https://developers.arcgis.com/javascript/latest/sample-code/intro-sceneview/index.html">
            Intro to SceneView
          </a>{" "}
          sample.
        </p>
      </TabPanel>
      <TabPanel>
        <p>
          <code>{`useEvent(view, "click", onClick); useWatch(view, 'zoom', onZoomChange);`}</code>
        </p>
        <EventsMap />
        <p>
          Based on the{" "}
          <a href="https://developers.arcgis.com/javascript/latest/sample-code/event-explorer/index.html">
            Event explorer / watch properties
          </a>{" "}
          sample.
        </p>
      </TabPanel>
      <TabPanel>
        <p>
          <code>{`useGraphics(view, [pointJson, lineJson, polygonJson]);`}</code>
        </p>
        <GraphicsMap />
        <p>
          Based on the{" "}
          <a href="https://developers.arcgis.com/javascript/latest/sample-code/intro-graphics/index.html">
            Intro to graphics
          </a>{" "}
          sample.
        </p>
      </TabPanel>
    </Tabs>
  );
}

export default App;

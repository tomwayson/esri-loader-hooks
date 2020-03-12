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
  return <div className="container">
    <Tabs>
      <h1>esri-loader-hooks</h1>
      <p>
        Custom React <a href="https://reactjs.org/docs/hooks-intro.html">hooks</a> for using the <a href="https://developers.arcgis.com/javascript/">ArcGIS API for JavaScript</a> with <a href="https://github.com/Esri/esri-loader">esri-loader</a>.
        See the documentation and source on <a href="https://github.com/tomwayson/esri-loader-hooks">github</a>.
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
<pre><code>{`  const [ref] = useWebMap(id);
  return <div style={{ height: 400 }} ref={ref} />;
`}</code></pre>
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
        <pre><code>{`  const [ref] = useWebScene(id);
  return <div style={{ height: 400 }} ref={ref} />;
`}</code></pre>
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
        <pre><code>{`  const [ref] = useMap({basemap: "streets"}, {view: {center, zoom}});
  return <div style={{ height: 400 }} ref={ref} />;
`}</code></pre>
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
        <pre><code>{`  const [ref] = useScene({basemap, ground}, {view: {center, zoom});
  return <div style={{ height: 400 }} ref={ref} />;
`}</code></pre>
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
        <pre><code>{`  const [ref, view] = useScene({basemap, ground}, {view: {center, zoom});
  useEvent(view, "click", onClick);
  useWatch(view, 'zoom', onZoomChange);
  return <div style={{ height: 400 }} ref={ref} />;
`}</code></pre>
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
        <pre><code>{`  const [ref, view] = useMap({basemap: "hybrid"}, {view: {center, zoom});
  useGraphics(view, [pointJson, lineJson, polygonJson]);
  return <div style={{ height: 400 }} ref={ref} />;
`}</code></pre>
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
  </div>;
}

export default App;

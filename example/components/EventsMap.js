import React, { useCallback, useState } from 'react';
import { useScene, useEvents, useWatches } from '../../.';

// hooks allow us to create a map component as a function
function EventsMap() {
  const [eventLog, setEventLog] = useState(
    'Interact with the view to see the events.'
  );
  const logEvent = useCallback(e => {
    setEventLog(`Last event: ${e.type}.`);
  }, []);
  const [zoom, setZoom] = useState(null);
  const logPropertyChange = useCallback((newValue, oldValue, propertyName) => {
    if (propertyName === 'zoom') {
      setZoom(newValue);
    }
    console.log(propertyName, newValue);
  }, []);
  // takes initial map and view properties as POJOs
  const map = {
    basemap: 'streets',
    ground: 'world-elevation'
  };
  const options = {
    view: {
      camera: {
        position: [-101.17, 20.76793656, 12908164.47184],
        heading: 0.0,
        tilt: 0.5
      },
      pixelratio: 2
    }
  };
  // returns a ref you can use to assign a container DOM node
  // and returns the map view instance, which you can pass to other hooks
  const [ref, view] = useScene(map, options);
  // wire up the events
  const events = [
    'pointer-enter',
    'pointer-leave',
    'pointer-move',
    'pointer-down',
    'pointer-up',
    'immediate-click',
    'click',
    'double-click',
    'mouse-wheel',
    'drag',
    'hold',
    'key-down',
    'key-up',
    'focus',
    'blur',
    'resize'
    // 'layerview-create',
    // 'layerview-destroy'
  ];
  useEvents(view, events, logEvent);
  // wire up the property watches
  const properties = [
    'focused',
    'interacting',
    'updating',
    'ready',
    'resolution',
    'scale',
    'zoom',
    'stationary'
  ];
  useWatches(view, properties, logPropertyChange);
  return (
    <>
      <div style={{ height: 400 }} ref={ref} />
      <p><strong>Zoom: {zoom}. {eventLog}</strong></p>
      <p>Open the console to see the complete log of all property changes.</p>
    </>
  );
}

export default EventsMap;

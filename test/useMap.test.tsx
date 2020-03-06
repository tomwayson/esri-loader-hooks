import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { useMap } from '../src';

// TODO: use react-testing-library and stub out calls to esri-loader

function MapTest() {
  // takes initial map and view properties as a POJO
  const properties = {
    map: {
      basemap: 'streets',
    },
    view: {
      center: [15, 65],
      zoom: 4,
    },
  };
  // returns a ref you can use to assign a container DOM node
  const [ref] = useMap(properties);
  return <div style={{ height: 400 }} ref={ref} />;
}

describe('it', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<MapTest />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});

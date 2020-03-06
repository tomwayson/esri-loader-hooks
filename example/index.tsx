import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { setDefaultOptions } from "esri-loader";

// configure esri-loader
setDefaultOptions({ css: true });
import { useWebMap } from '../.';

// hooks allow us to create a map component as a function
function WebMap({ id }) {
  // this custom hook takes an item id and
  // returns a ref you can use to assign a container DOM node
  const [ref] = useWebMap(id);
  return <div style={{ height: 400 }} ref={ref} />;
}


const App = () => {
  return (
    <div>
      <WebMap id="e691172598f04ea8881cd2a4adaa45ba" />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));

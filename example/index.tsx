import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { setDefaultOptions } from "esri-loader";
import * as styles from "./index.css";
import App from './components/App';

// configure esri-loader
setDefaultOptions({ css: true });

ReactDOM.render(<App />, document.getElementById('root'));

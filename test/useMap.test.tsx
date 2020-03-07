import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { useEvent } from '../src';

// TODO: add react-testing-library
// and make real tests

// stub (sorta) view's .on() by simulating
// returning an event handler
const on = () => ({ remove: () => {} });

function EventTest() {
  const mockView = {
    on,
  };
  const callback = () => {};
  useEvent(mockView, 'click', callback);
  return <div style={{ height: 400 }} />;
}

describe('it', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<EventTest />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});

import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/root/root';
import * as serviceWorker from './serviceWorker';
import { initApiClient } from './api';

const init = async () => {
  await initApiClient();
  ReactDOM.render(<Root />, document.getElementById('root'));
}

init();

serviceWorker.unregister();

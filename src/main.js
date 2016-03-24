import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';

import routes from './routes';
import configureStore from './store/configureStore';
import Root from './containers/Root';

const store = configureStore(routerReducer);
const history = syncHistoryWithStore(browserHistory, store);

render((
  <Root
      store={store}
      history={history}
      routes={routes} />
), document.getElementById('app'));

import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import routes from './routes';
import configureStore from './store/configureStore';
import Root from './containers/Root';
import { resetErrors } from './actions/errors';

const store = configureStore(browserHistory);
const history = syncHistoryWithStore(browserHistory, store);

history.listen(() => store.dispatch(resetErrors()));

render((
  <Root
      store={store}
      history={history}
      routes={routes} />
), document.getElementById('app'));

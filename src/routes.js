import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './containers/App';
import Home from './containers/Home';
import About from './components/About';
import Terms from './components/Terms';
import Privacy from './components/Privacy';
import Video from './containers/Video';
import IdParser from './containers/IdParser';
import { setId, fetchCaptions } from './actions/youtube';

const videoOnEnter = (dispatch, id) => {
  dispatch(setId(id));
  dispatch(fetchCaptions(id));
};

const routes = (store) => (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="/about" component={About} />
    <Route path="/terms" component={Terms} />
    <Route path="/privacy" component={Privacy} />

    <Route
        path="/v/:id"
        component={Video}
        onEnter={(nextState) =>
          videoOnEnter(store.dispatch, nextState.params.id)} />

    <Route path="*" component={IdParser} />
  </Route>
);

export default routes;

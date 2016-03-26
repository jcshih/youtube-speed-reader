import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './containers/App';
import Home from './containers/Home';
import About from './components/About';
import Video from './containers/Video';
import IdParser from './containers/IdParser';

const routes = (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="/about" component={About} />
    <Route path="/v/:id" component={Video} />
    <Route path="*" component={IdParser} />
  </Route>
);

export default routes;

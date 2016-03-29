import React, { Component, PropTypes } from 'react';
import { Router } from 'react-router';
import { Provider } from 'react-redux';
import DevTools from './DevTools';

class Root extends Component {

  static propTypes = {
    store: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    routes: PropTypes.func.isRequired
  };

  render() {
    const { store, history, routes } = this.props;

    return (
      <Provider store={store}>
        <div>
          <Router history={history}>
            {routes(store)}
          </Router>
          <DevTools />
        </div>
      </Provider>
    );
  }
}

export default Root;

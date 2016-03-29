import React, { Component, PropTypes } from 'react';
import { Router } from 'react-router';
import { Provider } from 'react-redux';

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
        <Router history={history}>
          {routes(store)}
        </Router>
      </Provider>
    );
  }
}

export default Root;

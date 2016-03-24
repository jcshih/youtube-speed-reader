import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import * as reducers from '../reducers';
import DevTools from '../containers/DevTools';

const finalCreateStore = compose(
  applyMiddleware(thunk),
  DevTools.instrument()
)(createStore);

const configureStore = (routerReducer, initialState) => {
  const rootReducer = combineReducers({
    ...reducers,
    routing: routerReducer
  });

  return finalCreateStore(rootReducer, initialState);
};

export default configureStore;

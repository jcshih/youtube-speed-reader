import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import * as reducers from '../reducers';

const configureStore = (history, initialState) => {
  const finalCreateStore = compose(
    applyMiddleware(thunk, routerMiddleware(history))
  )(createStore);

  const rootReducer = combineReducers({
    ...reducers,
    routing: routerReducer
  });

  return finalCreateStore(rootReducer, initialState);
};

export default configureStore;

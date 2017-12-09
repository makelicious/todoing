import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import ideas from './modules/ideas';
const store = createStore(
  ideas,
  applyMiddleware(thunk),
);

export default store;

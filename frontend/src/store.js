import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import filters from './modules/filters';
import ideas from './modules/ideas';
import tags from './modules/tags';

const reducers = combineReducers({
  filters,
  ideas,
  tags,
});

const store = createStore(
  reducers,
  applyMiddleware(thunk),
);

export default store;

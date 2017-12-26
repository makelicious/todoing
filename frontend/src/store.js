import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import ideas from './modules/ideas';
import tags from './modules/tags';

const reducers = combineReducers({
  ideas,
  tags,
});

const store = createStore(
  reducers,
  applyMiddleware(thunk),
);

export default store;

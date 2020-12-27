import {createStore} from 'redux';
import rootReducer from './rootReducer';

const INIT__STORE = {
  logMenu: false,
  addMenu: false,
  goods: [],
}

const store = createStore(rootReducer, INIT__STORE);
export default store;
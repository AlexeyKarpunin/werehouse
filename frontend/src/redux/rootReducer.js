import { combineReducers } from 'redux';
import {ACTION_SHOW_LOG, ACTION_ADD_MENU, ACTION_STORE_GOOD, FLAGS_FOR_MENUS} from './types';

const rootReducer = (state, action) => {
  switch (action.type) {
    case ACTION_SHOW_LOG:
      if (action.flag === FLAGS_FOR_MENUS.open) state.logMenu = FLAGS_FOR_MENUS.open;
      if (action.flag === FLAGS_FOR_MENUS.close) state.logMenu = FLAGS_FOR_MENUS.close;
      return state;
    case ACTION_ADD_MENU:
      if (action.flag === FLAGS_FOR_MENUS.open) state.addMenu = FLAGS_FOR_MENUS.open;
      if (action.flag === FLAGS_FOR_MENUS.close) state.addMenu = FLAGS_FOR_MENUS.close;
      return state;  
    case ACTION_STORE_GOOD:
      const { goods } = action
      return { goods }
    default:
      return state;
  }
};

export default rootReducer;
  
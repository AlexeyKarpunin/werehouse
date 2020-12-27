import {goodsStore, showlog, addMenu, FLAGS_FOR_MENUS} from './types';

const rootReducer = (state, action) => {
  switch (action.type) {
    case showlog:
      if (action.flag === FLAGS_FOR_MENUS.open) state.logMenu = FLAGS_FOR_MENUS.open;
      if (action.flag === FLAGS_FOR_MENUS.close) state.logMenu = FLAGS_FOR_MENUS.close;
      return state;
    case addMenu:
      if (action.flag === FLAGS_FOR_MENUS.open) state.addMenu = FLAGS_FOR_MENUS.open;
      if (action.flag === FLAGS_FOR_MENUS.close) state.addMenu = FLAGS_FOR_MENUS.close;
      return state;  
    case goodsStore:
      state.goods = action.goods;
      return state;  
    default:
      return state;
  }
};

export default rootReducer;
  
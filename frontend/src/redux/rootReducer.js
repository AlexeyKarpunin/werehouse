import { combineReducers } from 'redux';
import {
  FLAGS_FOR_MENUS, 
  SHOW_LOG_ACTION, 
  STORE_GOODS_ACTION,
  BASKET_PLUS_ACTION,
  BASKET_MINUS_ACTION,
  BASKET_CLEAR_ACTION,
} from './types';


const INIT_MENU_STATE = {
  logMenu: FLAGS_FOR_MENUS.close,
  addMenu: FLAGS_FOR_MENUS.close,
}

function menusReduser  (state=INIT_MENU_STATE, action) {
  switch (action.type) {
        case SHOW_LOG_ACTION:
          if (action.flag === FLAGS_FOR_MENUS.open) state.logMenu = FLAGS_FOR_MENUS.open;
          if (action.flag === FLAGS_FOR_MENUS.close) state.logMenu = FLAGS_FOR_MENUS.close;
          return state;   
        default:
          return state;
      }
}

const INIT__BEFORE_RENDER_STATE = {
  goods: undefined,
}

function goods  (state=INIT__BEFORE_RENDER_STATE, action) {
  switch (action.type) {
        case STORE_GOODS_ACTION:
          state.goods = action.goods;
          return state;  
        default:
          return state;
      }
}

const INIT_BASKET = new Map();

function basket ( state=INIT_BASKET, action) {
  switch (action.type) {
    case BASKET_PLUS_ACTION:
      if (state.has(action.id)) {
        const item = state.get(action.id);
        item.amount += 1;
      } else {
        state.set(action.id, {name: action.name, amount: action.amount + 1})
      }
    return state;
    case BASKET_MINUS_ACTION:
      if (state.has(action.id)) {
        const item = state.get(action.id);
        if (item.amount >= 1) {
          item.amount -= 1;
        } else {
          state.delete(action.id)
        }
      }
    return state;
    case BASKET_CLEAR_ACTION:
    state.clear();
    return state;
    default:
      return state;
  }
}


export const rootReducer = combineReducers({
  menu: menusReduser,
  goodsState: goods,
  basket: basket,
});
  
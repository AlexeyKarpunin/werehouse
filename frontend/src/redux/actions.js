import {ACTION_ADD_MENU, ACTION_SHOW_LOG, ACTION_STORE_GOOD} from './types';

export function showLog (flag) {
  return { type: ACTION_SHOW_LOG, flag: flag }
}

export function showAddMenu (flag) {
  return { type: ACTION_ADD_MENU, flag: flag }
}

export function addGoods (goods) {
  return { type: ACTION_STORE_GOOD, goods: goods }
}
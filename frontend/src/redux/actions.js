import {showlog, addMenu, goodsStore} from './types';

export function showLog (flag) {
  return {
    type: showlog,
    flag: flag,
  }
}

export function showAddMenu (flag) {
  return {
    type: addMenu,
    flag: flag,
  }
}

export function addGoods (goods) {
  return {
    type: goodsStore,
    goods: goods,
  }
}
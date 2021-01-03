import {
  SHOW_LOG_ACTION, 
  STORE_GOODS_ACTION,
  BASKET_PLUS_ACTION,
  BASKET_MINUS_ACTION,
  UPDATE_ITEMS_WAREHOUSE,
  BASKET_CLEAR_ACTION,
} from './types';
import {getGoods, createItem, updateItemsAmount} from '../api/api';

export function showLog (flag) {
  return {
    type: SHOW_LOG_ACTION,
    flag: flag,
  }
}

export function addGoods () {
  return function (dispatch) {
    getGoods().then( (res) => res.json()).then( (data) => {
      dispatch({
        type: STORE_GOODS_ACTION,
        goods: data,
      });
    })
  }
}

export function addItem (name) {
  return function (dispatch) {
    createItem(name).then( () => {
      dispatch(addGoods());
    });
  }
}

export function addProductInBasket (item) {
  return {
    type: BASKET_PLUS_ACTION,
    id: item.itemId,
    name: item.name,
    amount: item.amount,
  }
}

export function deleteProductInBasket (item) {
  return {
    type: BASKET_MINUS_ACTION,
    id: item.itemId,
    name: item.name,
    amount: item.amount,
  }
}

export function updateItemsAmout (basket, info) {
  return function (dispatch) {
    const newProducts = [];
    for (let [key, value] of basket) {
      newProducts.push({
        item_id: key,
        ...value
      });
    }
    updateItemsAmount(newProducts, info)
        .then( () => dispatch(clearBasket()))
        .then( () => dispatch(addGoods()))
        .catch( (err) => err);
  }
}

export function clearBasket() {
  return {
    type: BASKET_CLEAR_ACTION,
  }
}
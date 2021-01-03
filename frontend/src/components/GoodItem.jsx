import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {addProductInBasket, deleteProductInBasket} from '../redux/actions'


export function Item (props) {
  const dispatch = useDispatch();
  const counter = useSelector( (state) => {
    const item = state.basket.get(props.itemId);
    if (item) {
      return item.amount;
    } else {
      return 0;
    }
  })

  function minus () {
    if (counter > 0) {
      dispatch(deleteProductInBasket({
        itemId: props.itemId,
        name: props.name,
        amount: counter,
      }));
    } 
  }

  function plus () {
    dispatch(addProductInBasket({
        itemId: props.itemId,
        name: props.name,
        amount: counter,
    }))
  }

  return (
    <li className="goods__item" key={props.key}>
      <button onClick={minus}>-</button>
      <div>{props.name} <span>{counter}</span></div>
      <button onClick={plus}>+</button>
    </li>
  )
}

export default function GoodItem () {
 const goods = useSelector( (state) => state.goodsState.goods);

  return goods.map( (item, index) => {
    return <Item 
    key={index} 
    name={item.name} 
    defoultValue = {0} 
    itemId = {item.item_id}
    />
  })
}




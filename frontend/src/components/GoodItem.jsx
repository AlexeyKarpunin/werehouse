
import React, {useEffect, useState} from 'react';
import store from '../redux/store';

export function Item (props) {
  const [counter, setCounter] = useState(props.defoultValue)
  
  function minus () {
    if (counter > 0) setCounter(counter - 1);
  }

  function plus () {
    setCounter(counter + 1);
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
  const [goods, setGoods] = useState([]);

    useEffect(() => {
      store.subscribe( () => {
        const state = store.getState();
        setGoods(state.goods);
      })
    });
    
  return goods.map( (item, index) => {
    return <Item key={index} name={item.name} defoultValue = {0} />
  })
}


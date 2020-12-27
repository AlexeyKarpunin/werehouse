import React, { useEffect, useState } from 'react';
import store from '../redux/store'
import {Item} from './GoodItem';


export default function WereHouse () {

  const [goods, setGoods] = useState([]);

    useEffect(() => {
      store.subscribe( () => {
        const state = store.getState();
        setGoods(state.goods);
      })
    });

  return (
        <div className="werehouse__container">
             <h1>WereHouse</h1>
             <ul className="WH__list">
               {goods.map( (item, index) => {
                 if (item.amount >= 0) {
                  return (
                    <Item key={index} name={item.name} defoultValue = {item.amount} />
                  )
                 }
               })}
             </ul>
             <button style={{margin: '0 auto', display: 'block'}}>SALE</button>
        </div>
  );
}
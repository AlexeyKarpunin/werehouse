import React from 'react';
import { useSelector } from 'react-redux';

export function Item (props) {
  return (
    <li className="goods__item" key={props.key}>
      <div>{props.name} <span>{props.defoultValue}</span></div>
    </li>
  )
}


export default function WereHouse () {
  const goods = useSelector( (state) => state.goodsState.goods);

  return (
        <div className="werehouse__container">
             <h1>WareHouse</h1>
             <ul className="WH__list">
               {goods.map( (item, index) => {
                 if (item.amount > 0) {
                  return (
                    <Item key={index} name={item.name} defoultValue = {item.amount} />
                  )
                 }
               })}
             </ul>
        </div>
  );
}
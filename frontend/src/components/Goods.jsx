import React, {useEffect, useState} from 'react';
import store from '../redux/store';
import {showAddMenu, addGoods} from '../redux/actions';
import {FLAGS_FOR_MENUS} from '../redux/types';
import GoodsAddbtn from './GoodsAddBtn';
import {getGoods} from '../api/api';
import GoodItem from './GoodItem';

export default function Goods () {

  useEffect ( () => {
    getGoods.then( (res) => res.json())
          .then( (data) => {
            store.dispatch(addGoods(data))
          })
          .catch ( (err) => {throw err})
  }, []);

 
  function openAddPanel () {
    store.dispatch(showAddMenu(FLAGS_FOR_MENUS.open));
  }

  return (
         <div className="goods__container">
             <h1>Goods</h1>
             <ul className="goods__list">
               <GoodItem />
             </ul>
             <div className="goods__btns">
               <button className="btn buy__btn">buy</button>
               <button className="btn add__btn" onClick={openAddPanel}>add</button>
               <GoodsAddbtn/>
             </div>
        </div>
  );
};
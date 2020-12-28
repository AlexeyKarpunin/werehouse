import React, {useEffect, useState} from 'react';
import store from '../redux/store';
import {FLAGS_FOR_MENUS} from '../redux/types';
import {createItem, getGoods} from '../api/api'
import {addGoods} from '../redux/actions'

export default function GoodsAddbtn () {
  const [goodsRef, setGoodsRef] = useState(React.createRef());
  const [productName, setProductName] = useState('');
  const itemName = React.createRef();

  useEffect (() => {
    store.subscribe (() => {
      const state = store.getState();
      if (state.addMenu === FLAGS_FOR_MENUS.open) goodsRef.current.classList.remove('input--none-show');
      if (state.addMenu === FLAGS_FOR_MENUS.close) goodsRef.current.classList.add('input--none-show');
    })
  },);

  async function addItem() {
    let name = itemName.current.value;

    createItem(name)
        .then( () => {
          getGoods().then( (respone) => {
            return respone.json()
          })
          .then( (data) => {
            store.dispatch(addGoods(data));
            setProductName('');
          })
          .catch ( (err) => {throw err})
        })
        .catch ( (err) => {throw err});
  }

  function focusInput (event) {
    setProductName(productName + event.key);
  }

  return (
            <div ref={goodsRef} className="goods__input input--none-show">
               <div className="input__container">
                   <input onKeyPress={focusInput} ref={itemName} type='text' value={productName}></input>
                   <button onClick={addItem}>ADD</button>
               </div>
             </div>
  );
}
import React from 'react';
import { useDispatch } from 'react-redux';
import {addItem} from '../redux/actions';

export default function GoodsAddbtn () {
  const itemName = React.createRef();
  const dispatch = useDispatch();

  function addGoods() {
    dispatch(addItem(itemName.current.value));
    itemName.current.value = '';
  }

  return (
            <div className="goods__input">
               <div className="input__container">
                   <input ref={itemName} type='text'></input>
                   <button onClick={addGoods}>ADD</button>
               </div>
             </div>
  );
}
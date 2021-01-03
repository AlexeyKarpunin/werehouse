import React from 'react';
import GoodsAddbtn from './GoodsAddBtn';
import GoodItem from './GoodItem';
import { useDispatch, useSelector } from 'react-redux';
import {updateItemsAmout} from '../redux/actions';

export default function Goods () {
  const basket = useSelector( (state) => state.basket );
  const dispatch = useDispatch();

  function buyProducts () {dispatch(updateItemsAmout(basket, 'buy'));}

  function saleProducts () {}

  return (
         <div className="goods__container">
             <h1>Goods</h1>
             <ul className="goods__list">
               <GoodItem />
             </ul>
             <div className="goods__btns">
               <div>
               <button className="btn buy__btn" onClick={buyProducts}>buy</button>
               <button className="btn buy__btn" onClick={saleProducts}>sale</button>
               </div>
               <GoodsAddbtn/>
             </div>
        </div>
  );
};

// const mapStateToProps = (state /*, ownProps*/) => {
//   return {}
// }



import React, { useEffect} from 'react';
import './css/app.css';
import store from './redux/store';
import Goods from './components/Goods';
import WereHouse from './components/WereHouse';
import Log from './components/Log';
import {addGoods} from './redux/actions'
import {useDispatch, useSelector} from 'react-redux';

export default function App () {
  const dispatch = useDispatch();
  const goodsStatus = useSelector( (state) => state.goodsState.goods ? true : false);

  useEffect ( () => {
    setInterval( () => {
      console.log(store.getState())
    }, 5000)
  });

  useEffect ( () => {
    if (!goodsStatus) dispatch(addGoods())}, []);

  return (
    <section className="main__page">
      {goodsStatus ? <main className="product__section">
        <Goods/>
        <WereHouse/>
        <Log/>
      </main> : <div>loading</div> }
    </section>
  );
}
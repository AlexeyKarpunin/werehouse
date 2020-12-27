import React, { useEffect } from 'react';
import './css/app.css';
import store from './redux/store';
import {testAction} from './redux/actions';
import Goods from './components/Goods';
import WereHouse from './components/WereHouse';
import Log from './components/Log';

export default function App () {

  useEffect ( () => {
    setInterval( () => {
      console.log(store.getState())
    }, 5000)
  })

  return (
    <section className="main__page">
      <main className="product__section">
        <Goods/>
        <WereHouse/>
        <Log/>
      </main>
    </section>
  );
}
import React, {useEffect} from 'react';
import {showAddMenu, addGoods} from '../redux/actions';
import {FLAGS_FOR_MENUS} from '../redux/types';
import GoodsAddbtn from './GoodsAddBtn';
import {getGoods} from '../api/api';
import GoodItem from './GoodItem';
import { connect } from 'react-redux';

function Goods ({ updateGoods, openAddPanel }) {

  useEffect ( () => {
    (async () => {
      const response = await getGoods()
      updateGoods(await response.json())
    })()
  }, []);

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

// const mapStateToProps = (state /*, ownProps*/) => {
//   return {}
// }

const mapDispatchToProps = (dispatch) => {
  return {
    updateGoods: (data) => dispatch(addGoods(data)),
    openAddPanel: () => dispatch(showAddMenu(FLAGS_FOR_MENUS.open))
  }
}

export default connect(null, mapDispatchToProps)(Goods)


import React, {useState} from 'react';
import { connect } from 'react-redux';
import selectGoods from '../redux/selectGoods';

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

export function GoodItem ({ goods }) {
  return goods.map( (item, index) => {
    return <Item key={index} name={item.name} defoultValue = {0} />
  })
}


const mapStateToProps = (state /*, ownProps*/) => {
  return {
    goods: selectGoods(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(GoodItem)


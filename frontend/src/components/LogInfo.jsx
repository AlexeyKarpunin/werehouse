import React from 'react';
import {useDispatch} from 'react-redux';
import {FLAGS_FOR_MENUS} from '../redux/types';
import {showLog} from '../redux/actions';

export default function LogInfo (props) {
  const logStatus = props.logStatus;
  const dispatch = useDispatch();

  function showLogClass () { return logStatus === FLAGS_FOR_MENUS.open ? 'log__info' : 'log__info log--none--show' };
  
  return (
             <div className={showLogClass()}>
               <button className="btn close__log__btn" onClick={() => dispatch(showLog(FLAGS_FOR_MENUS.close))}>+</button>
             </div>
  );
}
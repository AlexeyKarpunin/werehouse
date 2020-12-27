import React, {useState, useEffect} from 'react';
import LogInfo from './LogInfo';
import store from '../redux/store';
import {showLog} from '../redux/actions';
import {FLAGS_FOR_MENUS} from '../redux/types';

export default function Log () {

const [logBtn, setLogBtn] = useState(true);

function showLogMenu () {
  setLogBtn(false);
  store.dispatch(showLog(FLAGS_FOR_MENUS.open))
}

  return (
        <div className="log__container">
             <LogInfo 
                showLogBtn = {setLogBtn}
             />
             {logBtn ? <button className="btn log__btn" onClick={showLogMenu}>log</button> : null}
        </div>
  );
}
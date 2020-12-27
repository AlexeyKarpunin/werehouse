import React, {useEffect, useState} from 'react';
import store from '../redux/store';
import {showLog} from '../redux/actions';
import {FLAGS_FOR_MENUS} from '../redux/types';

export default function LogInfo (props) {
  const [logRef, setRef] = useState(React.createRef())

  useEffect (() => {
    store.subscribe( () => {
      const state = store.getState();
      if (state.logMenu === FLAGS_FOR_MENUS.open) logRef.current.classList.remove('log--none--show');
      if (state.logMenu === FLAGS_FOR_MENUS.close) logRef.current.classList.add('log--none--show');
    })
  },);

  function closeMenu () {
    props.showLogBtn(true);
    store.dispatch(showLog(FLAGS_FOR_MENUS.close));
  }

  return (
             <div ref={logRef} className="log__info log--none--show">
               <button className="btn close__log__btn" onClick={closeMenu}>+</button>
             </div>
  );
}
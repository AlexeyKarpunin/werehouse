import React from 'react';
import LogInfo from './LogInfo';
import {useDispatch, useSelector } from 'react-redux';
import {showLog} from '../redux/actions';
import {FLAGS_FOR_MENUS} from '../redux/types';

export default function Log () {
  const logStatus = useSelector( (state) => state.menu.logMenu);
  const dispatch = useDispatch();

  return (
        <div className="log__container">
             <LogInfo logStatus = {logStatus} />
             { logStatus === FLAGS_FOR_MENUS.close 
                          ? 
              <button className="btn log__btn" onClick={() => dispatch(showLog(FLAGS_FOR_MENUS.open))}>log</button> 
                          : 
              null}
        </div>
  );
}

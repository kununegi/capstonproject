import React from 'react';
import  ReactDOM  from 'react-dom';

const Backdrop = props => {
  return ReactDOM.createPortal (
    <div className='backdrop' onClick={props.onclick}></div>,
    document.getElementById('backdrop-hook')
    
  );
};

export default Backdrop

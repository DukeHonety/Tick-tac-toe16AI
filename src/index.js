import React from 'react';
import reactDom from 'react-dom';
import './index.css';
import TickTacker from './js/TickTacker.js';

reactDom.render(
    <TickTacker winnum="5" boxnum="16"></TickTacker>
    ,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();

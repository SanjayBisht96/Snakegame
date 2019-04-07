import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import configureStore from './Lib/store';
import Root from './Root/Root';
import * as serviceWorker from './serviceWorker';

const store = configureStore();
const target = document.querySelector('#root');
ReactDOM.render(<Root store={store}/>, target);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

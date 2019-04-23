import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Dummy from './Dummy'
import App2 from './filterBE'
import Rajaongkir from './rajaongkir'
import { BrowserRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
                <BrowserRouter>    
                    <Rajaongkir />
                </BrowserRouter>
                , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

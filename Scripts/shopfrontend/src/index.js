import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import logo from './logo.svg';
import './App.css';
import './bootstrap.css';

import Customer from "./components/customer/customer"
import registerServiceWorker from './registerServiceWorker';
import Product from "./components/product/product"
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import Home from './components/Home';
import Store from './components/store/store'
import ProductSold from './components/product-sold/product-sold'



ReactDOM.render((
    <Router history={browserHistory}>
        <Router path="/" component={Home} />
        <Router path="/customers" component={Customer} />
        <Router path="/products" component={Product} />
        <Router path="/stores" component={Store} />
        <Router path="/productSolds" component={ProductSold} />
    </Router>
), document.getElementById('root'));
registerServiceWorker();
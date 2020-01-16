import React, { Component } from 'react';
import {BrowserRouter, Link, Route} from 'react-router-dom';
import Home from './Home';
import About from './About';


export default class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Link to="/home">首页</Link>
                <br/>
                <Link to="/about">关于</Link>

                <Route path="/home" component={Home}/>
                <Route path="/about" component={About}/>
            </BrowserRouter>
        );
    }
}

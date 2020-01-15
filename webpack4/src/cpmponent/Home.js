
import React, { Component } from 'react';
import _ from 'lodash';

import {Link, Route, Switch} from 'react-router-dom';
import Detail from './Detail';

export default class Home extends Component {

    componentDidMount = () => {
        const a = 1;
        const b = 2;
        console.log('sum = ', _.add(a, b));
    };

    render() {
        let { path, url } = this.props.match;

        return (
            <div>
                Hello React!<br/>
                Hello Webpack4!

                <Link to={`${url}/detail/1`}>详情页1</Link>
                <Link to={`${url}/detail/2`}>详情页2</Link>

                <Switch>
                    <Route path={`${path}/detail/:id`} component={Detail}></Route>
                </Switch>
            </div>
        );
    }
}

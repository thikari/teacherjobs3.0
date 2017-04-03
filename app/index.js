import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';


import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import JobsContainer from "./containers/jobsContainer";



//Client side routing - make route.js later and import it here

ReactDOM.render((
    <Router history={hashHistory}>
        <Route path="/" component={App}>
            <Route path="/jobs" component={JobsContainer}/>
        </Route>
    </Router>
),

document.getElementById('root')
);
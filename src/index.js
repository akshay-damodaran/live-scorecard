import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import './index.css';
import Home from './containers/Home';
import Admin from './containers/Admin';
import ScoreCard from './containers/ScoreCard';

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route exact path="/admin" component={Admin} />
      <Route exact path="/scorecard" component={ScoreCard} />
      <Route path="/" component={Home} />
      <Redirect to="/" />
    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
);

import React, { Component } from 'react';
import {withRouter, Route, Switch, Redirect} from 'react-router-dom';
import Home from './components/Home';
import Details from './components/Details';
  
const Routes = () => {
  return (
    <div className='content'>
      <Switch>
        <Route path="/home" component={Home} />
        <Route path="/details/:cmc_id" component={Details} />
        <Redirect to="/home" />
      </Switch>
    </div>
  );
};

export default Routes
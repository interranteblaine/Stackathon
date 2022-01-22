import React, { Component } from 'react';
import {withRouter, Route, Switch, Redirect} from 'react-router-dom';
import Home from './components/Home';
  
const Routes = () => {
  return (
    <div>
      <Switch>
        <Route path="/home" component={Home} />
        <Redirect to="/home" />
      </Switch>
    </div>
  );
};

export default Routes
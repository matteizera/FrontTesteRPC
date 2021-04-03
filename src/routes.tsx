import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Schedule from './pages/Schedule';

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Schedule}/>

      </Switch>
    </BrowserRouter>
  );
}

export default Routes
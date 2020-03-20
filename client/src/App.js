import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
import PrivateRoute from './components/PrivateRoute';


import Login from "./components/Login";
import BubblePage from './components/BubblePage';

import "./styles.scss";

function App() {
  return (
    <div className="App">
      <Route exact path="/" component={Login} />
      {/* 
        Build a PrivateRoute component that will 
        display BubblePage when you're authenticated 
      */}
      <Switch>
        <PrivateRoute exact path="/api/bubble-page" component={BubblePage} />
        {/* <Route path="/api/login" component={Login} /> */}
      </Switch>
    </div>
  );
}

export default App;

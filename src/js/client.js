import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, IndexRoute, hashHistory } from "react-router";

import Layout from "./pages/Layout";
import List from "./pages/List";
import Record from "./pages/Record";

const app = document.getElementById('app');
ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={Layout}>
      <IndexRoute component={List}></IndexRoute>
      <Route path="record" name="New Appointment" component={Record}></Route>
      <Route path="record/:record" name="Appointment Details" component={Record}></Route>
    </Route>
  </Router>,
app);
import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Dashboard from "./Dashboard";
import Order from "./Order";
import EditReview from "./EditReview";
import ReactDOM from 'react-dom'

const Index = () => {

    return (
      <Router>

          {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}

          <Switch>
            <Route path="/">
              <Dashboard />
            </Route>
            <Route path="/order/:id">
              <Order />
            </Route>
            <Route path="/review/:id/edit">
              <EditReview />
            </Route>
          </Switch>
      </Router>
    );
  }

if (document.getElementById('customerDashboard')) {
    ReactDOM.render(<Index />, document.getElementById('customerDashboard'))
}

export default Index

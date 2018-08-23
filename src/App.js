import React from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import Header from './components/Header/Header';
import LoginPage from './components/LoginPage/LoginPage';
import RegisterPage from './components/RegisterPage/RegisterPage';
import DashBoard from './components/DashBoard/DashBoard';
import NewOrder from './components/NewOrder/NewOrder';
import CurrentOrders from './components/CurrentOrders/CurrentOrders';
import CompleteOrders from './components/CompleteOrders/CompleteOrders';
import CustomersBoard from './components/CustomersBoard/CustomersBoard';
import BusinessReports from './components/BusinessReports/BusinessReports';

import './styles/main.css';

const App = () => (
  <div>
    <Header title="Tailor Made" />
    <Router>
      <Switch>
        <Redirect exact from="/" to="/home" />
        <Route
          path="/home"
          component={LoginPage}
        />
        <Route
          path="/register"
          component={RegisterPage}
        />
        <Route
          path="/dashboard"
          component={DashBoard}
        />
        <Route
          path="/newOrder"
          component={NewOrder}
        />
        <Route
          path="/currentOrders"
          component={CurrentOrders}
        />
        <Route
          path="/completeOrders"
          component={CompleteOrders}
        />
        <Route
          path="/customersBoard"
          component={CustomersBoard}
        />
        <Route
          path="/businessReports"
          component={BusinessReports}
        />
        {/* OTHERWISE (no path!) */}
        <Route render={() => <h1>404</h1>} />

      </Switch>
    </Router>
  </div>
);

export default App;

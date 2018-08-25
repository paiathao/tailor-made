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
import ManageUsers from './components/ManageUsers/ManageUsers';
import Footer from './components/Footer/Footer'

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
          path="/neworder"
          component={NewOrder}
        />
        <Route
          path="/currentorders"
          component={CurrentOrders}
        />
        <Route
          path="/completeOrders"
          component={CompleteOrders}
        />
        <Route
          path="/customersboard"
          component={CustomersBoard}
        />
        <Route
          path="/manage"
          component={ManageUsers}
        />
        <Route
          path="/businessreports"
          component={BusinessReports}
        />
        {/* OTHERWISE (no path!) */}
        <Route render={() => <h1>404</h1>} />

      </Switch>
    </Router>
    <Footer />
  </div>
);

export default App;

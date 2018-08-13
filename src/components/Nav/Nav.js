import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { triggerLogout } from '../../redux/actions/loginActions';

class Nav extends Component {
  
  logout = () => {
    this.props.dispatch(triggerLogout());
    // this.props.history.push('home');
  }

  render() {

   return (
  <div className="navbar">
    <div>
      <ul>
        <li>
          <Link to="/dashboard">
            DashBoard
          </Link>
        </li>
        <li>
          <Link to="/newOrder">
            New Order
          </Link>
        </li>
        <li>
          <Link to="/currentOrders">
            Current Order
          </Link>
        </li>
        <li>
          <Link to="/completeOrders">
            Complete Order
          </Link>
        </li>
        <li>
          <Link to="/customersBoard">
            Customers
          </Link>
        </li>
        <li>
          <Link to="/businessReports">
            Business Reports
          </Link>
        </li>
      </ul>
      <button
            onClick={this.logout}
          >
            Log Out
          </button>
    </div>
  </div>
    );
  }
}

export default connect()(Nav);

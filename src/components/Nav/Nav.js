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
              <Link to="/neworder">
                New Order
          </Link>
            </li>
            <li>
              <Link to="/currentorders">
                Current Order
          </Link>
            </li>
            <li>
              <Link to="/completeorders">
                Complete Order
          </Link>
            </li>
            <li>
              <Link to="/customersboard">
                Customers
          </Link>
            </li>
            <li>
              <Link to="/manage">
                Manage Users
          </Link>
            </li>
            <li>
              <Link to="/businessreports">
                Business Reports
          </Link>
            </li>
            <li>
              <a href=""
                onClick={this.logout}
              >
                Log Out
              </a>
            </li>
          </ul>

        </div>
      </div>
    );
  }
}

export default connect()(Nav);


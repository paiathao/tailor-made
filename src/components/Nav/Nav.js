import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => (
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
    </div>
  </div>
);

export default Nav;

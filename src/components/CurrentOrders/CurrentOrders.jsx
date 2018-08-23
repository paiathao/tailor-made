import React, { Component } from 'react';
import { connect } from 'react-redux';

import Nav from '../../components/Nav/Nav';
import { USER_ACTIONS } from '../../redux/actions/userActions';

import CurrentTable from '../CurrentTable/CurrentTable'

const mapStateToProps = state => ({
  user: state.user,
  newCustomer: state.newCustomer
});


class CurrentOrders extends Component {
  componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
    this.props.dispatch({type: 'POST_CUSTOMER', payload: this.props.newCustomer})
    this.props.dispatch({type: 'RESET_CUSTOMER'})
  }

  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.history.push('home');
    }
  }

  render() {
    let content = null;
    

    if (this.props.user.userName) {
      content = (
        <div className="main">
         <CurrentTable/>
        </div>
      );
    }

    return (
      <div>
        <Nav />
        {content}
      </div>
    );
  }
}



// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(CurrentOrders);

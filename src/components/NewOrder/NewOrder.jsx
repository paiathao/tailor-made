import React, { Component } from 'react';
import { connect } from 'react-redux';

import Nav from '../../components/Nav/Nav';
import { USER_ACTIONS } from '../../redux/actions/userActions';

import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

import ServiceSelector from '../ServiceSelector/ServiceSelector'

const mapStateToProps = state => ({
  user: state.user,
});

class NewOrder extends Component {
  constructor(props) {
    super(props)
    this.state = {
      newCustomer: {
        firstName: '',
        lastName: '',
        phone: '',
        orderNumber: '',
        orderDetails: [],
        totalCost: '',
        dropDate: moment(),
        pickUp: moment(),
        paid: false,
        complete: false
      },
    };
  }

  componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
    this.props.dispatch({ type: 'FETCH_SERVICES' });
  }

  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.history.push('home');
    }
  }

  handleChangeForDropOff = (date) => {
    console.log('date', date)
    this.setState({
      newCustomer: {
        ...this.state.newCustomer,
        dropDate: date
      }
    })
  }

  handleChangeForPickUp = (date) => {
    console.log('date', date)
    this.setState({
      newCustomer: {
        ...this.state.newCustomer,
        pickUp: date
      }
    })
  }

  handleChangeFor = (propertyName) => {
    return (event) => {
      this.setState({
        newCustomer: {
          ...this.state.newCustomer,
          [propertyName]: event.target.value
        }
      })
    }
  }

  render() {
    let content = null;

    if (this.props.user.userName) {
      content = (
        <div>
            <input type="text" placeholder="First Name"
              value={this.state.newCustomer.firstName}
              onChange={this.handleChangeFor('firstName')}
            />
            <input type="text" placeholder="Last Name"
              value={this.state.newCustomer.lastName}
              onChange={this.handleChangeFor('lastName')}
            />
            <input type="number" placeholder="Phone"
              value={this.state.newCustomer.phone}
              onChange={this.handleChangeFor('phone')}
            />
            <input type="number" placeholder="Order #"
              value={this.state.newCustomer.order}
              onChange={this.handleChangeFor('order')}
            />
            <DatePicker
              selected={this.state.newCustomer.dropDate}
              onChange={this.handleChangeForDropOff}
            />
            <DatePicker
              selected={this.state.newCustomer.pickUp}
              onChange={this.handleChangeForPickUp}
              showTimeSelect
              timeIntervals={60}
              minTime={moment().hours(10).minutes(0)}
              maxTime={moment().hours(20).minutes(0)}
              dateFormat="LLL" />
            <ServiceSelector/>
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

export default connect(mapStateToProps)(NewOrder);

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { USER_ACTIONS } from '../../redux/actions/userActions';

import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import Checkbox from '@material-ui/core/Checkbox';

//import others components
import Nav from '../../components/Nav/Nav';
import ServiceSelector from '../ServiceSelector/ServiceSelector'
import ServiceList from '../ServiceList/ServiceList'
import ServiceTotal from '../ServiceTotal/ServiceTotal'

const mapStateToProps = state => ({
  user: state.user,
  services: state.newService
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
    this.saveServices();
  }

  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.history.push('home');
    }
  }

  saveServices = () => {
    this.setState({
      newCustomer: {
        ...this.state.newCustomer,
        orderDetails: this.props.services
      }
    })
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

  updatePayment = () => {

    if (this.state.newCustomer.paid === false) {
      this.setState({
        newCustomer: {
          ...this.state.newCustomer,
          paid: true
        }
      })
    } else {
      this.setState({
        newCustomer: {
          ...this.state.newCustomer,
          paid: false
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
            value={this.state.newCustomer.orderNumber}
            onChange={this.handleChangeFor('orderNumber')}
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
          <ServiceSelector />
          <ServiceList />
          <ServiceTotal />
          <label>Payent Receive</label>
          <Checkbox
            onChange={this.updatePayment}
          />
          <button>
            Submit
          </button>
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

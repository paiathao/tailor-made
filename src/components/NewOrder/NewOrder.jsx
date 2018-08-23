import React, { Component } from 'react';
import { connect } from 'react-redux';

import { USER_ACTIONS } from '../../redux/actions/userActions';

//import others components
import Nav from '../../components/Nav/Nav';
import ServiceSelector from '../ServiceSelector/ServiceSelector';

//import for styling
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import Checkbox from '@material-ui/core/Checkbox';
import NumberFormat from 'react-number-format';
import Button from '@material-ui/core/Button'

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
        dropDate: moment(),
        pickUp: moment(),
        paid: false,
        complete: false
      },
    };
  }

  componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
  }

  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.history.push('home');
    }
  }

  handleChangeForDropOff = (date) => {
    this.setState({
      newCustomer: {
        ...this.state.newCustomer,
        dropDate: date
      }
    })
  }

  handleChangeForPickUp = (date) => {
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

  handleSubmit = () => {
    console.log(this.state.newCustomer)
    this.props.dispatch({
      type: 'ADD_CUSTOMER',
      payload: this.state.newCustomer
    })
    this.props.history.push('/success')
  }

  render() {
    let content = null;

    if (this.props.user.userName) {
      content = (
        <div className="main">
        <form className="newOrder">
          <div className="form-group">
            <label>First Name</label>
            <input className="form-control" type="text" placeholder="First Name"
              value={this.state.newCustomer.firstName}
              onChange={this.handleChangeFor('firstName')}
            />
          </div>
          <div className="form-group">
            <label>Last Name</label>
            <input className="form-control" type="text" placeholder="Last Name"
              value={this.state.newCustomer.lastName}
              onChange={this.handleChangeFor('lastName')}
            />
          </div>
          <div className="form-group">
            <label>Phone</label>
            <NumberFormat className="form-control"
              placeholder="Phone"
              value={this.state.newCustomer.phone}
              onChange={this.handleChangeFor('phone')}
              format="(###) ###-####"
              mask="_" />
          </div>
          <div className="form-group">
            <label>Order #</label>
            <input className="form-control" type="number" placeholder="Order #"
              value={this.state.newCustomer.orderNumber}
              onChange={this.handleChangeFor('orderNumber')}
            />
          </div>
          <div className="form-group">
            <label>Drop-off Date</label>
            <DatePicker
              selected={this.state.newCustomer.dropDate}
              onChange={this.handleChangeForDropOff}
            />
          </div>
          <div className="form-group">
            <label>Pick-up Date & Time</label>
            <DatePicker
              selected={this.state.newCustomer.pickUp}
              onChange={this.handleChangeForPickUp}
              showTimeSelect
              timeIntervals={60}
              minTime={moment().hours(10).minutes(0)}
              maxTime={moment().hours(20).minutes(0)}
              dateFormat="LLL" />
          </div>
          <div className="form-group">
            <ServiceSelector />
          </div>
          <div>
            <label>Payment Receive</label>
            <Checkbox
              onChange={this.updatePayment}
            />
          </div>
          <Button onClick={this.handleSubmit} variant="contained" color="primary">Submit</Button>
        </form>
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

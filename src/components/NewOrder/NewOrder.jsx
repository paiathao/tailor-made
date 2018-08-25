import React, { Component } from 'react';
import { connect } from 'react-redux';

import { USER_ACTIONS } from '../../redux/actions/userActions';

//import others components
import Nav from '../../components/Nav/Nav';
import ServiceSelector from '../ServiceSelector/ServiceSelector';

import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import Checkbox from '@material-ui/core/Checkbox';
import NumberFormat from 'react-number-format';
import { Button } from 'reactstrap';
import SweetAlert from 'react-bootstrap-sweetalert'

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
      alert: null,
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

  handleClick = (event, row) => {
    const getAlert = () => (
      <SweetAlert success title="Success!" onConfirm={this.handleSubmit}>
        New order has been added!
      </SweetAlert>
    )

    this.setState({
      alert: getAlert(),
    });
  };

  handleSubmit = () => {
    console.log(this.state.newCustomer)
    this.props.dispatch({
      type: 'ADD_CUSTOMER',
      payload: this.state.newCustomer
    })
    this.props.history.push('/currentorders')
  }

  render() {
    let content = null;

    if (this.props.user.userName) {
      content = (
        <div className="main">
          <form className="newOrder">
            <div className="form-group">
              <label>First Name</label>
              <input 
                className="form-control" 
                type="text" 
                value={this.state.newCustomer.firstName}
                onChange={this.handleChangeFor('firstName')}
              />
              <label>Last Name</label>
              <input className="form-control" type="text"
                value={this.state.newCustomer.lastName}
                onChange={this.handleChangeFor('lastName')}
              />
              <label>Phone</label>
              <NumberFormat className="form-control"
                value={this.state.newCustomer.phone}
                onChange={this.handleChangeFor('phone')}
                format="(###) ###-####"
                mask="_" />
              <label>Order #</label>
              <input className="form-control" type="number"
                value={this.state.newCustomer.orderNumber}
                onChange={this.handleChangeFor('orderNumber')}
              />
              <label>Drop-off Date</label>
              <DatePicker
                className="form-control"
                selected={this.state.newCustomer.dropDate}
                onChange={this.handleChangeForDropOff}
              />
              <label>Pick-up Date & Time</label>
              <DatePicker
                className="form-control"
                selected={this.state.newCustomer.pickUp}
                onChange={this.handleChangeForPickUp}
                showTimeSelect
                timeIntervals={60}
                minTime={moment().hours(10).minutes(0)}
                maxTime={moment().hours(20).minutes(0)}
                dateFormat="LLL" />
            </div>
            <div>
              <ServiceSelector />
              <label>Payment Receive</label>
              <Checkbox
                onChange={this.updatePayment}
              />
              <Button 
                onClick={this.handleClick} 
                variant="contained" 
                color="info">Submit
              </Button>
            </div>
          </form>
          {this.state.alert}
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

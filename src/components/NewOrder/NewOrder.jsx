import React, { Component } from 'react';
import { connect } from 'react-redux';

import { USER_ACTIONS } from '../../redux/actions/userActions';

//import others components
import Nav from '../../components/Nav/Nav';
import ServiceSelector from '../ServiceSelector/ServiceSelector';

//import for styling
import { Button, Form, FormGroup, Label, Input} from 'reactstrap';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import Checkbox from '@material-ui/core/Checkbox';
import NumberFormat from 'react-number-format';

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
    this.props.dispatch({ type: 'FETCH_SERVICES' });
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
        <Form>
          <FormGroup>
            <FormGroup>
              <Label for="firstName">First Name</Label>
              <Input type="text" placeholder="First Name"
                value={this.state.newCustomer.firstName}
                onChange={this.handleChangeFor('firstName')}
              />
            </FormGroup>
            <FormGroup>
              <Label for="lastName">Last Name</Label>
              <Input type="text" placeholder="Last Name"
                value={this.state.newCustomer.lastName}
                onChange={this.handleChangeFor('lastName')}
              />
            </FormGroup>
            <FormGroup>
              <Label for="phone">Phone</Label>
              <NumberFormat
                placeholder="Phone"
                value={this.state.newCustomer.phone}
                onChange={this.handleChangeFor('phone')}
                format="(###) ###-####"
                mask="_" />
            </FormGroup>
            <FormGroup>
              <Label for="orderNumber">Order #</Label>
              <Input type="number" placeholder="Order #"
                value={this.state.newCustomer.orderNumber}
                onChange={this.handleChangeFor('orderNumber')}
              />
            </FormGroup>
            <FormGroup>
              <Label for="dropDate">Drop-off Date</Label>
              <DatePicker
                selected={this.state.newCustomer.dropDate}
                onChange={this.handleChangeForDropOff}
              />
            </FormGroup>
            <FormGroup>
              <Label for="PickupDate">Pick-up Date & Time</Label>
              <DatePicker
                selected={this.state.newCustomer.pickUp}
                onChange={this.handleChangeForPickUp}
                showTimeSelect
                timeIntervals={60}
                minTime={moment().hours(10).minutes(0)}
                maxTime={moment().hours(20).minutes(0)}
                dateFormat="LLL" />
            </FormGroup>
            <ServiceSelector/>
            <label>Payent Receive</label>
            <Checkbox
              onChange={this.updatePayment}
            />
          </FormGroup>
          <Button onClick={this.handleSubmit}>Submit</Button>
        </Form>
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

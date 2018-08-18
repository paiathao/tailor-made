import React, { Component } from 'react';
import { connect } from 'react-redux';

import { USER_ACTIONS } from '../../redux/actions/userActions';

import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import Checkbox from '@material-ui/core/Checkbox';
import NumberFormat from 'react-number-format';

//import others components
import Nav from '../../components/Nav/Nav';
import ServiceSelector from '../ServiceSelector/ServiceSelector'
import ServiceList from '../ServiceList/ServiceList'
import ServiceTotal from '../ServiceTotal/ServiceTotal'

//material-ui
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Slide from '@material-ui/core/Slide';

const mapStateToProps = state => ({
  user: state.user,
});

//styles for dialog
const styles = {
  appBar: {
    position: 'relative',
  },
  flex: {
    flex: 1,
  },
};

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

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
      open: false,
    };
  }

  //function for dialog
  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

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
    const { classes } = this.props;

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
          <NumberFormat
            placeholder="Phone"
            value={this.state.newCustomer.phone}
            onChange={this.handleChangeFor('phone')}
            format="(###) ###-####"
            mask="_" />
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
          <Button onClick={this.handleClickOpen}>Select Services</Button>
          <Dialog
            fullScreen
            open={this.state.open}
            onClose={this.handleClose}
            TransitionComponent={Transition}
          >
            <AppBar className={classes.appBar}>
              <Toolbar>
                <Button color="inherit" onClick={this.handleClose}>
                  Close
                </Button>
              </Toolbar>
            </AppBar>
            <ServiceSelector />
          </Dialog>
          <ServiceList />
          <ServiceTotal />
          <label>Payent Receive</label>
          <Checkbox
            onChange={this.updatePayment}
          />
          <button onClick={this.handleSubmit}>
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

const newOrderWithStyles = withStyles(styles)(NewOrder);

export default connect(mapStateToProps)(newOrderWithStyles);

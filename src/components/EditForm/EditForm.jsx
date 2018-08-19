import React, { Component } from 'react';

//import for styling
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import Checkbox from '@material-ui/core/Checkbox';
import NumberFormat from 'react-number-format';
import Button from '@material-ui/core/Button'

import ServiceSelector from '../ServiceSelector/ServiceSelector';
import Payment from '../Payment/Payment'

class EditForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            customer: {
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

    handleChangeForDropOff = (date) => {
        this.setState({
            customer: {
                ...this.state.customer,
                dropDate: date
            }
        })
    }

    handleChangeForPickUp = (date) => {
        this.setState({
            customer: {
                ...this.state.customer,
                pickUp: date
            }
        })
    }

    handleChangeFor = (propertyName) => {
        return (event) => {
            this.setState({
                customer: {
                    ...this.state.customer,
                    [propertyName]: event.target.value
                }
            })
        }
    }

    updatePayment = () => {

        if (this.state.customer.paid === false) {
            this.setState({
                customer: {
                    ...this.state.customer,
                    paid: true
                }
            })
        } else {
            this.setState({
                customer: {
                    ...this.state.customer,
                    paid: false
                }
            })
        }

    }


    render() {

        return (
            <form className="newOrder">
                <div className="form-group">
                    <label>First Name</label>
                    <input className="form-control" type="text"
                        value={this.props.customer.firstName}
                        onChange={this.handleChangeFor('firstName')}
                    />
                </div>
                <div className="form-group">
                    <label>Last Name</label>
                    <input className="form-control" type="text"
                        value={this.props.customer.lastName}
                        onChange={this.handleChangeFor('lastName')}
                    />
                </div>
                <div className="form-group">
                    <label>Phone</label>
                    <NumberFormat className="form-control"
                        value={this.props.customer.phone}
                        onChange={this.handleChangeFor('phone')}
                        format="(###) ###-####"
                        mask="_" />
                </div>
                <div className="form-group">
                </div>
            </form>
        );
    }
}

export default EditForm;


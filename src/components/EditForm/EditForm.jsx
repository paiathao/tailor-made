import React, { Component } from 'react';

//import for styling
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import NumberFormat from 'react-number-format';

import ServiceSelector from '../ServiceSelector/ServiceSelector'
import ServiceList from '../ServiceList/ServiceList'

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
                <div>
                    <ServiceSelector />
                    <ServiceList />
                </div>
                <div className="form-group">
                </div>
            </form>
        );
    }
}

export default EditForm;


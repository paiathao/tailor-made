import React, { Component } from 'react';

//import for styling
import 'react-datepicker/dist/react-datepicker.css';
import NumberFormat from 'react-number-format';

import ServiceSelector from '../ServiceSelector/ServiceSelector'

class EditForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            customer: {
                firstName: '',
                lastName: '',
                phone: '',
            },
        };
    }

    handleChangeFor = (propertyName) => {
        return (event) => {
            console.log(event.target.value)
            this.setState({
                customer: {
                    ...this.state.customer,
                    [propertyName]: event.target.value
                }
            })
        }
    }

    render() {

        console.log('props', this.props)

        console.log(this.state.customer)

        return (
            <form className="newOrder">
                <div className="form-group">
                    <label>First Name</label>
                    <input className="form-control" type="text"
                        placeholder={this.props.customer.firstName}
                        onChange={this.handleChangeFor('firstName')}
                    />
                </div>
                <div className="form-group">
                    <label>Last Name</label>
                    <input className="form-control" type="text"
                        placeholder={this.props.customer.lastName}
                        onChange={this.handleChangeFor('lastName')}
                    />
                </div>
                <div className="form-group">
                    <label>Phone</label>
                    <NumberFormat className="form-control"
                        placeholder={this.props.customer.phone}
                        onChange={this.handleChangeFor('phone')}
                        format="(###) ###-####"
                        mask="_" />
                </div>
                <div>
                    <ServiceSelector />
                </div>
                <div className="form-group">
                </div>
            </form>
        );
    }
}

export default EditForm;


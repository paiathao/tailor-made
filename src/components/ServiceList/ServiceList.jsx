import React, { Component } from 'react';
import { connect } from 'react-redux';

import ServiceTotal from '../ServiceTotal/ServiceTotal'

const mapStateToProps = state => ({
    services: state.newCustomer.orderDetails
});

class ServiceList extends Component {

    handleDelete = (service) => {
        console.log('delete', service)
        this.props.dispatch({ type: 'DELETE_SERVICE', payload: service });
    }

    render() {

        let serviceListItemArray = this.props.services.map((service, index) => {
            return (
                <li key={index}>
                    Category: {service.category} Service: {service.service} Cost: {service.cost}
                    <button onClick={() => this.handleDelete(service)}>Delete</button>
                </li>
            )
        })

        return (
            <div>
                <h4>Service Summary </h4>
                <ul>
                    {serviceListItemArray}
                </ul>
                <ServiceTotal />
            </div>
        );
    }
}

export default connect(mapStateToProps)(ServiceList);


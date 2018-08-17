import React, { Component } from 'react';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
    services: state.newCustomer.orderDetails
});

class ServiceList extends Component {

    render() {

        let serviceListItemArray = this.props.services.map((service, index) => {
            return (
                <li key={index}>
                    Category: {service.category} Service: {service.service} Cost: {service.cost}
                </li>
            )
        })

        return (
            <div>
                <h3>Service Added </h3>
                <ul>
                    {serviceListItemArray}
                </ul>
            </div>
        );
    }
}

export default connect(mapStateToProps)(ServiceList);


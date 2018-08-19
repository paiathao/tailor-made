import React, { Component } from 'react';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
    services: state.newCustomer.orderDetails
});

class ServiceTotal extends Component {

    totalCost = 0;
    sum = 0;
    tax = 0;

    saveState() {
        this.props.dispatch({
            type: 'ADD_TOTALCOST',
            payload: this.totalCost
        })
    }

    render() {

        let array = this.props.services
        this.sum = 0;
        this.tax = 0;
        this.totalCust = 0;
        array.forEach((value) => {
            this.sum += value.cost;
            this.tax = (this.sum * 0.06);
            this.totalCost = (this.sum + this.tax);
        })

        this.saveState();

        return (
            <div>
                <p> Subtotal Cost: {this.sum.toLocaleString('en-US', { style: 'currency', currency: 'USD' })} </p>
                <p> Taxes: {this.tax.toLocaleString('en-US', { style: 'currency', currency: 'USD' })} </p>
                <p> Total Cost: {this.totalCost.toLocaleString('en-US', { style: 'currency', currency: 'USD' })} </p>
            </div>
        );
    }
}

export default connect(mapStateToProps)(ServiceTotal);


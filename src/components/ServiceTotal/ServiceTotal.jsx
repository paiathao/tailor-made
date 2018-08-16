import React, { Component } from 'react';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
    services: state.newService
});

class ServiceTotal extends Component {

    render() {

        let array = this.props.services

        let sum = 0;
        let tax = 0;
        let totalCost = 0;

        array.forEach(function(value){
            sum += value.cost;
            tax = (sum * 0.06) 
            totalCost = (sum + tax)
           });

        return (
            <div>
                Subtotal Cost: {sum.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                Taxes: {tax.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                Total Cost: {totalCost.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
            </div>
        );
    }
}

export default connect(mapStateToProps)(ServiceTotal);


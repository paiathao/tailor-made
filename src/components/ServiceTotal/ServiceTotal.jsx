import React, { Component } from 'react';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
    services: state.newService
});

class ServiceTotal extends Component {

    render() {

        let array = this.props.services

        let sum = 0;

        array.forEach(function(value, index, arry){
            sum += value.cost;
           });

        return (
            <div>
                Total Cost: {sum}
            </div>
        );
    }
}

export default connect(mapStateToProps)(ServiceTotal);


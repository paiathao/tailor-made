import React, { Component } from 'react';
import { connect } from 'react-redux';
import ThumbDown from '@material-ui/icons/ThumbDown'
import ThumbUp from '@material-ui/icons/ThumbUp'

class Payment extends Component {

    render() {

        const paid = this.props.customer.paid
        let icon;

        if (paid === true) {
            icon = <p><ThumbUp /> Yes</p>
        } else {
            icon = <p><ThumbDown style={{color: '#fe4a30'}}/> No</p>
        }

        return (
            <div>
                {icon}
            </div>
        );
    }
}

export default connect()(Payment);
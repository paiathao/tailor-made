import React, { Component } from 'react';
import { connect } from 'react-redux';
import ThumbDownAltTwoTone from '@material-ui/icons/ThumbDown'
import ThumbUp from '@material-ui/icons/ThumbUpAltTwoTone'

class Payment extends Component {

    render() {

        const paid = this.props.customer.paid
        let icon;

        if (paid === true) {
            icon = <ThumbUp />
        } else {
            icon = <ThumbDownAltTwoTone />
        }

        return (
            <div>
                {icon}
            </div>
        );
    }
}

export default connect()(Payment);
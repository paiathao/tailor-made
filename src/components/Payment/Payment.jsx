import React, { Component } from 'react';
import { connect } from 'react-redux';
import CheckBoxOutlineBlank from '@material-ui/icons/CheckBoxOutlineBlank'
import Check from '@material-ui/icons/CheckBox'
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
import React, { Component } from 'react';
import { connect } from 'react-redux';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Edit from '@material-ui/icons/Edit'

import EditForm from '../EditForm/EditForm'


class EditButton extends Component {

    state = {
        open: false,
        editCustomer: {
            _id: this.props.customer._id,
            firstName: this.props.customer.firstName,
            lastName: this.props.customer.lastName,
            phone: this.props.customer.phone,
            orderNumber: this.props.customer.orderNumber,
            orderDetails: this.props.customer.orderDetails,
            dropDate: this.props.customer.dropDate,
            pickUp: this.props.customer.pickUp,
            paid: this.props.customer.paid,
            complete: this.props.customer.complete,
        },
    };

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleSave = (customer) => {
        this.props.dispatch({
            type: 'UPDATE_CUSTOMER',
            payload: this.state.editCustomer
        })
        this.setState({ 
            open: false
         });
    };

    handleChangeFor = (propertyName) => {
        return (event) => {
            this.setState({
                editCustomer: {
                    ...this.state.editCustomer,
                    [propertyName]: event.target.value
                }
            })
        }
    }

    render() {

        return (
            <div>
                <Button color="secondary" aria-label="Edit"
                    onClick={this.handleClickOpen} ><Edit /></Button>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Edit Customer's Information</DialogTitle>
                    <DialogContent>
                        <EditForm customer={this.state.editCustomer} handleChangeFor={this.handleChangeFor}/>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.handleSave} color="primary">
                            Save
                        </Button>
                    </DialogActions>
                </Dialog>
            </div >
        );
    }
}

export default connect()(EditButton);
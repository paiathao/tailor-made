import React, { Component } from 'react';
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
    };

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleSave = (customer) => {
        console.log(customer)
        this.setState({ 
            open: false
         });
    };

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
                        <EditForm customer={this.props.customer} />
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

export default EditButton;
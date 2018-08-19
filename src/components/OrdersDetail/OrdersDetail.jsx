import React from 'react';

//import material-ui
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DetailIcon from '@material-ui/icons/DetailsSharp';

class OrdersDetail extends React.Component {
    state = {
        open: false,
    };

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    render() {

        this.item = Object.values(this.props.customer)[0]

        let itemArray = this.item.map((item, index) => {
            return (
                <li key={index}>
                    Category: {item.category}, Service: {item.service} Cost: {item.cost.toLocaleString('en-US', { style: 'currency', currency: 'USD' })} 
                </li>
            )
        })



        return (
            <div>
                <Button onClick={this.handleClickOpen}>Show Details<DetailIcon /></Button>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Services Information"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            {itemArray}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary" autoFocus>
                            OK
              </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}


export default OrdersDetail;


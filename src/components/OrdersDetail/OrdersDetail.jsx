import React from 'react';

//import material-ui
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DetailIcon from '@material-ui/icons/DetailsSharp';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

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
                <tr key={index}>
                    <TableCell>{item.category} </TableCell>
                    <TableCell> {item.service} </TableCell>
                    <TableCell> {item.cost.toLocaleString('en-US', { style: 'currency', currency: 'USD' })} </TableCell>
                </tr>
            )
        })



        return (
            <div>
                <Button onClick={this.handleClickOpen}>Details<DetailIcon style={{'color': '#ffa782'}}/></Button>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title" >Services Information</DialogTitle>
                    <DialogContent>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Category</TableCell>
                                    <TableCell>Service</TableCell>
                                    <TableCell>Cost</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {itemArray}
                            </TableBody>
                        </Table>
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


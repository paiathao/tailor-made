import React from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

class OrdersDialog extends React.Component {

    render() {

        let itemArray = this.props.orderDetails.map((item, index) => {
            return (
                <TableRow key={index}>
                    <TableCell>{item.category} </TableCell>
                    <TableCell> {item.service} </TableCell>
                    <TableCell> {item.cost.toLocaleString('en-US', { style: 'currency', currency: 'USD' })} </TableCell>
                </TableRow>
            )
        })

        return (
            <div>
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
            </div>
        );
    }
}


export default OrdersDialog;


import React, { Component } from 'react';
import { connect } from 'react-redux';
import OrdersDetail from '../OrdersDetail/OrdersDetail'
import Payment from '../Payment/Payment'

//material-ui
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Edit from '@material-ui/icons/Edit'

//styles
const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
});

const mapStateToProps = state => ({
  customerList: state.customerList
});

class currentTable extends Component {

  constructor(props) {
    super(props)

    this.state = {
      id: [],
      editItem: [],
    }
  }

  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_CUSTOMERS' });
  }

  handleComplete = (id) => {
    console.log('handle complete', id)
    this.props.dispatch({ type: 'UPDATE_STATUS', payload: id });
  }

  render() {
    const { classes } = this.props;

    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <CustomTableCell>Order #</CustomTableCell>
              <CustomTableCell>Customer's Name</CustomTableCell>
              <CustomTableCell>Phone</CustomTableCell>
              <CustomTableCell>Service Detail</CustomTableCell>
              <CustomTableCell>Due Date</CustomTableCell>
              <CustomTableCell>Total Cost</CustomTableCell>
              <CustomTableCell>Payment Receive</CustomTableCell>
              <CustomTableCell>Complete</CustomTableCell>
              <CustomTableCell>Edit</CustomTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.customerList.map((customer, index) => {
              if (customer.complete === false) {
                return (
                  <TableRow className={classes.row} key={index}>
                    <CustomTableCell component="th" scope="row">
                      {customer.orderNumber}
                    </CustomTableCell>
                    <CustomTableCell>{customer.firstName} {customer.lastName}</CustomTableCell>
                    <CustomTableCell>{customer.phone}</CustomTableCell>
                    <CustomTableCell><OrdersDetail customer={customer} /></CustomTableCell>
                    <CustomTableCell>{(new Date(customer.pickUp)).toLocaleDateString()}</CustomTableCell>
                    <CustomTableCell >{parseFloat(customer.totalCost).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</CustomTableCell>
                    <CustomTableCell><Payment customer={customer} /></CustomTableCell>
                    <CustomTableCell>
                      <Checkbox
                        onClick={() => this.handleComplete(customer._id)}
                      />
                    </CustomTableCell>
                    <CustomTableCell>
                      <Button color="secondary" aria-label="Edit" className={classes.button}
                        onClick={() => this.handleEdit(customer)}
                      >
                        <Edit />
                      </Button>
                    </CustomTableCell>
                  </TableRow>
                );
              }
            })}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

const styleCurrentTable = withStyles(styles)(currentTable)

export default connect(mapStateToProps)(styleCurrentTable);


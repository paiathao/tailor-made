import React, { Component } from 'react';
import { connect } from 'react-redux';
import OrdersDetail from '../OrdersDetail/OrdersDetail'
import Payment from '../Payment/Payment'
import moment from 'moment';

//material-ui
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import EditButton from '../EditButton/EditButton';

import SweetAlert from 'react-bootstrap-sweetalert'

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
      alert: null,

    }
  }

  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_CUSTOMERS' });
  }
  

  showAlert = (id) => {
    const getAlert = () => (
      <SweetAlert
      warning
      showCancel
      confirmBtnText="Yes, order is complete!"
      confirmBtnBsStyle="danger"
      cancelBtnBsStyle="default"
      title="Are you sure?"
      onConfirm={this.handleComplete}
      onCancel={this.hideAlert}
    >
      Please confirm payment was also received!
    </SweetAlert>
    );

    this.setState({
      alert: getAlert(),
      id: id
    });
  }

  hideAlert = () => {
    console.log('Hiding alert...');
    
    this.setState({
      alert: null,
    });
    
    
  }

  handleComplete = () => {
    console.log('complete', this.state.id)
    this.props.dispatch({ type: 'UPDATE_STATUS', payload: this.state.id });
    this.setState({
      alert: null
    });
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
              <CustomTableCell>Service Details</CustomTableCell>
              <CustomTableCell>Drop-off Date</CustomTableCell>
              <CustomTableCell>Due Date & Time</CustomTableCell>
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
                    <CustomTableCell>{(new Date(customer.dropDate)).toLocaleDateString()}</CustomTableCell>
                    <CustomTableCell>{(moment(customer.pickUp)).format('LLL')}</CustomTableCell>
                    <CustomTableCell >{parseFloat(customer.totalCost).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</CustomTableCell>
                    <CustomTableCell><Payment customer={customer} /></CustomTableCell>
                    <CustomTableCell>
                      <Checkbox
                        onClick={() => this.showAlert(customer._id)}
                      />
                    </CustomTableCell>
                    <CustomTableCell>
                      <EditButton customer={customer} />
                    </CustomTableCell>
                  </TableRow>
                );
              }
            })}
          </TableBody>
        </Table>
        {this.state.alert}
      </Paper>
    );
  }
}

const styleCurrentTable = withStyles(styles)(currentTable)

export default connect(mapStateToProps)(styleCurrentTable);


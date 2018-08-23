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
    backgroundColor: '#ffa782',
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
    color: '#818298'
  },
}))(TableCell);

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    maxWidth: 700,
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
      selected: [],

    }
  }

  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_CUSTOMERS' });
  }

  handleClick = (event, row) => {
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
    )
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(row);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, row);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    let selectId = newSelected[0]._id

    this.setState({ 
      selected: newSelected,
      id: selectId,
      alert: getAlert(),
     });
  };
  
  isSelected = row => this.state.selected.indexOf(row) !== -1;

  hideAlert = () => {
    this.setState({
      alert: null,
      selected: '',
    });
    
    
  }

  handleComplete = () => {
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
              const isSelected = this.isSelected(customer);
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
                      checked={isSelected}
                      onClick={event => this.handleClick(event, customer)}
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


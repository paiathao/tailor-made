import React, { Component } from 'react';
import { connect } from 'react-redux';

//material-ui
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

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

class CustomerTable extends Component {

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
              <CustomTableCell>First Name</CustomTableCell>
              <CustomTableCell>Last Name</CustomTableCell>
              <CustomTableCell>Phone</CustomTableCell>
              <CustomTableCell>Edit</CustomTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.customerList.map((customer, index) => {
                return (
                  <TableRow className={classes.row} key={index}>
                    <CustomTableCell component="th" scope="row">
                    {customer.firstName} 
                    </CustomTableCell>
                    <CustomTableCell>{customer.lastName}</CustomTableCell>
                    <CustomTableCell>{customer.phone}</CustomTableCell>
                    <CustomTableCell numeric><button>Edit</button></CustomTableCell>
                  </TableRow>
                );
            })}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

const styleCustomerTable = withStyles(styles)(CustomerTable)

export default connect(mapStateToProps)(styleCustomerTable);


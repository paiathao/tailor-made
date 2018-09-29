import React, { Component } from 'react';
import { connect } from 'react-redux';
import EditButton from '../EditButton/EditButton';

//material-ui
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Search from '@material-ui/icons/Search'
import InputAdornment from '@material-ui/core/InputAdornment';

import orderBy from 'lodash/orderBy';

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
    minWidth: 700,
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      width: 230,
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
      query: '',
    }
  }

  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_CUSTOMERS' });
  }

  handleComplete = (id) => {
    this.props.dispatch({ type: 'UPDATE_STATUS', payload: id });
  }

  handleChangeQuery = (event) => {
    this.setState({ query: event.target.value });
  }

  render() {
    const { classes } = this.props;
    let lowerCaseQuery = this.state.query.toLowerCase()

    console.log(lowerCaseQuery)

    const data = orderBy(
      this.state.query ? 
      this.props.customerList.filter( 
        customer => customer.firstName.toLowerCase().indexOf(this.state.query.toLowerCase()) !== -1 
        || customer.lastName.toLowerCase().indexOf(this.state.query.toLowerCase()) !== -1
      ) :  this.props.customerList, ['firstName'], ['asc']
    )

    return (
      <Paper className={classes.root}>
        <TextField
          style={{float: 'right', padding: '15px'}}
          placeholder="Search"
          className={classes.textField}
          value={this.state.query}
          onChange={this.handleChangeQuery}
          InputProps={{
            startAdornment: (
              <InputAdornment>
                 <Search style={{color: '#818298'}}
                 />
              </InputAdornment>
            ),
          }} 
          />
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <CustomTableCell >First Name</CustomTableCell>
              <CustomTableCell>Last Name</CustomTableCell>
              <CustomTableCell>Phone</CustomTableCell>
              <CustomTableCell>Edit</CustomTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((customer, index) => {
              return (
                <TableRow className={classes.row} key={index}>
                  <CustomTableCell component="th" scope="row">
                    {customer.firstName}
                  </CustomTableCell>
                  <CustomTableCell>{customer.lastName}</CustomTableCell>
                  <CustomTableCell>{customer.phone}</CustomTableCell>
                  <CustomTableCell>
                    <EditButton customer={customer} />
                  </CustomTableCell>
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


import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import { connect } from 'react-redux';

import EnhancedTableHead from '../EnhancedTableHead/EnhancedTableHead';
import EnhancedTableToolbar from '../EnhancedTableToolbar/EnhancedTableToolbar';

import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    minWidth: 1020,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  button: {
    display: 'block',
    marginTop: theme.spacing.unit * 2,
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 150,
  },
});

class ServiceTable extends React.Component {

  state = {
    selected: [],
    page: 0,
    rowsPerPage: 10,
    query: '',
    columnToQuery: 'Category',
  };

  handleSelectAllClick = (event, checked) => {
    if (checked) {
      this.setState(state => ({ selected: this.props.serviceList.map(n => n) }));
      return;
    }
    this.setState({ selected: [] });
  };

  handleClick = (event, row) => {
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

    this.setState({ selected: newSelected });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  isSelected = row => this.state.selected.indexOf(row) !== -1;

  render() {
    const { classes } = this.props;
    const { selected, rowsPerPage, page } = this.state;
    const data = this.props.serviceList
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

    return (
      <div>
        <FormControl className={classes.formControl}>
        <InputLabel htmlFor="demo-controlled-open-select">Select a column</InputLabel>
        <Select
          value={this.state.columnToQuery}
          onChange={(event, index, value) => this.setState({columnToQuery : value})}
          inputProps={{
            name: 'columnToQuery',
            id: 'demo-controlled-open-select',
          }}
        >
          <MenuItem value="category">Category</MenuItem>
          <MenuItem value="service">Service</MenuItem>
        </Select>
        </FormControl>
        <EnhancedTableToolbar numSelected={selected.length}
          selected={this.state.selected}
          handleClose={this.props.handleClose} />
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <EnhancedTableHead
              numSelected={selected.length}
              onSelectAllClick={this.handleSelectAllClick}
              rowCount={data.length}
            />
            <TableBody>
              {data
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((n, index) => {
                  const isSelected = this.isSelected(n);
                  return (
                    <TableRow
                      hover
                      onClick={event => this.handleClick(event, n)}
                      role="checkbox"
                      aria-checked={isSelected}
                      tabIndex={-1}
                      key={index}
                      selected={isSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox checked={isSelected} />
                      </TableCell>
                      <TableCell component="th" scope="row" padding="none">
                        {n.category}
                      </TableCell>
                      <TableCell numeric>{n.service}</TableCell>
                      <TableCell numeric>{n.cost.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            'aria-label': 'Previous Page',
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page',
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { serviceList: state.serviceList }
}

const serviceWithStyles = withStyles(styles)(ServiceTable);

export default connect(mapStateToProps)(serviceWithStyles);
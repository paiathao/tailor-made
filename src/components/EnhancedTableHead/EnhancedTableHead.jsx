import React from 'react';
import { connect } from 'react-redux';

import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';

const rows = [
    { id: 'category', disablePadding: false, label: 'Category' },
    { id: 'services', disablePadding: false, label: 'Services' },
    { id: 'cost', disablePadding: false, label: 'Cost' },
  
  ];
  
  class EnhancedTableHead extends React.Component {
  
    render() {
      const { onSelectAllClick, numSelected, rowCount } = this.props;
  
      return (
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox">
              <Checkbox
                indeterminate={numSelected > 0 && numSelected < rowCount}
                checked={numSelected === rowCount}
                onChange={onSelectAllClick}
              />
            </TableCell>
            {rows.map(row => {
              return (
                <TableCell
                  key={row.id}
                  numeric={row.numeric}
                  padding={row.disablePadding ? 'none' : 'default'}
                >
                  {row.label}
                </TableCell>
              );
            }, this)}
          </TableRow>
        </TableHead>
      );
    }
  }

  export default connect()(EnhancedTableHead);
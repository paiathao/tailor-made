import React, { Component } from 'react';
import { connect } from 'react-redux';
import ServiceTotal from '../ServiceTotal/ServiceTotal'

//material u-i
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';

const mapStateToProps = state => ({
    services: state.newCustomer.orderDetails
});

const toolbarStyles = theme => ({
    root: {
      paddingRight: theme.spacing.unit,
    },
    highlight:
      theme.palette.type === 'light'
        ? {
            color: theme.palette.secondary.main,
            backgroundColor: lighten(theme.palette.secondary.light, 0.85),
          }
        : {
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.secondary.dark,
          },
    spacer: {
      flex: '1 1 100%',
    },
    actions: {
      color: theme.palette.text.secondary,
    },
    title: {
      flex: '0 0 auto',
      paddingLeft: '24px',
      paddingTop: '10px',
    },
  });

class ServiceList extends Component {

    handleDelete = (service) => {
        this.props.dispatch({ type: 'DELETE_SERVICE', payload: service });
    }

    render() {

        const { classes } = this.props;

        let serviceListItemArray = this.props.services.map((service, index) => {
            return (
                <TableRow key={index}>
                    <TableCell> {service.category} </TableCell>
                    <TableCell>{service.service} </TableCell>
                    <TableCell>{parseFloat(service.cost).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</TableCell>
                    <TableCell>
                        <Button color="secondary"
                        onClick={() => this.handleDelete(service)}>
                        <DeleteIcon/>
                        </Button>
                    </TableCell>
                </TableRow>
            )
        })

        return (
            <div className={classes.root}>
                <Paper>
                    <Typography variant="title" id="tableTitle" className={classes.title}>
                        Service Summary
                    </Typography>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Category</TableCell>
                                <TableCell>Service</TableCell>
                                <TableCell>Cost</TableCell>
                                <TableCell>Delete</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {serviceListItemArray}
                        </TableBody>
                    </Table>
                    <ServiceTotal />
                </Paper>
            </div>
        );
    }
}

const ServiceListStyles = withStyles(toolbarStyles)(ServiceList);

export default connect(mapStateToProps)(ServiceListStyles);


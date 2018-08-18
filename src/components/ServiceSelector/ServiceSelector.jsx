import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Slide from '@material-ui/core/Slide';
import Button from '@material-ui/core/Button';

import ServiceTable from '../ServiceTable/ServiceTable';
import ServiceList from '../ServiceList/ServiceList'
import ServiceTotal from '../ServiceTotal/ServiceTotal'

//styles for dialog
const styles = {
    appBar: {
        position: 'relative',
    },
    flex: {
        flex: 1,
    },
};

function Transition(props) {
    return <Slide direction="up" {...props} />;
}


class ServiceSelector extends Component {

    constructor(props) {
        super(props)
        this.state = {
            open: false,
        };
    }

    //function for dialog
    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    render() {

        const { classes } = this.props;


        return (
            <div>
            <Button onClick={this.handleClickOpen}>Select Services</Button>
            <Dialog
              fullScreen
              open={this.state.open}
              onClose={this.handleClose}
              TransitionComponent={Transition}
            >
              <AppBar className={classes.appBar}>
                <Toolbar>
                  <Button color="inherit" onClick={this.handleClose}>
                    Close
                </Button>
                </Toolbar>
              </AppBar>
              <ServiceTable />
            </Dialog>
            <ServiceList />
            <ServiceTotal />
            </div>
        );
    }
}

export default withStyles(styles)(ServiceSelector);


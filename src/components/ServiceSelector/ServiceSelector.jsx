import React, { Component } from 'react';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import { Button } from 'reactstrap';

import ServiceTable from '../ServiceTable/ServiceTable';

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

    handleClose = (selected) => {
        console.log('close', selected)
        this.props.dispatch({
            type: 'ADD_SERVICES',
            payload: selected,
        })
        this.setState({ open: false });
    };

    render() {

        const { classes } = this.props;


        return (
            <div>
                <Button color="info" onClick={this.handleClickOpen} >Select Services</Button>
                <Dialog
                    fullScreen
                    open={this.state.open}
                    onClose={this.handleClose}
                    TransitionComponent={Transition}
                >
                    <ServiceTable handleClose={this.handleClose} />
                </Dialog>
            </div>
        );
    }
}

const ServiceSelectorStyles = withStyles(styles)(ServiceSelector);

export default connect()(ServiceSelectorStyles);


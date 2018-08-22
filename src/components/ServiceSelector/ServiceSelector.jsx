import React, { Component } from 'react';
import { connect } from 'react-redux';

import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import { Button } from 'reactstrap';

import ServiceTable from '../ServiceTable/ServiceTable';
import ServiceList from '../ServiceList/ServiceList'

function Transition(props) {
    return <Slide direction="up" {...props} />;
}


class ServiceSelector extends Component {

    constructor(props) {
        super(props)
        this.state = {
            open: false,
            detail: false,
        };
    }

    componentDidMount() {
        this.props.dispatch({ type: 'FETCH_SERVICES' });
    }

    //function for dialog
    handleClickOpen = () => {
        this.setState({
            open: true,
        });
    };

    handleClose = (selected) => {
        console.log('close', selected)
        this.props.dispatch({
            type: 'ADD_SERVICES',
            payload: selected,
        })
        this.setState({
            open: false,
            detail: true,
        });
    };

    render() {

        if (this.state.detail === true) {
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
                    <ServiceList />
                </div>
            )
        }


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

export default connect()(ServiceSelector);


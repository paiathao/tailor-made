import React, { Component } from 'react';
import { connect } from 'react-redux';

import Nav from '../../components/Nav/Nav';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import OrdersDialog from '../OrdersDialog/OrdersDialog';

import BigCalendar from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';


const localizer = BigCalendar.momentLocalizer(moment)

const mapStateToProps = state => ({
    user: state.user,
    calendarTask: state.calendarTask
});

class Calendar extends Component {

    constructor(props) {
        super(props)

        this.state = {
            open: false,
            task: '',
        }
    }

    componentDidMount() {
        this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
        this.props.dispatch({ type: 'FETCH_CUSTOMERS' });
    }

    componentDidUpdate() {
        if (!this.props.user.isLoading && this.props.user.userName === null) {
            this.props.history.push('home');
        }
    }

    handleSelect = (event) => {
        console.log('select click', event)
        this.setState({
            task: event,
        });
        this.handleOpen();
    }

    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    render() {
        let content = null;

        let events = this.props.calendarTask

        if (this.props.user.userName) {
            content = (
                <div className="main">
                    <div style={{ padding: 10, background: '#f9fefb' }}>
                        <BigCalendar
                            style={{ height: 600 }}
                            localizer={localizer}
                            events={events}
                            startAccessor="start"
                            endAccessor="end"
                            onSelectEvent={this.handleSelect}
                        />
                    </div>
                    <Dialog
                        open={this.state.open}
                        onClose={this.handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">{this.state.task.title}</DialogTitle>
                        <DialogContent>
                            <OrdersDialog orderDetails={this.state.task.orderDetails}/>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleClose} color="primary" autoFocus>
                                Ok
                            </Button>
                        </DialogActions>
                    </Dialog>

                </div>
            );
        }

        return (
            <div>
                <Nav />
                {content}
            </div>
        );
    }
}

export default connect(mapStateToProps)(Calendar);

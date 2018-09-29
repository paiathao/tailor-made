import React, { Component } from 'react';
import { connect } from 'react-redux';

import Nav from '../../components/Nav/Nav';
import { USER_ACTIONS } from '../../redux/actions/userActions';

import BigCalendar from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";


const localizer = BigCalendar.momentLocalizer(moment)

const mapStateToProps = state => ({
    user: state.user,
    calendarTask: state.calendarTask
});

class Calendar extends Component {

    componentDidMount() {
        this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
        this.props.dispatch({ type: 'FETCH_CUSTOMERS' });
    }

    componentDidUpdate() {
        if (!this.props.user.isLoading && this.props.user.userName === null) {
            this.props.history.push('home');
        }
    }

    render() {
        let content = null;

        console.log(this.props.calendarTask)

        const events = this.props.calendarTask

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
                        />
                    </div>
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

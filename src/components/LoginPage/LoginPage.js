import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { triggerLogin, formError, clearError } from '../../redux/actions/loginActions';
import { USER_ACTIONS } from '../../redux/actions/userActions';

import { Button } from 'reactstrap';
import UserIcon from '@material-ui/icons/AccountBoxOutlined'
import Lock from '@material-ui/icons/HttpsOutlined'
import Input from '@material-ui/core/Input';


const mapStateToProps = state => ({
  user: state.user,
  login: state.login,
});

class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
    };
  }

  componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
    this.props.dispatch(clearError());
  }

  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName !== null) {
      this.props.history.push('neworder');
    }
  }

  login = (event) => {
    event.preventDefault();

    if (this.state.username === '' || this.state.password === '') {
      this.props.dispatch(formError());
    } else {
      this.props.dispatch(triggerLogin(this.state.username, this.state.password));
    }
  }

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }

  renderAlert() {
    if (this.props.login.message !== '') {
      return (
        <h2
          className="alert"
          role="alert"
        >
          {this.props.login.message}
        </h2>
      );
    }
    return (<span />);
  }

  render() {
    return (
      <div>
        {this.renderAlert()}
        <div className="topLine"></div>
        <div className="secondLine"></div>
        <form onSubmit={this.login} className="logging">
          <h1>Login</h1>
          <div>
            <UserIcon />
            <Input
              type="text"
              placeholder="Username"
              name="username"
              value={this.state.username}
              onChange={this.handleInputChangeFor('username')}
            />
          </div>
          <div>
            <Lock />
            <Input
              style={{ marginTop: '10px' }}
              placeholder="Password"
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleInputChangeFor('password')}
            />
          </div>
          <div className="thirdLine">
            <Button color="secondary"
              type="submit"
              name="submit"
              value="Log In"
            >
              Log In
            </Button>
            <span style={{ padding: '5px' }}>
              <Link to="/register">Register</Link>
            </span>
          </div>
        </form>
      </div>
    );
  }
}

export default connect(mapStateToProps)(LoginPage);

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import LoginForm from './presenter';

class Container extends Component {
  state = {
    username: '',
    password: '',
  };
  static propTypes = {
    facebookLogin: PropTypes.func.isRequired,
    usernameLogin: PropTypes.func.isRequired,
  };
  render () {
    const {username, password} = this.state;
    return (
      <LoginForm
        handleInputChange={this._handleInputChange}
        handleSubmit={this._handelSubmit}
        handleFacebookLogin={this._handleFacebookLogin}
        usernameValue={username}
        passwordValue={password}
      />
    );
  }
  _handleInputChange = event => {
    const {target: {value, name}} = event; // name = event.target.name ==SAMEMENAING
    this.setState ({
      [name]: value, // [name] 대괄호는 상단 타겟에 이어진 name을 의미(username, password) , 대괄호가 없으면 그냥 name 이라는 변수
    });
  };
  _handelSubmit = event => {
    const {usernameLogin} = this.props;
    const {username, password} = this.state;
    event.preventDefault (); // preventDefault make browser not to work with default supposed to
    usernameLogin (username, password);
    // redux-action Will here to send this data to backend
  };

  _handleFacebookLogin = response => {
    const {facebookLogin} = this.props;
    facebookLogin (response.accessToken);
  };
}
export default Container;

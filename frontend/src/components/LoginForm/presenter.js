import React from 'react';
import formStyles from 'shared/formStyles.scss';
import FacebookLogin from 'react-facebook-login';
import PropTypes from 'prop-types';

export const LoginForm = (props, context) => (
  <div className={formStyles.formComponent}>
    <form className={formStyles.form} onSubmit={props.handleSubmit}>
      <input
        type="text"
        placeholder="Phone number, username or email"
        className={formStyles.textInput}
        value={props.usernameValue}
        onChange={props.handleInputChange} //onChange notify argument to know event happens
        name={'username'}
      />
      <input
        type="password"
        placeholder="Password"
        className={formStyles.textInput}
        value={props.passwordValue}
        onChange={props.handleInputChange} //onChange notify argument to know event happens
        name={'password'}
      />
      <input type="submit" value="Log in" className={formStyles.button} />
    </form>
    <span className={formStyles.divider}>or</span>
    <FacebookLogin
      appId="454071248345539"
      autoLoad={false}
      fields="name, email, picture"
      callback={props.handleFacebookLogin}
      cssClass={formStyles.facebookLink}
      icon="fab fa-facebook-square"
    />
    <span className={formStyles.forgotLink}>Forgot password?</span>
  </div>
);

LoginForm.propTypes = {
  usernameValue: PropTypes.string.isRequired,
  passwordValue: PropTypes.string.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleFacebookLogin: PropTypes.func.isRequired,
};

export default LoginForm;

import React from 'react'
import formStyles from 'shared/formStyles.scss'
import PropTypes from 'prop-types'
import FacebookLogin from "react-facebook-login"

export const SignupForm = props => (
  <div className={formStyles.formComponent}>
    <h3 className={formStyles.signupHeader}>
      Sign up to see photos and videos from your friends.
    </h3>
    <FacebookLogin
      appId="454071248345539"
      autoLoad={true}
      fields="name, email, picture"
      callback={props.handleFacebookLogin}
      cssClass={formStyles.button}
      icon="fab fa-facebook-square"
      textButton="Sign Up with Facebook"
    />
    <span className={formStyles.divider}>or</span>
    <form className={formStyles.form} onSubmit={props.handleSubmit}>
      <input
        type='email'
        placeholder='Email'
        className={formStyles.textInput}
        value={props.emailValue}
        name={'email'}
        onChange={props.handleInputChange}
      />
      <input
        type='text'
        placeholder='Full Name'
        className={formStyles.textInput}
        value={props.fullnameValue}
        name={'name'}
        onChange={props.handleInputChange}
      />
      <input
        type='username'
        placeholder='Username'
        className={formStyles.textInput}
        value={props.usernameValue}
        name={'username'}
        onChange={props.handleInputChange}
      />
      <input
        type='password'
        placeholder='Password'
        className={formStyles.textInput}
        value={props.passwordValue}
        onChange={props.handleInputChange}
        name={'password'}
      />
      <input type='submit' value='Sign Up' className={formStyles.button} />
    </form>
    <p className={formStyles.terms}>
      By signing up, you agree to our <span>Terms & Privacy Policy.</span>
    </p>
  </div>
)

SignupForm.propTypes = {
  emailValue: PropTypes.string.isRequired,
  nameValue: PropTypes.string.isRequired,
  usernameValue: PropTypes.string.isRequired,
  passwordValue: PropTypes.string.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleFacebookLogin : PropTypes.func.isRequired
}

export default SignupForm

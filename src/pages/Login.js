import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Login extends React.Component {
  render() {
    const { value, handleChange, disableButton, createUser } = this.props;
    return (
      <div data-testid="page-login">
        <form>
          <label htmlFor="loginName">
            Login:
            <input
              type="text"
              name="loginName"
              id="loginName"
              data-testid="login-name-input"
              value={ value }
              onChange={ handleChange }
            />
          </label>
          <Link to="/search">
            <button
              type="submit"
              data-testid="login-submit-button"
              disabled={ disableButton }
              onClick={ createUser }
            >
              Entar
            </button>
          </Link>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  handleChange: PropTypes.func,
  createUser: PropTypes.func,
  value: PropTypes.string,
  disableButton: PropTypes.bool,
}.isRequired;

export default Login;

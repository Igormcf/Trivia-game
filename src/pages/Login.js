import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { login } from '../actions/index';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      isDisabled: true,
      name: '',
      gravatarEmail: '',

    };
    this.handleChange = this.handleChange.bind(this);
    this.validateButton = this.validateButton.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, this.validateButton);
  }

  validateButton() {
    this.setState({
      isDisabled: true,
    });
    const { gravatarEmail, name } = this.state;
    if (gravatarEmail.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) && name) {
      this.setState({
        isDisabled: false,
      });
    }
  }

  handleClick() {
    const { name, gravatarEmail } = this.state;
    const { history, dispatchLogin } = this.props;
    dispatchLogin({
      name,
      gravatarEmail,
    });
    history.push('/game');
  }

  render() {
    const { gravatarEmail, name, isDisabled } = this.state;
    return (
      <form>
        <label htmlFor="email">
          Email:
          <input
            name="gravatarEmail"
            data-testid="input-gravatar-email"
            type="email"
            onChange={ this.handleChange }
            value={ gravatarEmail }
          />
        </label>

        <label htmlFor="name">
          Nome:
          <input
            name="name"
            data-testid="input-player-name"
            type="text"
            onChange={ this.handleChange }
            value={ name }
          />
        </label>

        <button
          type="button"
          data-testid="btn-play"
          disabled={ isDisabled }
          onClick={ this.handleClick }
        >
          Play
        </button>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatchLogin: (payload) => dispatch(login(payload)),
});

Login.propTypes = {
  history: propTypes.shape({
    push: propTypes.func.isRequired,
  }).isRequired,
  dispatchLogin: propTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
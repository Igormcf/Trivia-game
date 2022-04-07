import React, { Component } from 'react';
// import { connect } from 'react-redux';
import propTypes from 'prop-types';

class Ranking extends Component {
  constructor() {
    super();

    this.state = {
      players: [],
    };

    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.getLocalStorage();
  }

  getLocalStorage() {
    const local = localStorage.getItem('ranking');
    const array = JSON.parse(local);
    this.setState({
      players: array,
    });
  }

  handleClick() {
    const { history } = this.props;
    history.push('/');
  }

  render() {
    const { players } = this.state;
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        <button
          type="button"
          onClick={ this.handleClick }
          data-testid="btn-go-home"
        >
          HOME
        </button>
        {
          players.map((player, index) => (
            <div key={ index }>
              <img src={ player.picture } alt={ player.name } />
              <p data-testid={ `player-name-${index}` }>{ player.name }</p>
              <p data-testid={ `player-score-${index}` }>{ player.score }</p>
            </div>
          ))
        }
      </div>
    );
  }
}

Ranking.propTypes = {
  history: propTypes.shape({
    push: propTypes.func.isRequired,
  }).isRequired,
};

export default Ranking;

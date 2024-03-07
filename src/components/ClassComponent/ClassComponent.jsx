import React from 'react';
import PropTypes from 'prop-types';
import style from './ClassComponent.module.css';

export class ClassComponent extends React.Component {
  getRandomNumber = () => Math.floor(Math.random() *
    (this.props.max - this.props.min + 1)) + this.props.min;

  state = {
    result: 'Результат',
    userNumber: '',
    randomNumber: this.getRandomNumber(),
    count: 0,
    toggleBtn: false,
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState(state => ({
      count: state.count + 1,
    }));
    this.setState(state => {
      if (!state.userNumber) return state;

      if (state.userNumber > state.randomNumber) {
        return {
          result: `${state.userNumber} больше загаданного`,
          userNumber: '',
        };
      }

      if (state.userNumber < state.randomNumber) {
        return {
          result: `${state.userNumber} меньше загаданного`,
          userNumber: '',
        };
      }

      return {
        result: `Вы угадали число ${state.userNumber}
        угадали с ${state.count} попытки`,
        userNumber: '',
        toggleBtn: true,
      };
    });
  };

  handleChange = event => {
    this.setState(
      {
        userNumber: event.target.value,
      });
  };

  startNewGame = event => {
    event.preventDefault();
    this.setState({
      toggleBtn: false,
      count: 0,
      randomNumber: this.getRandomNumber(),
      result: 'Результат',
    });
  };

  render() {
    let button;
    if (this.state.toggleBtn) {
      button =
        <button
          className={style.btn}
          onClick={this.startNewGame}
        >Еще разок?
        </button>;
    } else {
      button = <button className={style.btn}>Угадать</button>;
    }
    console.log(this.state);
    return (
      <div className={style.game}>
        <p className={style.result}>{this.state.result}</p>

        <form className={style.form} onSubmit={this.handleSubmit}>
          <label className={style.label} htmlFor='user_number'>
            Угадай число
          </label>

          <input
            className={style.input}
            type='number'
            id='user_number'
            onChange={this.handleChange}
            value={this.state.userNumber}
          />
          {button}
        </form>
      </div>
    );
  }
}

ClassComponent.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
};

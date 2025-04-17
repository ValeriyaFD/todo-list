import React, { Component } from 'react';
import './NewTaskForm.css';
import PropTypes from 'prop-types';

export default class NewTaskForm extends Component {
  state = {
    label: '',
    minutes: '',
    seconds: '',
  };

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value,
    });
  };
  
  onMinutesChange = (e) => {
    this.setState({
      minutes: e.target.value,
    });
  };

  onSecondsChange = (e) => {
    if(e.target.value.length > 2 || Number(e.target.value) > 59){
      this.setState({
        seconds: ''
      })
      } else {
        this.setState({
          seconds: e.target.value,
        });
      }
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { label, minutes, seconds } = this.state;
    if (minutes.length === 0 || seconds.length === 0) {
      return
    }
    if (label.trim() !== '') {
      const { addItem } = this.props;
      addItem(label, minutes, seconds);
      this.setState({
        label: '',
        minutes: '',
        seconds: '',
      });
    }
  };

  onKeyDown = (e) => {
    if (e.key === 'Enter') {
      this.onSubmit(e);
    }
  };

  render() {
    const { label, minutes, seconds } = this.state;
    return (
      <form className="new-todo-form">
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          type="text"
          onKeyDown={this.onKeyDown}
          onChange={this.onLabelChange}
          value={label}
        />
        <input
          className="new-todo-form__timer"
          type="number"
          placeholder="Min"
          value={minutes}
          onChange={this.onMinutesChange}
        />
        <input
          className="new-todo-form__timer"
          type="number"
          placeholder="Sec"
          value={seconds}
          onChange={this.onSecondsChange}
        />
      </form>
    );
  }
}

NewTaskForm.propTypes = {
  addItem: PropTypes.func.isRequired,
};

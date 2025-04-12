import React, { Component } from 'react';
import './NewTaskForm.css';
import PropTypes from 'prop-types';

export default class NewTaskForm extends Component {
  state = {
    label: '',
  };

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { label } = this.state;
    if (label.trim() !== '') {
      const { addItem } = this.props;
      addItem(label);
      this.setState({
        label: '',
      });
    }
  };

  onKeyDown = (e) => {
    if (e.key === 'Enter') {
      this.onSubmit(e);
    }
  };

  render() {
    const { label } = this.state;
    return (
      <form class="new-todo-form">
          <input className="new-todo"
          placeholder="What needs to be done?"
          type="text"
          onKeyDown={this.onKeyDown}
          onChange={this.onLabelChange}
          value={label} />
          <input className="new-todo-form__timer" placeholder="Min" autofocus />
          <input className="new-todo-form__timer" placeholder="Sec" autofocus />
        </form>
      
    );
  }
}

NewTaskForm.propTypes = {
  addItem: PropTypes.func.isRequired,
};

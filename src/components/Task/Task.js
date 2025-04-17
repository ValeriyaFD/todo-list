import { formatDistanceToNow } from 'date-fns/formatDistanceToNow';
import KG from 'date-fns/locale/en-AU';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Task.css';

export default class Task extends Component {
  constructor(props) {
    super(props);
    const { description } = props.todo;
    this.state = {
      localDescription: description,
    };
    this.inputRef = React.createRef();
  }

  componentDidUpdate(prevProps) {
    if (this.props.todo.onEditing && !prevProps.todo.onEditing) {
      this.inputRef.current.focus();
    }
  }

  handleEditClick = () => {
    this.props.onEdit(this.props.todo.id);
  };

  handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      this.handleSave();
    } else if (event.key === 'Escape') {
      this.handleCancel();
    }
  };

  handleBlur = () => {
    this.handleSave();
  };

  handleSave = () => {
    const { id } = this.props.todo;
    const { localDescription } = this.state;
    if (localDescription.trim()) {
      this.props.onSave(id, localDescription);
    }
  };

  handleCancel = () => {
    this.setState({ localDescription: this.props.todo.description });
    this.props.onSave(this.props.todo.id, this.props.todo.description);
  };

  handleChange = (event) => {
    this.setState({ localDescription: event.target.value });
  };
  
  render() {
    const { todo, onDelete, onToggleDone, onStartTimer, onPauseTimer, onStopTimer } = this.props;
    const { id, description, date, completed, onEditing} = todo;
 
    return (
      <li className={`${completed ? 'completed' : onEditing ? 'editing' : ''}`}>
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={completed}
            onChange={() => { onToggleDone(id);
              if (!completed) onStopTimer(id);
            }}
            id={`task-checkbox-${id}`}
          />
          <label htmlFor={`task-checkbox-${id}`}>
            <span className="description">{description}</span>
            <div className="timer">
                  <button className="icons icon-play" onClick={() => onStartTimer(id)}></button>
                  <button className="icons icon-pause" onClick={() => onPauseTimer(id)}></button>
                  <span className='time'>{todo.minutes}:{todo.seconds}</span>
            </div>
            <span className="created">
              created&nbsp;
              {formatDistanceToNow(date, {
                addSuffix: true,
                locale: KG,
                includeSeconds: true,
              })}
            </span>
          </label>
          <button className="icon icon-edit" onClick={this.handleEditClick} type="button" aria-label="Edit" />
          <button className="icon icon-destroy" onClick={() => onDelete(id)} type="button" aria-label="Delete" />
        </div>
        {onEditing ? (
          <input
            ref={this.inputRef}
            type="text"
            className="edit"
            value={this.state.localDescription}
            onChange={this.handleChange}
            onKeyDown={this.handleKeyDown}
            onBlur={this.handleBlur}
          />
        ) : null}
      </li>
    );
  }
}


Task.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    description: PropTypes.string.isRequired,
    date: PropTypes.instanceOf(Date).isRequired,
    completed: PropTypes.bool.isRequired,
    onEditing: PropTypes.bool.isRequired,
    minutes: PropTypes.number.isRequired,
    seconds: PropTypes.number.isRequired,
  }).isRequired,
  onDelete: PropTypes.func,
  onEdit: PropTypes.func,
  onToggleDone: PropTypes.func,
  onSave: PropTypes.func,
  onStartTimer: PropTypes.func.isRequired,
  onPauseTimer: PropTypes.func.isRequired,
  onStopTimer: PropTypes.func.isRequired,
};

Task.defaultProps = {
  completed: false,
  onDelete: () => {},
  onToggleDone: () => {},
  onSave: () => {},
};

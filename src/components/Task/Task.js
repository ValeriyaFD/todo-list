import React from 'react';
import { formatDistanceToNow } from 'date-fns/formatDistanceToNow';
import KG from 'date-fns/locale/en-AU';
import './Task.css';
import PropTypes from 'prop-types';

export default function Task({ id, completed, description, date, onEdit, onDelete, onToggleCompleted }) {
  const toggleCompleted = () => {
    onToggleCompleted();
  };

  return (
    <div className="view">
      <input
        className="toggle"
        type="checkbox"
        checked={completed}
        onChange={toggleCompleted}
        id={`task-checkbox-${id}`}
      />
      <label className={`${completed ? 'completed' : ''}`} htmlFor={`task-checkbox-${id}`}>
        <span className="description">{description} </span>
        <span className="created">
          created{' '}
          {formatDistanceToNow(date, {
            addSuffix: true,
            locale: KG,
            includeSeconds: true,
          })}
        </span>
      </label>
      <button className="icon icon-edit" onClick={onEdit}></button>
      <button className="icon icon-destroy" onClick={onDelete}></button>
    </div>
  );
}

Task.propTypes = {
  id: PropTypes.number.isRequired,
  completed: PropTypes.bool.isRequired,
  description: PropTypes.string.isRequired,
  date: PropTypes.instanceOf(Date).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onToggleCompleted: PropTypes.func.isRequired,
};

Task.defaultProps = {
  completed: false,
};

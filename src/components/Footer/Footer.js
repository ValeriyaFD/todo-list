import React from 'react';
import PropTypes from 'prop-types';
import TaskFilter from '../TaskFilter/TaskFilter';
import './Footer.css';

export default function Footer({ done, deleteCompleted, filter, onFilterChange }) {
  return (
    <footer className="footer">
      <span className="todo-count">{`${done} items left`}</span>
      <TaskFilter filter={filter} onFilterChange={onFilterChange} />
      <button className="clear-completed" type="button" onClick={deleteCompleted}>
        Clear completed
      </button>
    </footer>
  );
}

Footer.propTypes = {
  done: PropTypes.number.isRequired,
  deleteCompleted: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired,
  onFilterChange: PropTypes.func.isRequired,
};

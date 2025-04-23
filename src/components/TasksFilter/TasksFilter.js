import React from 'react';
import './TasksFilter.css';
import PropTypes from 'prop-types';

export default function TasksFilter({ onTodoFiltered }) {
  return (
    <ul className="filters">
      <li>
        <button onClick={() => onTodoFiltered('All')}>All</button>
      </li>
      <li>
        <button onClick={() => onTodoFiltered('Active')}>Active</button>
      </li>
      <li>
        <button onClick={() => onTodoFiltered('Completed')}>Completed</button>
      </li>
    </ul>
  );
}

TasksFilter.propTypes = {
  onTodoFiltered: PropTypes.func.isRequired,
};

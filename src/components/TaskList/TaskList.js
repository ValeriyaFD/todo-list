import React from 'react';
import PropTypes from 'prop-types';
import Task from '../Task/Task';
import './TaskList.css';

export default function TaskList({
  todos,
  onDelete,
  onToggleDone,
  onEdit,
  onSave,
  onStartTimer,
  onPauseTimer,
  onStopTimer,
}) {
  const elements = todos.map((todo) => {
    return (
      <Task
        key={todo.id}
        todo={todo}
        onDelete={onDelete}
        onEdit={onEdit}
        onToggleDone={onToggleDone}
        onSave={onSave}
        onStartTimer={() => onStartTimer(todo.id)} 
        onPauseTimer={() => onPauseTimer(todo.id)} 
        onStopTimer={() => onStopTimer(todo.id)}
      />
    );
  });
  return (
    <section className="main">
      <ul className="todo-list">{elements}</ul>
    </section>
  );
}

TaskList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      description: PropTypes.string.isRequired,
      completed: PropTypes.bool,
      date: PropTypes.instanceOf(Date).isRequired,
      onEditing: PropTypes.bool.isRequired,
    }).isRequired
  ).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onToggleDone: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onStartTimer: PropTypes.func.isRequired,
  onPauseTimer: PropTypes.func.isRequired,
  onStopTimer: PropTypes.func.isRequired,
};

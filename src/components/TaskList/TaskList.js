import React from 'react';
import Task from '../Task/Task';
import './TaskList.css';
import PropTypes from 'prop-types';

export default function TaskList({ todos, onToggleCompleted, onEdit, onDelete, onSaveDescription, setTodos }) {
  return (
    <section className="main">
      <ul className="todo-list">
        {todos.map((todo) => {
          return (
            <li key={todo.id}>
              <Task
                description={todo.description}
                completed={todo.completed}
                date={todo.date}
                onToggleCompleted={() => onToggleCompleted(todo.id)}
                onEdit={() => onEdit(todo.id)}
                onDelete={() => onDelete(todo.id)}
                id={todo.id}
              />
              {!todo.completed && todo.onEditing ? (
                <input
                  type="text"
                  className="edit"
                  value={todo.editingText}
                  onChange={(e) => {
                    setTodos(todos.map((t) => (t.id === todo.id ? { ...t, editingText: e.target.value } : t)));
                  }}
                  onKeyDown={(event) => onSaveDescription(todo.id, event)}
                />
              ) : null}
            </li>
          );
        })}
      </ul>
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
  onToggleCompleted: PropTypes.func.isRequired,
  onSaveDescription: PropTypes.func.isRequired,
  setTodos: PropTypes.func.isRequired,
};

TaskList.defaultProps = {
  completed: false,
};

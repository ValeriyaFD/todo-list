import './NewTaskForm.css';
import React, { useState } from 'react';
import PropTypes from 'prop-types';

export default function NewTaskForm({ todos, setTodos, nextId, setNextId }) {
  const [newTaskDescription, setNewTaskDescription] = useState('');

  const newTaskDescriptionText = (ev) => {
    setNewTaskDescription(ev.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      if (newTaskDescription.trim() !== '') {
        const newTodo = {
          id: nextId,
          description: newTaskDescription,
          completed: false,
          onEditing: false,
          date: new Date(),
        };
        setTodos([...todos, newTodo]);
        setNextId(nextId + 1);
        setNewTaskDescription('');
      }
    }
  };

  return (
    <header>
      <h1>Todos</h1>
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        type="text"
        value={newTaskDescription}
        onChange={newTaskDescriptionText}
        onKeyDown={handleKeyDown}
      />
    </header>
  );
}

NewTaskForm.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      description: PropTypes.string.isRequired,
      completed: PropTypes.bool,
      date: PropTypes.instanceOf(Date).isRequired,
      onEditing: PropTypes.bool.isRequired,
    }).isRequired
  ).isRequired,
  setTodos: PropTypes.func.isRequired,
  nextId: PropTypes.number.isRequired,
  setNextId: PropTypes.func.isRequired,
};
// первоначальное состояние

// export default function NewTaskForm() {
//     return (
//       <header>
//         <h1>Todos</h1>
//         <input
//           className="new-todo"
//           placeholder="What needs to be done?"
//           autoFocus
//         />
//       </header>
//     );
//   }

import Task from "../Task/Task";
import "./TaskList.css";
import PropTypes from 'prop-types';

export default function TaskList({
  todos,
  onToggleCompleted,
  onEdit,
  onDelete,
  onSaveDescription,
  newTaskText,
  newText
}) {
  
  
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
              />
              {todo.onEditing ? (
                <input
                  type="text"
                  className="edit"
                  value={newTaskText}
                  onChange={newText}
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
  newTaskText: PropTypes.string.isRequired,
  newText: PropTypes.func.isRequired,
};

TaskList.defaultProps = {
  completed: false, 
};
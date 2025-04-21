import './Footer.css';
import TasksFilter from '../TasksFilter/TasksFilter';
import PropTypes from 'prop-types';

export default function Footer ({todos, setTodos, onTodoFiltered}) {
  const todosCount = todos.filter((todo) => !todo.completed).length;

  const deleteAll = () => {
    setTodos(todos.filter((todo) => !todo.completed));
  }


    return (
      <footer className="footer">
        <span className="todo-count">{`${todosCount} items left`}</span>
        <TasksFilter todos={todos} setTodos={setTodos} onTodoFiltered ={onTodoFiltered} />
        <button className="clear-completed" onClick={deleteAll}>Clear completed</button>
      </footer>
    )
}

Footer.propTypes = {
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
  onTodoFiltered: PropTypes.func.isRequired,
}

Footer.defaultProps = {
  todos: [],
}
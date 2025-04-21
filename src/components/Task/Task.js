import { formatDistanceToNow } from 'date-fns/formatDistanceToNow';
import KG from 'date-fns/locale/en-AU';
import "./Task.css";
import PropTypes from 'prop-types';

export default function Task({
  completed,
  description,
  date,
  onEdit,
  onDelete,
  onToggleCompleted
}) {


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
      />
      <label
        className={`${completed ? "completed" : ""}`}
        onClick={toggleCompleted}
      >
        <span className="description">{description} </span>
        <span className="created">created {formatDistanceToNow(date, {
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
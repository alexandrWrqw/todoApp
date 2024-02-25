import "./TodoListItem.css";

const TodoListItem = ({ task, onDeleted, onToggleCompleted }) => {
  let className = "";
  if (task.completed) {
    className += "completed";
  }

  return (
    <li className={className}>
      <div className="view">
        <input
          onClick={onToggleCompleted}
          className="toggle"
          type="checkbox"
          id={task.id}
        />
        <label htmlFor={task.id}>
          <span className="description">{task.description}</span>
          <span className="created">{task.createdTime}</span>
          {/*created 5 minutes ago */}
        </label>
        <button className="icon icon-edit"></button>
        <button className="icon icon-destroy" onClick={onDeleted}></button>
      </div>
    </li>
  );
};

export default TodoListItem;

import "./TodoList.css";
import PropTypes from "prop-types";
import TodoListItem from "../TodoListItem/TodoListItem";

function TodoList({ tasks, deleteTask, toggleCompleteTask, editTask }) {
  return (
    <ul className="todo-list">
      {tasks.map((task) => (
        <TodoListItem
          task={task}
          key={task.id}
          deleteTask={() => deleteTask(task.id)}
          toggleCompleteTask={() => toggleCompleteTask(task.id)}
          editTask={editTask}
        />
      ))}
    </ul>
  );
}

TodoList.propTypes = {
  tasks: PropTypes.array,
  deleteTask: PropTypes.func.isRequired,
  toggleCompleteTask: PropTypes.func.isRequired,
  editTask: PropTypes.func.isRequired,
};

TodoList.defaultProps = {
  tasks: [],
};

export default TodoList;

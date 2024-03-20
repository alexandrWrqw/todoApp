import PropTypes from "prop-types";
import TodoListItem from "../TodoListItem/TodoListItem";

function TodoList({
  tasks,
  deleteTask,
  toggleCompleteTask,
  editTask,
  saveTimer,
  hasTimer,
  getTimer,
  deleteTimer,
}) {
  return (
    <ul className="todo-list">
      {tasks.map((task) => (
        <TodoListItem
          task={task}
          key={task.id}
          deleteTask={() => deleteTask(task.id)}
          toggleCompleteTask={() => toggleCompleteTask(task.id)}
          editTask={editTask}
          saveTimer={saveTimer}
          hasTimer={hasTimer}
          getTimer={getTimer}
          deleteTimer={deleteTimer}
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
  saveTimer: PropTypes.func.isRequired,
  hasTimer: PropTypes.func.isRequired,
  getTimer: PropTypes.func.isRequired,
  deleteTimer: PropTypes.func.isRequired,
};

TodoList.defaultProps = {
  tasks: [],
};

export default TodoList;

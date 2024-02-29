import "./TodoList.css";
import TodoListItem from "../TodoListItem/TodoListItem";
import { Component } from "react";
import PropTypes from "prop-types";

export default class TodoList extends Component {
  render() {
    const { tasks, deleteTask, toggleCompleteTask, editTask } = this.props;

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

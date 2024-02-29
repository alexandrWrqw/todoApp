import "./TodoListItem.css";
import { Component } from "react";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import PropTypes from "prop-types";

export default class TodoListItem extends Component {
  state = {
    editing: false,
    value: "",
  };

  submitEditedTask(e) {
    e.preventDefault();

    const { editTask, task } = this.props;
    editTask(task.id, this.state.value);
    this.setState({ editing: false, value: "" });
  }

  render() {
    const { task, deleteTask, toggleCompleteTask } = this.props;

    return (
      <li
        className={
          task.completed ? "completed" : this.state.editing ? "editing" : null
        }
      >
        <div className="view">
          <input
            onChange={toggleCompleteTask}
            className="toggle"
            type="checkbox"
            id={task.id}
            checked={task.completed}
          />
          <label htmlFor={task.id}>
            <span className="description">{task.description}</span>
            <span className="created">
              {`created ${formatDistanceToNow(task.createdTime, {
                addSuffix: true,
              })}`}
            </span>
          </label>
          <button
            className="icon icon-edit"
            onClick={() =>
              this.setState(({ editing }) => ({
                editing: !editing,
                value: this.props.task.description,
              }))
            }
          ></button>
          <button className="icon icon-destroy" onClick={deleteTask}></button>
        </div>
        {this.state.editing ? (
          <form
            className="submitForm"
            onSubmit={this.submitEditedTask.bind(this)}
          >
            <input
              type="text"
              className="edit"
              onChange={(e) => this.setState({ value: e.target.value })}
              value={this.state.value}
            />
          </form>
        ) : null}
      </li>
    );
  }
}

TodoListItem.propsTypes = {
  task: PropTypes.shape({
    description: PropTypes.string,
    createdTime: PropTypes.instanceOf(Date),
    completed: PropTypes.bool,
    id: PropTypes.number,
  }),
  deleteTask: PropTypes.func.isRequired,
  toggleCompleteTask: PropTypes.func.isRequired,
  editTask: PropTypes.func.isRequired,
};

TodoListItem.defaultProps = {
  task: {},
};

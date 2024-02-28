import "./TodoListItem.css";
import { Component } from "react";

import formatDistanceToNow from "date-fns/formatDistanceToNow";

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
        <form onSubmit={this.submitEditedTask.bind(this)}>
          <input
            type="text"
            className="edit"
            onChange={(e) => this.setState({ value: e.target.value })}
            value={this.state.value}
          />
        </form>
      </li>
    );
  }
}

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

    const {
      editTask,
      task: { id },
    } = this.props;
    const { value } = this.state;
    if (value.trim() !== "") editTask(id, value);
    this.setState({ editing: false, value: "" });
  }

  render() {
    const {
      task: { completed, id, description, createdTime },
      deleteTask,
      toggleCompleteTask,
    } = this.props;
    const { editing, value } = this.state;

    return (
      <li className={completed ? "completed" : editing ? "editing" : null}>
        <div className="view">
          <input
            onChange={toggleCompleteTask}
            className="toggle"
            type="checkbox"
            id={id}
            checked={completed}
          />
          <label htmlFor={id}>
            <span className="description">{description}</span>
            <span className="created">
              {`created ${formatDistanceToNow(createdTime, {
                addSuffix: true,
              })}`}
            </span>
          </label>
          <button
            type="button"
            aria-label="edit task"
            className="icon icon-edit"
            onClick={() =>
              // eslint-disable-next-line no-shadow
              this.setState(({ editing }) => ({
                editing: !editing,
                value: description,
              }))
            }
          />
          <button
            type="button"
            aria-label="delete task"
            className="icon icon-destroy"
            onClick={deleteTask}
          />
        </div>
        {editing ? (
          <form
            className="submitForm"
            onSubmit={this.submitEditedTask.bind(this)}
          >
            <input
              type="text"
              className="edit"
              onChange={(e) => this.setState({ value: e.target.value })}
              value={value}
              autoFocus
            />
          </form>
        ) : null}
      </li>
    );
  }
}

TodoListItem.propTypes = {
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

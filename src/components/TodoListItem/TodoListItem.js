import { Component } from "react";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import PropTypes from "prop-types";

export default class TodoListItem extends Component {
  state = {
    editing: false,
    value: "",
    runningTimer: true,
    seconds: 55,
    minutes: 0,
  };

  componentDidMount() {
    this.startTimer();
  }

  formatTime = (value) => {
    let timeStr = value.toString();

    if (timeStr.length < 2) {
      timeStr = `0${timeStr}`;
    }

    return timeStr;
  };

  startTimer = () => {
    this.watch = setInterval(() => this.timer(), 1000);
  };

  stopTimer = () => {
    this.setState({ runningTimer: false });
    clearInterval(this.watch);
  };

  timer = () => {
    const { seconds, minutes } = this.state;

    this.setState({ seconds: seconds + 1 });

    if (seconds >= 59) {
      this.setState({ minutes: minutes + 1, seconds: 0 });
    }
  };

  submitEditedTask = (e) => {
    e.preventDefault();

    const {
      editTask,
      task: { id },
    } = this.props;
    const { value } = this.state;
    if (value.trim() !== "") editTask(id, value);
    this.setState({ editing: false, value: "" });
  };

  render() {
    const {
      task: { completed, id, description, createdTime },
      deleteTask,
      toggleCompleteTask,
    } = this.props;
    const { editing, value, seconds, minutes, runningTimer } = this.state;

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
            <span className="title">{description}</span>
            <span className="description">
              {`${this.formatTime(minutes)}:${this.formatTime(seconds)}`}
              <button
                type="button"
                className="icon icon-play"
                aria-label="Play"
                onClick={runningTimer ? null : this.startTimer}
              />
              <button
                type="button"
                className="icon icon-pause"
                aria-label="Pause"
                onClick={this.stopTimer}
              />
            </span>
            <span className="description">
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

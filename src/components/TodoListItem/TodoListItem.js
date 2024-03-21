import { Component } from "react";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import PropTypes from "prop-types";

import EditingTask from "../EditingTask/EditingTask";

export default class TodoListItem extends Component {
  state = {
    editing: false,
    runningTimer: false,
    seconds: 0,
    minutes: 0,
  };

  componentDidMount() {
    const { task, hasTimer, getTimer, deleteTimer } = this.props;
    const { id } = task;

    if (hasTimer(`task${id}`)) {
      const value = getTimer(`task${id}`);

      let [saveSeconds, saveMinutes] = value;
      const [, , saveDate, saveRunning] = value;

      if (saveRunning) {
        const nowDate = new Date();
        let difference = Math.ceil((nowDate - saveDate) / 1000);

        while (difference > 60) {
          difference -= 60;
          saveMinutes += 1;
        }

        saveSeconds += difference;
        this.startTimer();
      }

      this.setState({
        seconds: saveSeconds,
        minutes: saveMinutes,
        runningTimer: saveRunning,
      });

      deleteTimer(`task${id}`);
    } else {
      this.startTimer();
    }
  }

  componentWillUnmount() {
    const { task, saveTimer } = this.props;
    const { id } = task;

    const { runningTimer, seconds, minutes } = this.state;

    saveTimer(`task${id}`, [seconds, minutes, new Date(), runningTimer]);
  }

  startTimer = () => {
    this.setState({ runningTimer: true });
    this.watch = setInterval(() => this.timer(), 1000);
  };

  stopTimer = () => {
    this.setState({ runningTimer: false });
    clearInterval(this.watch);
  };

  timer = () => {
    const { seconds, minutes } = this.state;
    const { sec, min } = this.props.task;

    if (
      min !== "" &&
      sec !== "" &&
      minutes === Number(min) &&
      seconds === Number(sec)
    ) {
      return this.stopTimer();
    }

    this.setState({ seconds: seconds + 1 });

    if (seconds >= 59) {
      this.setState({ minutes: minutes + 1, seconds: 0 });
    }
  };

  formatTime = (value) => {
    let timeStr = value.toString();

    if (timeStr.length < 2) {
      timeStr = `0${timeStr}`;
    }

    return timeStr;
  };

  submitEditedTask = (e, val) => {
    e.preventDefault();

    const {
      editTask,
      task: { id },
    } = this.props;
    if (val.trim() !== "") editTask(id, val);
    this.setState({ editing: false });
  };

  onCloseEditingMode = () => {
    this.setState({ editing: false });
  };

  render() {
    const { task, deleteTask, toggleCompleteTask } = this.props;
    const { completed, id, description, createdTime, min, sec } = task;
    const { editing, seconds, minutes, runningTimer } = this.state;

    const notNullTimer = min !== "" && sec !== "";

    return (
      <li className={completed ? "completed" : editing ? "editing" : null}>
        <div className="view">
          <input
            onChange={() => {
              toggleCompleteTask();
              completed ? this.startTimer() : this.stopTimer();
            }}
            className="toggle"
            type="checkbox"
            id={id}
            checked={completed}
          />
          <label htmlFor={id}>
            <span className="title">{description}</span>
            <span className="description">
              <span
                style={
                  notNullTimer &&
                  minutes === Number(min) &&
                  seconds === Number(sec)
                    ? { color: "red" }
                    : null
                }
              >
                {`${this.formatTime(minutes)}:${this.formatTime(seconds)} `}
                {notNullTimer
                  ? `(${this.formatTime(min)}:${this.formatTime(sec)} end)`
                  : null}
              </span>
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
                onClick={runningTimer ? this.stopTimer : null}
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
              }))
            }
          />
          <button
            type="button"
            aria-label="delete task"
            className="icon icon-destroy"
            onClick={() => deleteTask(id)}
          />
        </div>
        {editing ? (
          <EditingTask
            submitEditedTask={this.submitEditedTask}
            onCloseEditingMode={this.onCloseEditingMode}
            description={description}
          />
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
    sec: PropTypes.string,
    min: PropTypes.string,
  }),
  deleteTask: PropTypes.func.isRequired,
  toggleCompleteTask: PropTypes.func.isRequired,
  editTask: PropTypes.func.isRequired,
  saveTimer: PropTypes.func.isRequired,
  hasTimer: PropTypes.func.isRequired,
  getTimer: PropTypes.func.isRequired,
  deleteTimer: PropTypes.func.isRequired,
};

TodoListItem.defaultProps = {
  task: {},
};

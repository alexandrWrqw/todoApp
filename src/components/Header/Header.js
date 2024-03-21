import { Component } from "react";
import PropTypes from "prop-types";

export default class Header extends Component {
  state = {
    label: "",
    min: "",
    sec: "",
  };

  onChangeTask = (e) => {
    this.setState({
      label: e.target.value,
    });
  };

  onChangeMin = (e) => {
    this.setState({
      min: e.target.value,
    });
  };

  onChangeSec = (e) => {
    this.setState({
      sec: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { label, min, sec } = this.state;
    const { addTask } = this.props;

    if (label.trim() !== "") addTask(label, min, sec);
    this.setState({ label: "", min: "", sec: "" });
  };

  render() {
    const { label, min, sec } = this.state;

    return (
      <header className="header">
        <h1>todos</h1>
        <form onSubmit={this.onSubmit} className="new-todo-form">
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            onChange={this.onChangeTask}
            value={label}
            autoFocus
            required
          />
          <input
            className="new-todo-form__timer"
            placeholder="Min"
            onChange={this.onChangeMin}
            value={min}
            autoFocus
            type="number"
            min="0"
          />
          <input
            className="new-todo-form__timer"
            placeholder="Sec"
            onChange={this.onChangeSec}
            value={sec}
            autoFocus
            type="number"
            max="59"
            min="0"
          />
          <button type="submit" aria-label="submit" />
        </form>
      </header>
    );
  }
}

Header.propTypes = {
  addTask: PropTypes.func.isRequired,
};

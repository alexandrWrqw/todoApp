import { Component } from "react";
import PropTypes from "prop-types";

export default class Header extends Component {
  state = {
    label: "",
  };

  onChange = (e) => {
    this.setState({
      label: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { label } = this.state;
    const { addTask } = this.props;

    if (label.trim() !== "") addTask(label);
    this.setState({ label: "" });
  };

  render() {
    const { label } = this.state;

    return (
      <header className="header">
        <h1>todos</h1>
        <form onSubmit={this.onSubmit}>
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            onChange={this.onChange}
            value={label}
            autoFocus
          />
        </form>
      </header>
    );
  }
}

Header.propTypes = {
  addTask: PropTypes.func.isRequired,
};

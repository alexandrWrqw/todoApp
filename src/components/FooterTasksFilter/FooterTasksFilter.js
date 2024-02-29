import "./FooterTasksFilter.css";
import { Component } from "react";
import PropTypes from "prop-types";

export default class TasksFilter extends Component {
  render() {
    const { changeFilter, filter } = this.props;

    return (
      <ul className="filters">
        <li>
          <button
            className={filter === "all" ? "selected" : null}
            onClick={() => changeFilter("all")}
          >
            All
          </button>
        </li>
        <li>
          <button
            className={filter === "active" ? "selected" : null}
            onClick={() => changeFilter("active")}
          >
            Active
          </button>
        </li>
        <li>
          <button
            className={filter === "completed" ? "selected" : null}
            onClick={() => changeFilter("completed")}
          >
            Completed
          </button>
        </li>
      </ul>
    );
  }
}

TasksFilter.propsTypes = {
  filter: PropTypes.string,
  changeFilter: PropTypes.func.isRequired,
};

TasksFilter.defaultProps = {
  filter: "all",
};

import "./Footer.css";
import TasksFilter from "../FooterTasksFilter/FooterTasksFilter";
import { Component } from "react";
import PropTypes from "prop-types";

export default class Footer extends Component {
  render() {
    const { notCompletedCount, deleteCompletedTasks, changeFilter, filter } =
      this.props;

    return (
      <footer className="footer">
        <span className="todo-count">{notCompletedCount} items left</span>
        <TasksFilter changeFilter={changeFilter} filter={filter} />
        <button
          className="clear-completed"
          onClick={() => deleteCompletedTasks()}
        >
          Clear completed
        </button>
      </footer>
    );
  }
}

Footer.propTypes = {
  filter: PropTypes.string,
  notCompletedCount: PropTypes.number,
  deleteCompletedTasks: PropTypes.func.isRequired,
  changeFilter: PropTypes.func.isRequired,
};

Footer.defaultProps = {
  filter: "all",
};

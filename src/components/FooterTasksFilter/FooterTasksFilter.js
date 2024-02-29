import "./FooterTasksFilter.css";
import PropTypes from "prop-types";

function TasksFilter({ changeFilter, filter }) {
  return (
    <ul className="filters">
      <li>
        <button
          type="button"
          className={filter === "all" ? "selected" : null}
          onClick={() => changeFilter("all")}
        >
          All
        </button>
      </li>
      <li>
        <button
          type="button"
          className={filter === "active" ? "selected" : null}
          onClick={() => changeFilter("active")}
        >
          Active
        </button>
      </li>
      <li>
        <button
          type="button"
          className={filter === "completed" ? "selected" : null}
          onClick={() => changeFilter("completed")}
        >
          Completed
        </button>
      </li>
    </ul>
  );
}

TasksFilter.propTypes = {
  filter: PropTypes.string,
  changeFilter: PropTypes.func.isRequired,
};

TasksFilter.defaultProps = {
  filter: "all",
};

export default TasksFilter;

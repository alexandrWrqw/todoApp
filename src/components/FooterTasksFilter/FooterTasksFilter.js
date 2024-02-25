import "./FooterTasksFilter.css";

const TasksFilter = ({ changeFilter, filter }) => {
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
};

export default TasksFilter;

import "./Footer.css";
import PropTypes from "prop-types";
import TasksFilter from "../FooterTasksFilter/FooterTasksFilter";

function Footer({
  notCompletedCount,
  deleteCompletedTasks,
  changeFilter,
  filter,
}) {
  return (
    <footer className="footer">
      <span className="todo-count">{notCompletedCount} items left</span>
      <TasksFilter changeFilter={changeFilter} filter={filter} />
      <button
        type="button"
        className="clear-completed"
        onClick={() => deleteCompletedTasks()}
      >
        Clear completed
      </button>
    </footer>
  );
}

Footer.propTypes = {
  filter: PropTypes.string,
  notCompletedCount: PropTypes.number,
  deleteCompletedTasks: PropTypes.func.isRequired,
  changeFilter: PropTypes.func.isRequired,
};

Footer.defaultProps = {
  filter: "all",
  notCompletedCount: 0,
};

export default Footer;

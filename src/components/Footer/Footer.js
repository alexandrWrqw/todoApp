import "./Footer.css";
import TasksFilter from "../FooterTasksFilter/FooterTasksFilter";

const Footer = ({ notCompleted, onDeletedAllCompleted }) => {
  return (
    <footer className="footer">
      <span className="todo-count">{notCompleted} items left</span>
      <TasksFilter />
      <button
        className="clear-completed"
        onClick={() => onDeletedAllCompleted()}
      >
        Clear completed
      </button>
    </footer>
  );
};

export default Footer;

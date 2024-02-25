import "./Footer.css";
import TasksFilter from "../FooterTasksFilter/FooterTasksFilter";

const Footer = ({ notCompleted }) => {
  return (
    <footer className="footer">
      <span className="todo-count">{notCompleted} items left</span>
      <TasksFilter />
      <button className="clear-completed">Clear completed</button>
    </footer>
  );
};

export default Footer;

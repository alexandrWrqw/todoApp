import "./TodoList.css";
import TodoListItem from "../TodoListItem/TodoListItem";

const TodoList = ({ tasks }) => {
  return (
    <ul className="todo-list">
      {tasks.map((task) => (
        <TodoListItem task={task} key={task.id} />
      ))}
    </ul>
  );
};

export default TodoList;

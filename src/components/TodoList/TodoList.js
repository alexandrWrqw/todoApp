import "./TodoList.css";
import TodoListItem from "../TodoListItem/TodoListItem";

const TodoList = ({ tasks, onDeleted, onToggleCompleted }) => {
  return (
    <ul className="todo-list">
      {tasks.map((task) => (
        <TodoListItem
          task={task}
          key={task.id}
          onDeleted={() => onDeleted(task.id)}
          onToggleCompleted={() => onToggleCompleted(task.id)}
        />
      ))}
    </ul>
  );
};

export default TodoList;

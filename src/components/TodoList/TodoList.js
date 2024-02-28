import "./TodoList.css";
import TodoListItem from "../TodoListItem/TodoListItem";

const TodoList = ({ tasks, deleteTask, toggleCompleteTask, editTask }) => {
  return (
    <ul className="todo-list">
      {tasks.map((task) => (
        <TodoListItem
          task={task}
          key={task.id}
          deleteTask={() => deleteTask(task.id)}
          toggleCompleteTask={() => toggleCompleteTask(task.id)}
          editTask={editTask}
        />
      ))}
    </ul>
  );
};

export default TodoList;

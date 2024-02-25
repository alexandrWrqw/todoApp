import "./App.css";
import { Component } from "react";

import Header from "../Header/Header";
import TodoList from "../TodoList/TodoList";
import Footer from "../Footer/Footer";

export default class App extends Component {
  maxId = 1;

  state = {
    tasks: [],
  };

  createTask(description) {
    return {
      description,
      createdTime: "time",
      completed: false,
      id: this.maxId++,
    };
  }

  addTask = (text) => {
    this.setState(({ tasks }) => {
      const newTasks = [...tasks, this.createTask(text)];

      return {
        tasks: newTasks,
      };
    });
  };

  deleteTask = (id) => {
    this.setState(({ tasks }) => {
      const idx = tasks.findIndex((el) => el.id === id);

      const newTasks = [...tasks.slice(0, idx), ...tasks.slice(idx + 1)];

      return { tasks: newTasks };
    });
  };

  toggleCompletedTask = (id) => {
    this.setState(({ tasks }) => {
      const idx = tasks.findIndex((el) => el.id === id);

      const oldTask = tasks[idx];
      const newTask = { ...oldTask, completed: !oldTask.completed };

      const newTasks = [
        ...tasks.slice(0, idx),
        newTask,
        ...tasks.slice(idx + 1),
      ];

      return {
        tasks: newTasks,
      };
    });
  };

  deleteCompletedTasks = () => {
    this.setState(({ tasks }) => {
      const newTasks = tasks.filter((el) => el.completed === false);

      return {
        tasks: newTasks,
      };
    });
  };

  render() {
    const { tasks } = this.state;

    const notCompletedCount = tasks.filter((task) => !task.completed).length;

    return (
      <section className="todoapp">
        <Header onAddedTask={this.addTask} />
        <section className="main">
          <TodoList
            tasks={tasks}
            onDeleted={this.deleteTask}
            onToggleCompleted={this.toggleCompletedTask}
          />
          <Footer
            notCompleted={notCompletedCount}
            onDeletedAllCompleted={this.deleteCompletedTasks}
          />
        </section>
      </section>
    );
  }
}

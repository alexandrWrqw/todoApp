import "./App.css";
import { Component } from "react";

import Header from "../Header/Header";
import TodoList from "../TodoList/TodoList";
import Footer from "../Footer/Footer";

export default class App extends Component {
  maxId = 1;

  state = {
    tasks: [
      this.createTask("Active task 1"),
      this.createTask("Active task 2"),
      this.createTask("Active task 3"),
    ],
  };

  createTask(description) {
    return {
      description,
      createdTime: "time",
      completed: false,
      id: this.maxId++,
    };
  }

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

  render() {
    const { tasks } = this.state;

    const notCompletedCount = tasks.filter((task) => !task.completed).length;

    return (
      <section className="todoapp">
        <Header />
        <section className="main">
          <TodoList
            tasks={tasks}
            onDeleted={this.deleteTask}
            onToggleCompleted={this.toggleCompletedTask}
          />
          <Footer notCompleted={notCompletedCount} />
        </section>
      </section>
    );
  }
}

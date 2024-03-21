import { Component } from "react";

import Header from "../Header/Header";
import TodoList from "../TodoList/TodoList";
import Footer from "../Footer/Footer";

export default class App extends Component {
  maxId = 1;

  state = {
    tasks: [],
    filter: "all",
    savedTimers: new Map(),
  };

  createTask(description, min, sec) {
    return {
      description,
      createdTime: new Date(),
      completed: false,
      id: this.maxId++,
      min,
      sec,
    };
  }

  addTask = (text, min, sec) => {
    this.setState(({ tasks }) => {
      const newTasks = [...tasks, this.createTask(text, min, sec)];

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

    this.deleteTimer(id);
  };

  editTask = (id, value) => {
    this.setState(({ tasks }) => {
      tasks.map((task) => {
        if (task.id === id) task.description = value;
        return task;
      });
    });
  };

  toggleCompleteTask = (id) => {
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

  changeFilter = (fValue) => {
    this.setState({ filter: fValue });
  };

  filterTasks = () => {
    const { tasks, filter } = this.state;

    return tasks.filter(({ completed }) => {
      const all = filter === "all";
      const complete = filter === "completed";

      return all ? true : complete ? completed === true : completed === false;
    });
  };

  saveTimer = (id, timeData) => {
    const { savedTimers } = this.state;
    savedTimers.set(id, timeData);
  };

  hasTimer = (id) => {
    const { savedTimers } = this.state;
    return savedTimers.has(id);
  };

  getTimer = (id) => {
    const { savedTimers } = this.state;
    return savedTimers.get(id);
  };

  deleteTimer = (id) => {
    const { savedTimers } = this.state;
    savedTimers.delete(id);
  };

  render() {
    const { tasks, filter } = this.state;

    const notCompletedCount = tasks.filter((task) => !task.completed).length;

    return (
      <section className="todoapp">
        <Header addTask={this.addTask} />
        <section className="main">
          <TodoList
            tasks={this.filterTasks()}
            deleteTask={this.deleteTask}
            toggleCompleteTask={this.toggleCompleteTask}
            editTask={this.editTask}
            saveTimer={this.saveTimer}
            hasTimer={this.hasTimer}
            getTimer={this.getTimer}
            deleteTimer={this.deleteTimer}
          />
          <Footer
            notCompletedCount={notCompletedCount}
            deleteCompletedTasks={this.deleteCompletedTasks}
            changeFilter={this.changeFilter}
            filter={filter}
          />
        </section>
      </section>
    );
  }
}

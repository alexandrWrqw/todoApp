import "./App.css";
import { Component } from "react";

import Header from "../Header/Header";
import TodoList from "../TodoList/TodoList";
import Footer from "../Footer/Footer";

export default class App extends Component {
  state = {
    tasks: [
      { id: 1, description: "Active task", createdTime: "time" },
      { id: 2, description: "Active task 2", createdTime: "time" },
      { id: 3, description: "Active task 3", createdTime: "time" },
    ],
  };

  deleteTask = (id) => {
    this.setState(({ tasks }) => {
      const idx = tasks.findIndex((el) => el.id === id);

      const newTasks = [...tasks.slice(0, idx), ...tasks.slice(idx + 1)];

      return { tasks: newTasks };
    });
  };

  render() {
    const { tasks } = this.state;

    return (
      <section className="todoapp">
        <Header />
        <section className="main">
          <TodoList tasks={tasks} onDeleted={this.deleteTask} />
          <Footer />
        </section>
      </section>
    );
  }
}

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

  render() {
    const { tasks } = this.state;

    return (
      <section className="todoapp">
        <Header />
        <section className="main">
          <TodoList tasks={tasks} />
          <Footer />
        </section>
      </section>
    );
  }
}

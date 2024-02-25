import "./TodoListItem.css";
import { Component } from "react";

export default class TodoListItem extends Component {
  state = {
    completed: false,
  };

  onLabelClick = () => {
    this.setState((state) => {
      return {
        completed: !this.state.completed,
      };
    });
  };

  render() {
    const { task, onDeleted } = this.props;
    const { completed } = this.state;

    let className = "";
    if (completed) {
      className += "completed";
    }

    return (
      <li className={className}>
        <div className="view">
          <label>
            <input
              onClick={this.onLabelClick}
              className="toggle"
              type="checkbox"
            />
            <span className="description">{task.description}</span>
            <span className="created">{task.createdTime}</span>
            {/*created 5 minutes ago */}
          </label>
          <button className="icon icon-edit"></button>
          <button className="icon icon-destroy" onClick={onDeleted}></button>
        </div>
      </li>
    );
  }
}

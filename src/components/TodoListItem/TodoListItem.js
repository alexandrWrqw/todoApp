import "./TodoListItem.css";
import { Component } from "react";

import formatDistanceToNow from "date-fns/formatDistanceToNow";

export default class TodoListItem extends Component {
  render() {
    const { task, onDeleted, onToggleCompleted } = this.props;

    let className = "";
    if (task.completed) {
      className += "completed";
    }

    return (
      <li className={className}>
        <div className="view">
          <input
            onChange={onToggleCompleted}
            className="toggle"
            type="checkbox"
            id={task.id}
            checked={task.completed}
          />
          <label htmlFor={task.id}>
            <span className="description">{task.description}</span>
            <span className="created">
              {formatDistanceToNow(task.createdTime, { addSuffix: true })}
            </span>
            {/*created 5 minutes ago */}
          </label>
          <button className="icon icon-edit"></button>
          <button className="icon icon-destroy" onClick={onDeleted}></button>
        </div>
      </li>
    );
  }
}

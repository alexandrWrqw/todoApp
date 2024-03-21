import { Component } from "react";
import PropTypes from "prop-types";

export default class EditingTask extends Component {
  state = {
    value: "",
  };

  componentDidMount() {
    const { description } = this.props;
    this.setState({ value: description });

    document.addEventListener("click", this.handleClickOutside, true);
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.handleClickOutside, true);
  }

  handleClickOutside = (event) => {
    const { onCloseEditingMode } = this.props;

    const editInput = document.querySelector(".edit");
    if (event.target !== editInput) {
      onCloseEditingMode();
    }
  };

  onClearValue = () => {
    this.setState({ value: "" });
  };

  render() {
    const { value } = this.state;
    const { submitEditedTask, onCloseEditingMode } = this.props;

    return (
      <form
        className="submitForm"
        onSubmit={(e) => {
          submitEditedTask(e, value);
          this.onClearValue();
        }}
      >
        <input
          type="text"
          className="edit"
          onChange={(e) => this.setState({ value: e.target.value })}
          onKeyDown={(e) => (e.keyCode === 27 ? onCloseEditingMode() : null)}
          value={value}
          autoFocus
        />
      </form>
    );
  }
}

EditingTask.propTypes = {
  description: PropTypes.string,
  submitEditedTask: PropTypes.func.isRequired,
  onCloseEditingMode: PropTypes.func.isRequired,
};

EditingTask.defaultProps = {
  description: "",
};

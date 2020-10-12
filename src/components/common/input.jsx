import React, { Component } from "react";

class Input extends Component {
  render() {
    const { name, label, value, onChange, error, type } = this.props;
    return (
      <div className="form-group">
        <label htmlFor={name}>{label}</label>
        <input
          type={type}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          className="form-control"
        />
        {error && <div className="alert alert-danger">{error}</div>}
      </div>
    );
  }
}

export default Input;

import React, { Component } from "react";

class Select extends Component {
  render() {
    const { name, label, options, onChange, error } = this.props;
    return (
      <div className="form-group">
        <label htmlFor={name}>{label}</label>
        <select
          className="form-control"
          name={name}
          id={name}
          onChange={onChange}
        >
          <option value="" />
          {options.map((item) => (
            <option key={item._id} value={item._id}>
              {item.name}
            </option>
          ))}
        </select>

        {error && <div className="alert alert-danger">{error}</div>}
      </div>
    );
  }
}

export default Select;

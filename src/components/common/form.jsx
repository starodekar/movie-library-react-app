import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./input";
import Select from "./select";

class Form extends Component {
  state = {
    formData: {},
    errors: {},
  };

  validateProperty = ({ name, value }) => {
    const field = { [name]: value }; // [name] => To set key of an object Dynamically.
    const schema = { [name]: this.schema[name] };
    const errors = { ...this.state.errors };
    const result = Joi.validate(field, schema);
    if (!result.error) delete errors[name];
    else errors[name] = result.error.details[0].message;
    return errors;
  };

  validateForm = () => {
    const result = Joi.validate(this.state.formData, this.schema, {
      abortEarly: false,
    });
    const errors = {};
    if (!result.error) return null;

    for (let i of result.error.details) {
      errors[i.path[0]] = i.message;
    }
    return errors;
  };

  handleChange = (e) => {
    const formData = { ...this.state.formData };
    const errors = this.validateProperty(e.currentTarget);
    formData[e.currentTarget.name] = e.currentTarget.value;
    this.setState({ formData, errors });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const errors = this.validateForm();
    this.setState({ errors: errors || {} });

    this.submit();
  };

  renderSubmitButton(label) {
    return (
      <button disabled={this.validateForm()} className="btn btn-primary">
        {label}
      </button>
    );
  }

  renderInput(name, label, type = "text") {
    const { formData, errors } = this.state;
    return (
      <Input
        type={type}
        name={name}
        label={label}
        value={formData[name]}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }

  renderSelect(name, label, options) {
    const { formData, errors } = this.state;
    return (
      <Select
        name={name}
        label={label}
        value={formData[name]}
        options={options}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }
}

export default Form;

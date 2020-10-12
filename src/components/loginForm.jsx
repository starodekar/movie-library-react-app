import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import auth from '../services/authService';
import { Redirect } from "react-router-dom";

class LoginForm extends Form {
  state = {
    formData: { username: "", password: "" },
    errors: {},
  };

  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  submit = async () => {
    try{
      await auth.login(this.state.formData);
      const {state} = this.props.location;
      window.location = state? state.from.pathname : '/';
    }catch(error){
      if(error && error.status === 400){
        const errors = {...this.state.errors}
        errors.username = error.data;
        this.setState({errors});
      }
    }
  };

  render() {
    if(auth.getCurrentUser()) return <Redirect to='/'/>
    
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderSubmitButton("Login")}
        </form>
      </div>
    );
  }
}

export default LoginForm;

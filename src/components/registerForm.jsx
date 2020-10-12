import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import register from '../services/userService';
import auth from "../services/authService";
import { Redirect } from "react-router-dom";

class RegisterForm extends Form {
  state = {
    formData: { username: "", password: "", name: "" },
    errors: {},
  };

  schema = {
    username: Joi.string().required().email().label("Username"),
    password: Joi.string().required().min(5).label("Password"),
    name: Joi.string().required().label("Password"),
  };

  submit = async () => {
    try{
      const response = await register(this.state.formData);
      auth.loginWithToken(response.headers['x-auth-token']);
      window.location = '/';
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
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderInput("name", "Name")}
          {this.renderSubmitButton("Register")}
        </form>
      </div>
    );
  }
}

export default RegisterForm;

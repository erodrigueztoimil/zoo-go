import React, { Component } from "react";
import { GlobalContext } from "../store/index";
import "../assets/css/login.css";
import { Link } from "react-router-dom";
import axios from "axios";
import Loading from "./Loading";

import Giraffe from "../assets/images/giraffe.png";

export default class Login extends Component {
  state = {
    username: "",
    birthYear: "",
    errMsg: "",
    loading: false,
  };

  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  login = () => {
    if (this.state.username && this.state.birthYear) {
      this.setState({ loading: true });

      const user = {
        username: this.state.username,
        password: this.state.birthYear,
      };

      axios
        .post("/api/login", user)
        .then((result) => {
          this.setState({ loading: false });

          this.context.dispatch({
            type: "updateUser",
            payload: result.data,
          });

          this.props.history.push("/");
        })
        .catch(console.error);
    } else {
      this.setState({ errMsg: "Please enter your credentials." });
    }
  };

  render() {
    return (
      <div className="login">
        {this.state.loading && <Loading />}

        <div className="content center-div">
          <img src={Giraffe} width="100%" alt="Giraffe" />
          <h1>Hello again!</h1>
          <div className="form">
            <input
              type="text"
              placeholder="Username"
              value={this.username}
              name="username"
              onChange={this.handleInputChange}
            />
            <input
              type="number"
              placeholder="Birth year"
              value={this.birthYear}
              name="birthYear"
              onChange={this.handleInputChange}
            />
            <h1 style={{ color: "red", fontSize: "16px" }}>
              {this.state.errMsg}
            </h1>
            <button className="nunito-font" onClick={this.login}>
              Login
            </button>
          </div>
          <p>
            Don't have an account? <Link to="/register">Register</Link>
          </p>
        </div>
      </div>
    );
  }
}

Login.contextType = GlobalContext;

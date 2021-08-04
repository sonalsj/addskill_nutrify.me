import React, { Component } from "react";
import axios from "axios";
import cookie from "js-cookie";
import { Redirect } from "react-router-dom";
import Navbar from "../layout/Navbar";

class UserProfile extends Component {
  state = {
    username: cookie.get("username"),
    limit: cookie.get("max_calorie"),
  };

  
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };


  handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      username: this.state.username,
      Max_calories: this.state.limit,
    };
    const token = cookie.get("token"); 
    const old_username = cookie.get("username"); 
    axios({
      method: "put",
      url: `api/v1/users/${old_username}`,
      data: data,
      headers: {
        Authorization: `Basic ${token}`,
      },
    })
      .then((res) => {
        this.setState({ redirect: true });
        cookie.set("username", res.data.user.username);
        cookie.set("max_calorie", res.data.user.Max_calories);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  render() {
    const username = cookie.get("username");
    const limit = cookie.get("max_calorie");
    const redirect = this.state.redirect;
    if (redirect) {
      return <Redirect to='/dashboard' />;
    }

  
    return (
      <div>
        <Navbar />
        <div className='container'>
          <form onSubmit={this.handleSubmit}>
            <h3>Update Profile</h3>
            <hr />
            <div className='form-group'>
              <label htmlFor='username'>Username:</label>
              <input
                type='text'
                className='form-control'
                placeholder={username}
                id='username'
                onChange={this.handleChange}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='limit'>Calorie Limit:</label>
              <input
                type='number'
                className='form-control'
                placeholder={limit}
                id='limit'
                onChange={this.handleChange}
              />
            </div>

            <button type='submit' className='btn btn-primary'>
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default UserProfile;

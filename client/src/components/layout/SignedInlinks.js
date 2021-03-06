import React, { Component } from "react";
import { NavLink, Redirect } from "react-router-dom";
import cookie from "js-cookie";
import axios from "axios";

class SignedInlinks extends Component {
  state = {
    redirect: false,
  };


  Logout = (e) => {
    const token = cookie.get("token"); 
    axios({
      method: "post",
      url: `users/logout`,
      headers: {
        Authorization: `Basic ${token}`,
      },
    })
      .then((res) => {
      
        cookie.remove("token");
        cookie.remove("user_id");
        cookie.remove("max_calorie");
        cookie.remove("username");
        this.setState({ redirect: true });
      })
      .catch((err) => {

        console.log(err.response);
      });
  };

  
  render() {
    
    const redirect = this.state.redirect;
    if (redirect) {
      return <Redirect to='/' />;
    }

    return (
      <ul className='navbar-nav'>
        <li className='nav-item'>
          <NavLink className='nav-link' to='/' style={{ color: "white" }}>
            Dashboard
          </NavLink>
        </li>
        <li className='nav-item'>
          <NavLink className='nav-link' to='/create' style={{ color: "white" }}>
            Add Meal
          </NavLink>
        </li>
        <li className='nav-item'>
          <NavLink
            className='nav-link'
            to='/profile'
            style={{ color: "white" }}
          >
            Profile
          </NavLink>
        </li>
        <li className='nav-item' style={{ color: "white" }}>
          <NavLink className='nav-link' to='#' onClick={this.Logout}>
            Logout
          </NavLink>
        </li>
      </ul>
    );
  }
}

export default SignedInlinks;

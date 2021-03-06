import React, { Component } from "react";
import axios from "axios";
import Navbar from "../layout/Navbar";
import cookie from "js-cookie";
import { Redirect } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class CreateMeal extends Component {
  state = {
    type: "",
    name: "",
    desc: "",
    calorie: 0,
    redirect: false,
    date: new Date(),
  };

  
  dateChange = (date) => {
    this.setState({ date: date });
  };


  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  
  handleSubmit = (e) => {
    e.preventDefault(); 
    const date = this.state.date; 

    const data = {
      meal_type: this.state.type,
      meal_name: this.state.name,
      description: this.state.desc,
      calorie: this.state.calorie,
      date:
        date.getDate() +
        "-" +
        parseInt(date.getMonth() + 1) +
        "-" +
        date.getFullYear(),
    };
    const token = cookie.get("token"); 
    axios({
      method: "post",
      url: `api/v1/meals`,
      data: data,
      headers: {
        Authorization: `Basic ${token}`,
      },
    })
      .then((res) => {
      
        this.setState({ redirect: true });
      })
      .catch((err) => {
      
        console.log(err);
      });
  };

  
  getCalories = (e) => {
    e.preventDefault(); 
    axios({
      method: "post",
      url: "https://trackapi.nutritionix.com/v2/natural/nutrients",
      data: {
        query: this.state.name,
      },
      headers: {
        "x-app-id": "f4f12d11",
        "x-app-key": "a02193a3c27dd924c3b9c438f39db957",
      },
    })
      .then((res) => {
    
        this.setState({ calorie: res.data.foods[0].nf_calories });
      })
      .catch((err) => {
        
        this.setState({ calorie: "Sorry! you have to set manually" });
      });
  };


  render() {
  
    const redirect = this.state.redirect;
    if (redirect) {
      return <Redirect to='/dashboard' />;
    }
    return (
      <div>
        <Navbar />
        <div className='container'>
          <form onSubmit={this.handleSubmit}>
            <h3>Add Meal</h3>
            <hr />
            <div className='form-group'>
              <label htmlFor='calender'>Date:</label>
              <div>
                <DatePicker
                  id='calender'
                  selected={this.state.date}
                  onSelect={this.dateChange}
                />
              </div>
            </div>

            <div className='form-group'>
              <label htmlFor='type'>Meal Type:</label>
              <input
                type='text'
                className='form-control'
                required
                id='type'
                onChange={this.handleChange}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='name'>Meal Name:</label>
              <input
                type='text'
                className='form-control'
                required
                id='name'
                onChange={this.handleChange}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='desc'>Description</label>
              <input
                type='text'
                className='form-control'
                id='desc'
                onChange={this.handleChange}
              />
            </div>
            <div className='form-group'>
              <div className='row'>
                <div className='col-8'>
                  <div className='form-group'>
                    <label htmlFor='calorie'>Calories:</label>
                    <input
                      type='number'
                      className='form-control'
                      required
                      id='calorie'
                      onChange={this.handleChange}
                      value={this.state.calorie}
                    />
                  </div>
                </div>
                <div className='col-4'>
                  <button
                    type='button'
                    className='btn btn-primary btn-block'
                    onClick={this.getCalories}
                    id='fetch'
                    style={{ marginTop: "14.5%" }}
                  >
                    Fetch from nutritionix.com
                  </button>
                </div>
              </div>
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

export default CreateMeal;

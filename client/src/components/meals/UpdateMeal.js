import React, { Component } from "react";
import axios from "axios";
import cookie from "js-cookie";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class CreateMeal extends Component {
  state = {
    type: this.props.children.meal_type,
    name: this.props.children.meal_name,
    desc: this.props.children.description,
    calorie: this.props.children.calorie,
    redirect: false,
    newdate: new Date(),
  };

  
  dateChange = (date) => {
    this.setState({ newdate: date });
  };

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };


  handleSubmit = (e) => {
    e.preventDefault(); 
    const date = this.state.newdate; 
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
    axios
      .put(`api/v1/meals/${this.props.children.date}`, {
        id: this.props.children._id,
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
        this.setState({
  
          calorie: res.data.foods[0].nf_calories,
        });
      })
      .catch((err) => {

        this.setState({ calorie: err });
      });
  };

  
  render() {
    const meal = this.props.children;

    if (this.state.redirect) {
      return (
        <div className='afterupdate'>
          <center>
            <h5>Updated Successful</h5>
            <button
              type='button'
              className='btn btn-danger'
              data-dismiss='modal'
              onClick={this.props.refresh}
            >
              Close
            </button>
          </center>
        </div>
      );
    }
    return (
      <div className='container'>
        <div className='form-group'>
          <label htmlFor={`${meal._id}calender`}>Date:</label>
          <div>
            <DatePicker
              id={`${meal._id}calender`}
              selected={this.state.newdate}
              onSelect={this.dateChange}
            />
          </div>
        </div>
        <div className='form-group'>
          <label htmlFor={`${meal._id}type`}>Meal Type:</label>
          <input
            type='text'
            className='form-control'
            required
            id={`${meal._id}type`}
            onChange={this.handleChange}
            placeholder={meal.meal_type}
          />
        </div>
        <div className='form-group'>
          <label htmlFor={`${meal._id}name`}>Meal Name:</label>
          <input
            type='text'
            className='form-control'
            required
            id={`${meal._id}name`}
            onChange={this.handleChange}
            placeholder={meal.meal_name}
          />
        </div>
        <div className='form-group'>
          <label htmlFor={`${meal._id}desc`}>Description</label>
          <input
            type='text'
            className='form-control'
            id={`${meal._id}desc`}
            onChange={this.handleChange}
            placeholder={meal.description}
          />
        </div>
        <div className='form-group'>
          <div className='row'>
            <div className='col-8'>
              <div className='form-group'>
                <label htmlFor={`${meal._id}calorie`}>Calories:</label>
                <input
                  type='number'
                  className='form-control'
                  required
                  id={`${meal._id}calorie`}
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
                style={{ marginTop: "9.5%" }}
              >
                Fetch from nutritionix.com
              </button>
            </div>
          </div>
        </div>

        <button
          type='submit'
          className='btn btn-primary'
          onClick={this.handleSubmit}
        >
          Submit
        </button>
      </div>
    );
  }
}

export default CreateMeal;

import React, { Component } from "react";
import MealSummary from "./MealSummary";
import cookie from "js-cookie";
import axios from "axios";
import JumboTron from "../dashboard/Jumbotron";

class MealList extends Component {
  state = {
    meals: [],
  };
  
  getdata = () => {
    const date = this.props.date;
    const datestring =
      date.getDate() +
      "-" +
      parseInt(date.getMonth() + 1) +
      "-" +
      date.getFullYear(); 
    const token = cookie.get("token");
    axios
      .get(`api/v1/meals/${datestring}`, {
        headers: {
          Authorization: `Basic ${token}`,
        },
      })
      .then((res) => {
      
        this.setState({ meals: res.data });
      });
  };

  
  componentDidMount() {
    this.getdata();
  }

  
  componentDidUpdate(prevProps) {
    
    if (this.props.date !== prevProps.date) {
      this.getdata();
    }
  }

  
  render() {
    const data = this.state.meals;
    var sum = 0;
    data.forEach(function (obj) {
      sum += obj.calorie;
    });

    if (data.length > 0) {
      return (
        <div className='project-list section'>
          <JumboTron currentSum={sum} />
          <div className='card-columns'>
            {data &&
              data.map((meal) => {
                return (
                  <div key={meal._id}>
                    <MealSummary meal={meal} sum={sum} getdata={this.getdata} />
                  </div>
                );
              })}
          </div>
        </div>
      );
    } else {
      return <div>Sorry... No meals added yet...</div>;
    }
  }
}
export default MealList;

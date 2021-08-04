// import required modules
import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import cookie from 'js-cookie';

const PrivateRoute = ({
  component: Component,
  ...rest 
}) => {
  return (

  <Route {...rest} render={props => (
      cookie.get('user_id') 
      ? <Component {...props}/>
      : <Redirect to="/"/>)}/>);
};

export default PrivateRoute;

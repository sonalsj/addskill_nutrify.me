
import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import cookie from 'js-cookie'

const PublicRoute = ({
  component: Component, 
  restricted, 
  ...rest 
}) => {
  return (
 
  <Route {...rest} render={props => (
      cookie.get('user_id') 
      ? <Redirect to="/dashboard"/> 
      : <Component {...props}/>)}/>); 
};

export default PublicRoute;

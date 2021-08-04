import React from "react";
import { Link } from "react-router-dom";
import SignedInlinks from "./SignedInlinks";
import SignedOutlinks from "./SignedOutlinks";
import cookie from "js-cookie";

const Navbar = () => {
  
  const links = cookie.get("user_id") ? <SignedInlinks /> : <SignedOutlinks />;

  const logo =
    window.innerWidth <= 500 && cookie.get("user_id") ? (
      <></>
    ) : (
      <Link to='/' className='navbar-brand'>
        <h2>nutrify.me</h2>
      </Link>
    );
  return (
    <nav className='navbar navbar-expand-sm bg-dark navbar-dark fixed-top'>
      <div className='container'>
        {logo}
        {links}
      </div>
    </nav>
  );
};

export default Navbar;

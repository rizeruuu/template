import React from 'react';
import './Navbar.css';

import { Link, useLocation, useNavigate } from "react-router-dom";

  const Navbar = () =>{
 

  return (
    <header className="header">
      <div className="logo-container">
        <img src="K-LOGO.jpg" alt="Logo" className="logo" />
        <h1 className='h1'>KAN GEI</h1>
      </div>

      <nav className="navbar">
        <a href="#about">About</a>
        <a href='#menu'>Menu</a>
        <a href='#location'>Location</a>
        <a href="#social">Contact</a>
        <Link to="/dashboard">Login</Link>
      </nav>
    </header>
  );
};

export default Navbar;

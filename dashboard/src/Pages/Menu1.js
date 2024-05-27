import React from 'react';
import './Menu1.css';
import Menu from './Menu';
import Menu2 from './Menu2';

function Menu1() {
  return (
    <div className="main-container">
      <div className="image-container">
        <div className="image-wrapper">
          <img src="K-MENU.jpg" alt="Delicious Japanese Food" className="hero-image" />
        </div>
        <div className="image-wrapper">
          <img src="K-MENU2.jpg" alt="Japanese Food" className="image" />
        </div>
      </div>
      <h1 className="centered-text">Kan-Gei's Best</h1>
      <Menu />
      <Menu2 />
    </div>
  );
}

export default Menu1;

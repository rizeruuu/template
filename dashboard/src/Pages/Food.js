import React, { useState } from "react";
import './Food.css'

const Food = (props) => {
  const [expanded, setExpanded] = useState(false);

  const handleClick = () => {
    setExpanded(!expanded);
  };

  // Function to render star icons
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i}>&#9733;</span>); // Full star
    }

    if (hasHalfStar) {
      stars.push(<span key={stars.length}>&#9734;</span>); // Half star
    }

    return stars;
  };

  // Button component
  const Button = (props) => {
    return (
      <div>
        <button className="px-6 py-1 border-2 border-brightColor text-brightColor hover:bg-brightColor hover:text-white transition-all rounded-full">
          {props.title}
        </button>
      </div>
    );
  };

  return (
    <div className={`food-card ${expanded ? 'expanded' : ''}`} onClick={handleClick}>
      <img className="food-image" src={props.img} alt="img" />
      <div className="food-details">
        <h3 className="food-title">{props.title}</h3>
        <div className="food-rating">
          {renderStars(props.rating)}
        </div>
        <div className="food-price">
          <h3 className="price-text">{props.price}</h3>
          <Button title="Buy Now" />
        </div>
      </div>
    </div>
  );
};

export default Food;

import React, { useState } from 'react';
import './Menu.css';

const FoodCard = ({ img, title, price, rating }) => {
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

  return (
    <div className="food-card">
      <div className="food-image-container">
        <img className="food-image" src={img} alt="img" />
      </div>
      <div className="food-details">
        <h3 className="food-title">{title}</h3>
        <div className="food-rating">
          {renderStars(rating)}
        </div>
        <div className="food-price">
          <h3 className="price-text">{price}</h3>
        </div>
      </div>
    </div>
  );
};

const Menu = () => {
  const [fullSizeImage, setFullSizeImage] = useState(null);

  const handleImageClose = () => {
    setFullSizeImage(null);
  };

     const foods = [
        { img: "tonkotsu ramen.jpg", title: "Tonkosu Ramen", price: "₱250.00", rating: 4.7 },
        { img: "tonkatsudon.jpg", title: "Tonkatsu Don", price: "₱150.00", rating: 4.5 },
        { img: "somenwithkaraage.jpg", title: "Somen with Karaage", price: "₱250.00", rating: 5 },
        { img: "takoyaki.jpg", title: "Takoyaki", price: "₱150.00", rating: 4.2 },
        { img: "nori shio fries.jpg", title: "Nori Shio Fries", price: "₱95.00", rating: 4.1 },
        { img: "onigiri.jpg", title: "Onigiri", price: "₱120.00", rating: 3.9 },
     ];

  return (
    <div className="min-h-screen flex flex-col justify-center items-center lg:px-32 px-5">
      {fullSizeImage && (
        <div className="overlay" onClick={handleImageClose}>
          <img className="full-size-image" src={fullSizeImage} alt="Full Size" />
        </div>
      )}

      <div className="flex flex-wrap gap-8 justify-center">
        {foods.map((food) => (
          <FoodCard key={food.title} {...food} />
        ))}
      </div>
    </div>
  );
};

export default Menu;

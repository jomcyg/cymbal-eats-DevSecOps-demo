// src/components/HomePage.js
import {React, useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function HomePage({customer, filteredRestaurants}) {
 
  let welcomeMessage = "welcome to ashick food delivery";

  if (customer instanceof Map && customer.has("name")) {
    welcomeMessage = `Welcome, ${customer.get("name")}! Hope you are having a delightful day`;
  } else if (typeof customer === 'object' && customer !== null && customer.hasOwnProperty('name')) {
    welcomeMessage = `Welcome, ${customer.name}!`;
  }

  return (
    <div className="home-page">
    <h1>{welcomeMessage}</h1>
    <p>Explore our delicious options from various restaurants.</p>

    <h2>Featured Restaurants</h2>
    <div className="restaurant-cards-container">
      {filteredRestaurants.slice(0, 3).map(restaurant => (
        <div key={restaurant.id} className="restaurant-card">
          <img src={restaurant.image} alt={restaurant.name} />
          <h3>
            <Link to={`/restaurants/${restaurant.id}`}>{restaurant.name}</Link>
          </h3>
          <p>Cuisine: {restaurant.cuisine}</p>
        </div>
      ))}
    </div>

    <Link to="/restaurants" className='link-to-restaurants-button'>Browse All Restaurants</Link>
  </div>
  );
}



HomePage.propTypes = {
  customer: PropTypes.oneOfType([
    PropTypes.instanceOf(Map),
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      uuid: PropTypes.string.isRequired,
      photoURL: PropTypes.string.isRequired,
    }),
  ]).isRequired,
  filteredRestaurants: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      cuisine: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default HomePage;
import React from 'react';
import "./Card.css"
import { Link } from 'react-router-dom';
function Card({ image, title, description }) {
  return (
<Link to={`/services?category=${title}`}> 
    <div className="card">
      <img src={image} className="card-img-top-lane" alt={title}  />
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{description}</p>
      </div>
    </div>
    </Link>
  );
}

export default Card;

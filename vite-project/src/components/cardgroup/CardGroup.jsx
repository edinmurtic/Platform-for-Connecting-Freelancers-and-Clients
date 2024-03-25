import React, { useState } from 'react';
import {cards} from '../../data.js'; // Pretpostavljamo da postoji datoteka data.js s podacima
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Pretpostavljamo da koristite Font Awesome ikonice
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'; // Pretpostavljamo da koristite Font Awesome ikonice

import Card from '../card/Card';
import "./CardGroup.css"
function CardGroup() {
    const [startIndex, setStartIndex] = useState(0);
  
    const onNextClick = () => {
      setStartIndex(prevIndex => prevIndex + 1);
    };
  
    const onPrevClick = () => {
      setStartIndex(prevIndex => Math.max(0, prevIndex - 1));
    };
  
    return (
      <div className="card-container">
        <div className="card-group">
          {cards.slice(startIndex, startIndex + 4).map(card => (
            <Card key={card.id} image={card.img} title={card.title} description={card.desc} />
          ))}
        </div>
        <div className="navigation-buttons">
        <button className="prev-button" onClick={onPrevClick} disabled={startIndex === 0}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        <button className="next-button" onClick={onNextClick} disabled={startIndex + 4 >= cards.length}>
          <FontAwesomeIcon icon={faArrowRight} />
        </button>
        </div>
      </div>
    );
  }

export default CardGroup;

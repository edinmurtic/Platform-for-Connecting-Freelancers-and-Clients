import React, { useState } from 'react';
import './CarouselComp.css';

function CarouselComp({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className="carousel-container">
      <img src={images[currentIndex]} alt="Carousel Slide" className="carousel-image" />
      <button onClick={goToPrevSlide} className="carousel-button left">{"<"}</button>
      <button onClick={goToNextSlide} className="carousel-button right">{">"}</button>
    </div>
  );
}

export default CarouselComp;
import React from 'react'
import Carousel from 'react-bootstrap/Carousel';
const homeTitle = () => {
  return (

    <Carousel>
      <Carousel.Item >
      <img
          className="img-fluid"
          src="./img/backgroundCV.png"
          alt="Treća slika"
        />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item >
      <img
          className="img-fluid"
          src="https://helios-i.mashable.com/imagery/articles/031kyEgFeLg3FZJMfudxGHK/hero-image.fill.size_1248x702.v1623386899.jpg"
          alt="Treća slika"
        />
        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item >
      <img
          className="img-fluid"
          src="./img/backgroundCV.png"
          alt="Treća slika"
        />
        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>  
    )
}

export default homeTitle
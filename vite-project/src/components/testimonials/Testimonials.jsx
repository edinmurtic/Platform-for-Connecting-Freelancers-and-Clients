import React from 'react'
import "./Testimonials.css"
const Testimonials = () => {
  return (
<div className="container testimonials">
      <div className="testimonial-text">
      <h2>
        <span>Vjeruje nam </span>više od 5.000+ klijenata       </h2>
      </div>
      <div className="testimonial-logos">
        <div className="logo-row">
        <img src="https://www.mojposao.ba/servlet/imageRead?imageUrl=/home/company/1/logo/186x132.jpg&=1707523200542" alt="Company 1" />
          <img src="https://static.klix.ba/jobs/posao-og.png" alt="Company 2" />
          <img src="https://i.ibb.co/GP3c2Nm/olxPosao.png" alt="Company 3"/>
        </div>
        <div className="logo-row">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Instagram_logo_2022.svg/600px-Instagram_logo_2022.svg.png" alt="Company 4" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Yahoo%21_%282013-2019%29.svg/1920px-Yahoo%21_%282013-2019%29.svg.png" alt="Company 6" />
        </div>
      </div>
    </div>  )
}

export default Testimonials

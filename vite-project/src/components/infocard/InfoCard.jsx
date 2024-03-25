import React from 'react'
import './InfoCard.css'

const InfoCard = ({ title, subtitle, text }) => {
  return (
    <div className="info-card-container">
    <div className="info-card">
      <h2 className="info-title">{title}</h2>
      <h3 className="info-subtitle">{subtitle}</h3>
      <p className="info-text">{text}</p>
    </div>
  </div>
    )
}

export default InfoCard
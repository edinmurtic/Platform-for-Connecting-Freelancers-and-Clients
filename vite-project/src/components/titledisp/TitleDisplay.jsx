import React from 'react'
import {infocards} from '../../data.js'; // Pretpostavljamo da postoji datoteka data.js s podacima
import InfoCard from '../infocard/InfoCard.jsx';
import "./TitleDisplay.css"
import SearchBar from '../searchComponent/SearchComponent.jsx';
const TitleDisplay = () => {
  return (
    <div className='container'>
    <div className='row'>
        <div className='col-12 col-md-6 leftSideTD'><p className='highparagraph'>Želite unaprijediti Vaš biznis uz pomoć saradnika koje jednostavno možete zaposliti na našoj stranici</p>
        <p>Jednostavan način pronalaska potencijalnih partera u svim podrucjima!</p>
         <SearchBar /></div>
        <div className='col-12 col-md-6 rightSideTD'>
            <div className='col-12 '><img src='https://21140470.fs1.hubspotusercontent-na1.net/hub/21140470/hubfs/Img-hero-home-2.png?width=2640&height=2360&name=Img-hero-home-2.png' height="100%" width="100%"  /></div>

        </div>

    </div>
    <div className="info-card-container">
      {infocards.map((infocard) => (
        <InfoCard
          key={infocard.id}
          title={infocard.title}
          subtitle={infocard.subtitle}
          text={infocard.text}
        />
      ))}
    </div>
    
    </div>  )
}

export default TitleDisplay
import React from 'react'
import {infocards} from '../../data.js'; 
import InfoCard from '../infocard/InfoCard.jsx';
import "./TitleDisplay.css"
import SearchComp from '../searchComp/searchComp.jsx';
const TitleDisplay = () => {
  return (
    <div className='container'>
    <div className='row'>
        <div className='col-12 col-md-6 leftSideTD'><p className='highparagraph'>Unaprijedite vaš biznis uz pomoć stručnjaka koje jednostavno
         možete zaposliti na našoj stranici.</p>
               <p className='lowparagraph'>
               Pronađite stručnjaka iz različitih područja ili postavite svoje usluge kako biste privukli nove klijente. 
              <br /> Bez obzira jeste li u potrazi za timom stručnjaka ili želite ponuditi svoje vještine, ovdje ste na pravom mjestu.</p>
        <p className='lowparagraph'>Registrirajte se danas i započnite graditi uspješnu suradnju!</p>

      


</div>
        <div className='col-12 col-md-6 rightSideTD'>
            <div className='col-12 '><img src='https://i.ibb.co/DVwhXTQ/a5e1181e-1198-4d85-ad6d-0b4c7983c677.jpg' height="100%" width="100%"  /></div>

        </div>

    </div>
    {/* <div>
    <p className='highparagraph'> Prednosti korištenja platforme </p>
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
    </div> */}
    </div>  )
}

export default TitleDisplay
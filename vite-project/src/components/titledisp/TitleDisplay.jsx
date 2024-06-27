import React from 'react'
import {infocards} from '../../data.js'; 
import InfoCard from '../infocard/InfoCard.jsx';
import "./TitleDisplay.css"
import SearchComp from '../searchComp/searchComp.jsx';
const TitleDisplay = () => {
  return (
    <div className='container'>
    <div className='row'>
        <div className='col-12 col-md-6 leftSideTD'><p className='highparagraph'>Otkrijte i zaposlite vrhunske IT stručnjake za unaprijeđenje vašeg biznisa na našoj platformi!</p>
               <p className='lowparagraph'>
               Povežite se sa stručnjacima iz raznih IT oblasti ili ponudite svoje vještine kako biste privukli nove klijente. 
              <br /> Bilo da tražite tim profesionalaca ili želite promovirati svoje usluge, naš portal je pravo mjesto za vas.</p>
        <p className='lowparagraph'>Registrirajte se danas i započnite izgradnju uspješne saradnje!</p>

      


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
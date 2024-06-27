import React, { useState } from 'react';
import {subCategoryCard} from '../../data.js'; // Pretpostavljamo da postoji datoteka data.js s podacima

import "./CardGroup.css"
import CardSubCategory from '../cardSubCategory/CardSubCategory.jsx';
function CardGroup() {
  return (<div className='container cardGroup'>
    <div >
    <h2 className="highparagraph">  Pronađite savršenu uslugu za svoj projekt</h2>
</div>
    <div className='lowparagraph'>Otkrijte širok spektar usluga koje nudimo putem naše aplikacije. Bez obzira tražite li web dizajnera, marketing stručnjaka ili programera, naša galerija slika omogućava vam brz i jednostavan pregled kvalificiranih stručnjaka i njihovih ponuda. Uživajte u jednostavnoj navigaciji i preglednom prikazu koji vam pomažu pronaći savršenog partnera za vaš projekt.</div>
    <div className="row" style={{ display: 'flex', justifyContent: 'space-between' }}>
{        subCategoryCard.map(card => (
  <div className='col-md-3 mb-5 ' >  
  <CardSubCategory key={card.id} category={card.category} subCategory={card.subCategory} img={card.img} />
</div>
))
}       


</div></div>
  );
  }

export default CardGroup;

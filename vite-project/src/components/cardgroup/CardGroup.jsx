import React, { useState } from 'react';
import {subCategoryCard} from '../../data.js'; // Pretpostavljamo da postoji datoteka data.js s podacima

import "./CardGroup.css"
import CardSubCategory from '../cardSubCategory/CardSubCategory.jsx';
function CardGroup() {
  return (<div className='container cardGroup'>
    <div >
    <h2 className="highparagraph">  Pronađite savršenu uslugu za svoj projekt</h2>
</div>
    <div className='lowparagraph'>Naša platforma vam omogućava da brzo i jednostavno pronađete idealnog freelancera za svoj projekt. Bez obzira jeste li u potrazi za web dizajnerom, marketing stručnjakom ili programerom, ovdje možete pregledati širok spektar kvalificiranih stručnjaka i njihovih usluga. S našom jednostavnom navigacijom i preglednim prikazom, pronalaženje savršenog partnera za vaš projekt nikada nije bilo lakše.</div>
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

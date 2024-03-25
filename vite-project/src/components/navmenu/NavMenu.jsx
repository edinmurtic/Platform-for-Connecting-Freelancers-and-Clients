import React, { useState } from 'react';
import "./NavMenu.css"
function NavMenu() {
    return (
        <div className='container'>
        <div className="navigation-container">
          <nav className="navigation">
            {/* Prvi dropdown meni */}
            <div className="dropdown">
              <button className="dropbtn">Kreativne usluge</button>
              <div className="dropdown-content">
                <a href="#">Grafički dizajn</a>
                <a href="#">Fotografija</a>
                <a href="#">Ilustracija</a>
                <a href="#">Pisanje i uređivanje</a>
              </div>
            </div>
    
            {/* Drugi dropdown meni */}
            <div className="dropdown">
              <button className="dropbtn">Digitalni marketing i komunikacija</button>
              <div className="dropdown-content">
                <a href="#">Društveni mediji</a>
                <a href="#">Podrška korisnicima</a>
                <a href="#">Istraživanja tržišta</a>
                <a href="#">SEO i SEM usluge</a>
              </div>
            </div>
    
            {/* Treći dropdown meni */}
            <div className="dropdown">
              <button className="dropbtn">Dropdown 3</button>
              <div className="dropdown-content">
                <a href="#">Razvoj web stranica i web aplikacija</a>
                <a href="#">Razvoj mobilnih aplikacija</a>
                <a href="#">Izrada i optimizacija baza podataka:</a>
                <a href="#">Testiranje softvera</a>
                <a href="#">Stavka 5</a>
              </div>
            </div>
    
            {/* Četvrti dropdown meni */}
            <div className="dropdown">
              <button className="dropbtn">Dropdown 4</button>
              <div className="dropdown-content">
                <a href="#">Razvoj online tečajeva i edukativnih materijala</a>
                <a href="#">Stavka 2</a>
                <a href="#">Stavka 3</a>
                <a href="#">Stavka 4</a>
                <a href="#">Stavka 5</a>
              </div>
            </div>
          </nav>
        </div></div>
      );
    }


export default NavMenu;

import React, { useState } from 'react';
import "./NavMenu.css"
function NavMenu() {
    return (
        <div className='container'>
        <div className="navigation-container">
          <nav className="navigation">
            {/* Prvi dropdown meni */}
            <div className="dropdown">
              <button className="dropbtn">Grafika i dizajn</button>
              <div className="dropdown-content">
                <a href="#">Logo i brend dizajn</a>
                <a href="#">Dizajn marketinškog materijala</a>
                <a href="#">3D dizajn</a>
                {/* <a href="#">Pisanje i uređivanje</a> */}
              </div>
            </div>
    
            {/* Drugi dropdown meni */}
            <div className="dropdown">
              <button className="dropbtn">Razvoj aplikacija</button>
              <div className="dropdown-content">
                <a href="#">Razvoj internet aplikacija</a>
                <a href="#">Razvoj desktop aplikacija</a>
                <a href="#">Razvoj mobilnih aplikacija</a>
              </div>
            </div>
    
            {/* Treći dropdown meni */}
            <div className="dropdown">
              <button className="dropbtn">IT konsalting</button>
              <div className="dropdown-content">
                <a href="#">Poslovna analitika i inteligencija</a>
                <a href="#">Cyber sigurnost i zaštita podataka</a>
                <a href="#">Infrastruktura i mreže</a>
              </div>
            </div>
            <div className="dropdown">
              <button className="dropbtn">Razvoj video igara </button>
              <div className="dropdown-content">
                <a href="#">PC video igre</a>
                <a href="#">Mobilne video igre</a>
                <a href="#">VR igre</a>
                {/* <a href="#">Stavka 4</a> */}
              </div>
            </div>
            <div className="dropdown">
              <button className="dropbtn">Video i animacija</button>
              <div className="dropdown-content">
                <a href="#">Uređivanje i postprodukcija videa</a>
                <a href="#">Kreiranje marketinških videa</a>
                <a href="#">Animacija</a>
                {/* <a href="#">Stavka 4</a> */}
              </div>
            </div>
          </nav>
        </div></div>
      );
    }


export default NavMenu;

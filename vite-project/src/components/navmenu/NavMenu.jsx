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
              <button className="dropbtn">Softver inžinjering</button>
              <div className="dropdown-content">
                <a href="#">Razvoj internet aplikacija</a>
                <a href="#">Razvoj desktop aplikacija</a>
                <a href="#">Razvoj video igara</a>
                <a href="#">Razvoj mobilnih aplikacija</a>
              </div>
            </div>
    
            {/* Treći dropdown meni */}
            <div className="dropdown">
              <button className="dropbtn">Konsalting</button>
              <div className="dropdown-content">
                <a href="#">Poslovno savjetovanje</a>
                <a href="#">Marketing strategije</a>
                <a href="#">Tehnicke konsultacije</a>
                {/* <a href="#">Testiranje softvera</a> */}
              </div>
            </div>
    
            {/* Četvrti dropdown meni */}
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

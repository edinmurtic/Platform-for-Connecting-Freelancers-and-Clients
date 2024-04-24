import React from 'react';
import './Footer.css'; // Uvoz CSS datoteke za stilove

const Footer = () => {
  return (
    <footer>
      <div className="footer-container">
        {/* heading */}
        {/* <div className="footer-heading">
          <h4>
          Vrijeme je da prestanete sa skrolovanjem.
            <br />
            Hajde da stvorimo nešto.
          </h4>
          <h3>Javite se.</h3>
        </div> */}
        {/* footer-content */}
        <div className="footer-content">
          {/* box */}
          <div className="footer-box">
            <strong>Istraži</strong>
            <ul>
              <li><a href="#">Naslovna</a></li>
              <li><a href="#">O nama</a></li>
              <li><a href="#">Projekti</a></li>
              <li><a href="#">Kontakt</a></li>
            </ul>
          </div>
          {/* box */}
          <div className="footer-box">
            <strong>Društvene mreže</strong>
            <ul>
              <li><a href="#">Instagram</a></li>
              <li><a href="#">Youtube</a></li>
              <li><a href="#">Facebook</a></li>
            </ul>
          </div>
          {/* box */}
          <div className="footer-box">
            <strong>Kontakt</strong>
            <ul>
              <li><a href="#">murtie@hotmail.com</a></li>
              <li><a href="#">++3876121213</a></li>
            </ul>
          </div>
          {/* box */}
          <div className="footer-box">
            <strong>FindJob.ba</strong>
            <ul>
              <li>Stari grad 24</li>
              <li>77230 V.Kladuša</li>
              <li>Bosna i Hercegovina</li>
            </ul>
          </div>
        </div>
        {/* footer-bottom */}
        <div className="footer-bottom">
          {/* footer-bottom-link */}
          <div className="footer-bottom-link">
            <a href="#">Privatnost</a>
            <a href="#">Informaicije o stranici</a>
            <a href="#">Uslovi</a>
          </div>
          {/* copyright */}
          <div className="copyright">
            <span>Made by murticedin</span>
            <span>&#169; 2024 murticedin</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

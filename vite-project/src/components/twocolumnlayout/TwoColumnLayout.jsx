import React from 'react';
import './TwoColumnLayout.css'; // Uvezite CSS datoteku za stilizaciju

function TwoColumnLayout() {
  return (
    <div className="two-column-layout-container">
      <div className="two-column-layout">
        <div className="left-column">
          <h2>Poslovni Paket</h2>
          <p>
          Ovako dobre kompanije pronalaze dobro društvo. Pristupite 1% najboljih talenata na nasoj aplikaciji i punom paketu hibridnih alata za upravljanje radnom snagom. Ovako sada funkcioniraju inovacije.
          </p>
          <ul>
            <li><strong>Pristupite stručnim talentima da popunite praznine u svojim vještinama</strong></li>
            <li><strong>Kontrolišite svoj radni tok: unajmite, klasifikujte i platite svoj talenat</strong></li>
            <li><strong>Partner sa MojPosao.ba  </strong></li>
          </ul>
        </div>
        <div className="right-column">
          <img src="https://imageio.forbes.com/specials-images/imageserve/5f5fc1c05644e915a67acc41/Above-view-of-disabled-freelancer-using-cell-phone-while-working-on-laptop-at-home-/960x0.jpg?format=jpg&width=1440" alt="Slika" />
        </div>
      </div>
    </div>
  );
}

export default TwoColumnLayout;

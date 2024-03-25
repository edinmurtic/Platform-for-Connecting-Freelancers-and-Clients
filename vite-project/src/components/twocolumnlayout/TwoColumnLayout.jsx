import React from 'react';
import './TwoColumnLayout.css'; // Uvezite CSS datoteku za stilizaciju

function TwoColumnLayout() {
  return (
    <div className="two-column-layout-container">
      <div className="two-column-layout">
        <div className="left-column">
          <h2>Enterprise Suite</h2>
          <p>
            This is how good companies find good company. Access the top 1% of talent on Upwork, and a full suite of hybrid
            workforce management tools. This is how innovation works now.
          </p>
          <ul>
            <li><strong>Access expert talent to fill your skill gaps</strong></li>
            <li><strong>Control your workflow: hire, classify and pay your talent</strong></li>
            <li><strong>Partner with Upwork for end-to-end support</strong></li>
          </ul>
        </div>
        <div className="right-column">
          <img src="https://res.cloudinary.com/upwork-cloud-acquisition-prod/image/upload/f_auto,q_auto/brontes/for-enterprise/enterprise-2023.jpg" alt="Slika" />
        </div>
      </div>
    </div>
  );
}

export default TwoColumnLayout;

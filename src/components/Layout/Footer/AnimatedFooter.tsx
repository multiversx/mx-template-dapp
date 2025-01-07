import React from 'react';
import './AnimatedFooter.css';

export const AnimatedFooter = () => {
  return (
    <div className="footer-content">
      <span>Made with</span>
      <div className="lion-container">
        <div className="lion">🦁</div>
      </div>
      <span>by</span>
      <span className="company-name">KMCPG</span>
    </div>
  );
};

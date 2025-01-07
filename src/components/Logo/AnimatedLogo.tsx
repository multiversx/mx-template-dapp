import React from 'react';
import './AnimatedLogo.css';

export const AnimatedLogo = () => {
  return (
    <div className="logo-container">
      <div className="logo-text">
        <span className="letter" style={{ '--delay': '0s' } as React.CSSProperties}>T</span>
        <span className="letter" style={{ '--delay': '0.1s' } as React.CSSProperties}>i</span>
        <span className="letter" style={{ '--delay': '0.2s' } as React.CSSProperties}>k</span>
        <span className="letter" style={{ '--delay': '0.3s' } as React.CSSProperties}>a</span>
        <span className="letter" style={{ '--delay': '0.4s' } as React.CSSProperties}>w</span>
      </div>
      <div className="logo-glow"></div>
    </div>
  );
};

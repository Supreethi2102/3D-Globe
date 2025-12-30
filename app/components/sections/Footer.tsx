import React from 'react';
import './Footer.css';

export const Footer: React.FC = () => {
  return (
    <aside className="footer" aria-label="Globe interaction instructions">
      <div className="footer__row">
        <div className="footer__gestures" aria-hidden="true">
          <img src="/icons/HandSwipeLeft.svg" alt="" className="footer__gesture-icon" />
          <img src="/icons/HandGrabbing.svg" alt="" className="footer__gesture-icon" />
          <img src="/icons/HandSwipeRight.svg" alt="" className="footer__gesture-icon" />
        </div>
        
        <button 
          type="button"
          className="footer__link"
          aria-label="Reduce motion for accessibility"
        >
          Reduce motion
        </button>
      </div>
      
      <p className="footer__text">
        Click and drag the globe to trace my inspiration, or scroll to see inspired work.
      </p>
    </aside>
  );
};

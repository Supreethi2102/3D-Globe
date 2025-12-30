import React from 'react';
import './Footer.css';

export const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer__row">
        <div className="footer__gestures">
<img src="/icons/HandSwipeLeft.svg" alt="" className="footer__gesture-icon" />
<img src="/icons/HandGrabbing.svg" alt="" className="footer__gesture-icon" />
<img src="/icons/HandSwipeRight.svg" alt="" className="footer__gesture-icon" />
        </div>
        
        <a href="#reduce-motion" className="footer__link">
          Reduce motion
        </a>
      </div>
      
      <p className="footer__text">
        Click and drag the globe to trace my inspiration, or scroll to see inspired work.
      </p>
    </footer>
  );
};

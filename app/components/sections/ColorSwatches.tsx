import React, { useState } from 'react';
import { 
  CaretUp,
  Leaf,
  Cookie,
  PersonSimpleCircle,
  LinkedinLogo
} from '@phosphor-icons/react';
import { GravityPlayground } from './GravityPlayground';
import './ColorSwatches.css';

export const ColorSwatches: React.FC = () => {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [isBackToTopHovered, setIsBackToTopHovered] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="color-swatches">
      {/* Header - Instructions */}
      <div className="color-swatches__header">
        <div className="color-swatches__icons">
<img src="/icons/HandSwipeLeft.svg" alt="" className="color-swatches__icon" />
<img src="/icons/HandGrabbing.svg" alt="" className="color-swatches__icon" />
<img src="/icons/HandSwipeRight.svg" alt="" className="color-swatches__icon" />
        </div>
        <p className="color-swatches__text">
          Tap, click, or drag the colour swatches to discover my travel colour moods.
        </p>
      </div>

      {/* Physics Animation Canvas with Back to Top */}
      <div className="color-swatches__canvas-wrapper">
        <GravityPlayground />

        {/* Back to Top */}
        <div className="color-swatches__back-to-top">
          <button 
            className={`back-to-top__btn ${isBackToTopHovered ? 'back-to-top__btn--hovered' : ''}`}
            onClick={scrollToTop}
            onMouseEnter={() => setIsBackToTopHovered(true)}
            onMouseLeave={() => setIsBackToTopHovered(false)}
          >
            <CaretUp size={24} weight={isBackToTopHovered ? 'bold' : 'regular'} color={isBackToTopHovered ? '#ffffff' : '#7150E5'} />
          </button>
          <span className="back-to-top__text">Back to top</span>
        </div>
      </div>

      {/* Footer */}
      <footer className="site-footer">
        <div className="site-footer__inner">
          <div className="site-footer__left">
            <img src="/icons/Brand logo.svg" alt="SJS" className="site-footer__logo" />
            <span className="site-footer__copyright">© 2026 Samantha jane Smith, All rights reserved.</span>
          </div>
          <div className="site-footer__right">
            <a 
              href="#sustainability" 
              className={`site-footer__link ${hoveredLink === 'sustainability' ? 'site-footer__link--hovered' : ''}`}
              onMouseEnter={() => setHoveredLink('sustainability')}
              onMouseLeave={() => setHoveredLink(null)}
            >
              <Leaf size={24} weight={hoveredLink === 'sustainability' ? 'fill' : 'regular'} color={hoveredLink === 'sustainability' ? '#7150E5' : '#3C3F43'} />
              <span>Sustainability</span>
            </a>
            <a 
              href="#privacy" 
              className={`site-footer__link ${hoveredLink === 'privacy' ? 'site-footer__link--hovered' : ''}`}
              onMouseEnter={() => setHoveredLink('privacy')}
              onMouseLeave={() => setHoveredLink(null)}
            >
              <Cookie size={24} weight={hoveredLink === 'privacy' ? 'fill' : 'regular'} color={hoveredLink === 'privacy' ? '#7150E5' : '#3C3F43'} />
              <span>Privacy and cookies</span>
            </a>
            <a 
              href="#accessibility" 
              className={`site-footer__link ${hoveredLink === 'accessibility' ? 'site-footer__link--hovered' : ''}`}
              onMouseEnter={() => setHoveredLink('accessibility')}
              onMouseLeave={() => setHoveredLink(null)}
            >
              <PersonSimpleCircle size={24} weight={hoveredLink === 'accessibility' ? 'fill' : 'regular'} color={hoveredLink === 'accessibility' ? '#7150E5' : '#3C3F43'} />
              <span>Accessibility</span>
            </a>
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className={`site-footer__link ${hoveredLink === 'linkedin' ? 'site-footer__link--hovered' : ''}`}
              onMouseEnter={() => setHoveredLink('linkedin')}
              onMouseLeave={() => setHoveredLink(null)}
            >
              <LinkedinLogo size={24} weight={hoveredLink === 'linkedin' ? 'fill' : 'regular'} color={hoveredLink === 'linkedin' ? '#7150E5' : '#3C3F43'} />
              <span>Linkedin</span>
            </a>
          </div>
        </div>
      </footer>
    </section>
  );
};

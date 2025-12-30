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
    // Focus on the skip link or first focusable element
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
      mainContent.focus();
    }
  };

  return (
    <section className="color-swatches" aria-label="Interactive color swatches">
      {/* Header - Instructions */}
      <header className="color-swatches__header">
        <div className="color-swatches__icons" aria-hidden="true">
          <img src="/icons/HandSwipeLeft.svg" alt="" className="color-swatches__icon" />
          <img src="/icons/HandGrabbing.svg" alt="" className="color-swatches__icon" />
          <img src="/icons/HandSwipeRight.svg" alt="" className="color-swatches__icon" />
        </div>
        <p className="color-swatches__text">
          Tap, click, or drag the colour swatches to discover my travel colour moods.
        </p>
      </header>

      {/* Physics Animation Canvas with Back to Top */}
      <div 
        className="color-swatches__canvas-wrapper"
        role="region"
        aria-label="Interactive color playground - drag swatches to explore"
      >
        <GravityPlayground />

        {/* Back to Top */}
        <nav className="color-swatches__back-to-top" aria-label="Page navigation">
          <button 
            type="button"
            className={`back-to-top__btn ${isBackToTopHovered ? 'back-to-top__btn--hovered' : ''}`}
            onClick={scrollToTop}
            onMouseEnter={() => setIsBackToTopHovered(true)}
            onMouseLeave={() => setIsBackToTopHovered(false)}
            aria-label="Back to top of page"
          >
            <CaretUp size={24} weight={isBackToTopHovered ? 'bold' : 'regular'} color={isBackToTopHovered ? '#ffffff' : '#7150E5'} aria-hidden="true" />
          </button>
          <span className="back-to-top__text" aria-hidden="true">Back to top</span>
        </nav>
      </div>

      {/* Footer */}
      <footer className="site-footer" role="contentinfo">
        <div className="site-footer__inner">
          <div className="site-footer__left">
            <img src="/icons/Brand logo.svg" alt="Samantha Jane Smith logo" className="site-footer__logo" />
            <small className="site-footer__copyright">© 2026 Samantha Jane Smith, All rights reserved.</small>
          </div>
          <nav className="site-footer__right" aria-label="Footer navigation">
            <a 
              href="#sustainability" 
              className={`site-footer__link ${hoveredLink === 'sustainability' ? 'site-footer__link--hovered' : ''}`}
              onMouseEnter={() => setHoveredLink('sustainability')}
              onMouseLeave={() => setHoveredLink(null)}
            >
              <Leaf size={24} weight={hoveredLink === 'sustainability' ? 'fill' : 'regular'} color={hoveredLink === 'sustainability' ? '#7150E5' : '#3C3F43'} aria-hidden="true" />
              <span>Sustainability</span>
            </a>
            <a 
              href="#privacy" 
              className={`site-footer__link ${hoveredLink === 'privacy' ? 'site-footer__link--hovered' : ''}`}
              onMouseEnter={() => setHoveredLink('privacy')}
              onMouseLeave={() => setHoveredLink(null)}
            >
              <Cookie size={24} weight={hoveredLink === 'privacy' ? 'fill' : 'regular'} color={hoveredLink === 'privacy' ? '#7150E5' : '#3C3F43'} aria-hidden="true" />
              <span>Privacy and cookies</span>
            </a>
            <a 
              href="#accessibility" 
              className={`site-footer__link ${hoveredLink === 'accessibility' ? 'site-footer__link--hovered' : ''}`}
              onMouseEnter={() => setHoveredLink('accessibility')}
              onMouseLeave={() => setHoveredLink(null)}
            >
              <PersonSimpleCircle size={24} weight={hoveredLink === 'accessibility' ? 'fill' : 'regular'} color={hoveredLink === 'accessibility' ? '#7150E5' : '#3C3F43'} aria-hidden="true" />
              <span>Accessibility</span>
            </a>
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className={`site-footer__link ${hoveredLink === 'linkedin' ? 'site-footer__link--hovered' : ''}`}
              onMouseEnter={() => setHoveredLink('linkedin')}
              onMouseLeave={() => setHoveredLink(null)}
              aria-label="LinkedIn profile (opens in new tab)"
            >
              <LinkedinLogo size={24} weight={hoveredLink === 'linkedin' ? 'fill' : 'regular'} color={hoveredLink === 'linkedin' ? '#7150E5' : '#3C3F43'} aria-hidden="true" />
              <span>Linkedin</span>
            </a>
          </nav>
        </div>
      </footer>
    </section>
  );
};

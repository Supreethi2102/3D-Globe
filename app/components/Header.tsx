import React, { useState, useEffect, useCallback } from 'react';
import { Palette, User, ChatCircleDots, Sun, Phone } from '@phosphor-icons/react';
import './Header.css';

export const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isMobileMenuOpen]);

  // Smooth scroll to section using native browser behavior with scroll-padding
  const scrollToSection = useCallback((e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    
    // Update URL hash - this triggers native smooth scroll with scroll-padding-top
    window.location.hash = sectionId;
    
    // Set focus for screen readers after a brief delay
    setTimeout(() => {
      const element = document.querySelector(sectionId);
      if (element) {
        (element as HTMLElement).focus();
      }
    }, 100);
  }, []);

  // Handle keyboard navigation in mobile menu
  const handleMobileMenuKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Tab' && isMobileMenuOpen) {
      // Trap focus within mobile menu when open
      const menu = e.currentTarget;
      const focusableElements = menu.querySelectorAll<HTMLElement>(
        'a, button:not([disabled])'
      );
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    }
  }, [isMobileMenuOpen]);

  return (
    <header 
      className={`header ${isScrolled ? 'header--scrolled' : ''}`}
      role="banner"
    >
      {/* Logo */}
      <a 
        href="/" 
        className="header__logo"
        aria-label="Samantha Jane Smith - Home"
      >
        <img 
          src="/about/SJS Illustrator logo.svg" 
          alt="SJS" 
          className="header__logo-short"
        />
        <span className="header__logo-expand">
          <img 
            src="/about/my name brand.svg" 
            alt="Samantha Jane Smith" 
            className="header__logo-full"
          />
        </span>
      </a>
      
      {/* Desktop Navigation */}
      <nav className="header__nav" aria-label="Main navigation">
        <a 
          href="#work" 
          className="header__nav-link"
          onClick={(e) => scrollToSection(e, '#work')}
          onMouseEnter={() => setHoveredLink('work')}
          onMouseLeave={() => setHoveredLink(null)}
        >
          <Palette size={24} weight={hoveredLink === 'work' ? 'fill' : 'regular'} className="header__nav-icon" aria-hidden="true" />
          <span>Work</span>
        </a>
        <a 
          href="#about" 
          className="header__nav-link"
          onClick={(e) => scrollToSection(e, '#about')}
          onMouseEnter={() => setHoveredLink('about')}
          onMouseLeave={() => setHoveredLink(null)}
        >
          <User size={24} weight={hoveredLink === 'about' ? 'fill' : 'regular'} className="header__nav-icon" aria-hidden="true" />
          <span>About</span>
        </a>
        <a 
          href="#testimonials" 
          className="header__nav-link"
          onClick={(e) => scrollToSection(e, '#testimonials')}
          onMouseEnter={() => setHoveredLink('testimonials')}
          onMouseLeave={() => setHoveredLink(null)}
        >
          <ChatCircleDots size={24} weight={hoveredLink === 'testimonials' ? 'fill' : 'regular'} className="header__nav-icon" aria-hidden="true" />
          <span>Testimonials</span>
        </a>
        <button 
          type="button"
          className="header__nav-link header__theme-toggle"
          onMouseEnter={() => setHoveredLink('theme')}
          onMouseLeave={() => setHoveredLink(null)}
          aria-label="Toggle light mode"
        >
          <Sun size={24} weight={hoveredLink === 'theme' ? 'fill' : 'regular'} className="header__nav-icon" aria-hidden="true" />
          <span>Light</span>
        </button>
      </nav>

      {/* Contact Button */}
      <a 
        href="#contact"
        className="header__contact-btn"
        onClick={(e) => scrollToSection(e, '#contact')}
        onMouseEnter={() => setHoveredLink('contact')}
        onMouseLeave={() => setHoveredLink(null)}
      >
        <Phone size={24} weight={hoveredLink === 'contact' ? 'fill' : 'regular'} className="header__contact-icon" aria-hidden="true" />
        <span>Contact</span>
      </a>

      {/* Mobile Menu Button */}
      <button 
        type="button"
        className="header__mobile-toggle"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isMobileMenuOpen}
        aria-controls="mobile-navigation"
      >
        <span className={`header__hamburger ${isMobileMenuOpen ? 'header__hamburger--open' : ''}`} aria-hidden="true"></span>
      </button>

      {/* Mobile Navigation */}
      <nav 
        id="mobile-navigation"
        className={`header__mobile-nav ${isMobileMenuOpen ? 'header__mobile-nav--open' : ''}`}
        aria-label="Mobile navigation"
        aria-hidden={!isMobileMenuOpen}
        onKeyDown={handleMobileMenuKeyDown}
      >
        <a href="#work" className="header__mobile-link" onClick={(e) => scrollToSection(e, '#work')} tabIndex={isMobileMenuOpen ? 0 : -1}>
          <Palette size={24} weight="regular" className="header__nav-icon" aria-hidden="true" />
          <span>Work</span>
        </a>
        <a href="#about" className="header__mobile-link" onClick={(e) => scrollToSection(e, '#about')} tabIndex={isMobileMenuOpen ? 0 : -1}>
          <User size={24} weight="regular" className="header__nav-icon" aria-hidden="true" />
          <span>About</span>
        </a>
        <a href="#testimonials" className="header__mobile-link" onClick={(e) => scrollToSection(e, '#testimonials')} tabIndex={isMobileMenuOpen ? 0 : -1}>
          <ChatCircleDots size={24} weight="regular" className="header__nav-icon" aria-hidden="true" />
          <span>Testimonials</span>
        </a>
        <button 
          type="button" 
          className="header__mobile-link"
          aria-label="Toggle light mode"
          tabIndex={isMobileMenuOpen ? 0 : -1}
        >
          <Sun size={24} weight="regular" className="header__nav-icon" aria-hidden="true" />
          <span>Light Mode</span>
        </button>
        <a 
          href="#contact" 
          className="header__contact-btn header__contact-btn--mobile" 
          onClick={(e) => scrollToSection(e, '#contact')}
          tabIndex={isMobileMenuOpen ? 0 : -1}
        >
          <Phone size={24} weight="regular" className="header__contact-icon" aria-hidden="true" />
          <span>Contact</span>
        </a>
      </nav>
    </header>
  );
};

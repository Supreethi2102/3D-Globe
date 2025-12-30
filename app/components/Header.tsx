import React, { useState, useEffect } from 'react';
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

  // Smooth scroll to section
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    const element = document.querySelector(sectionId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header className={`header ${isScrolled ? 'header--scrolled' : ''}`}>
      {/* Logo */}
      <a href="/" className="header__logo">
        sjs
      </a>
      
      {/* Desktop Navigation */}
      <nav className="header__nav">
        <a 
          href="#work" 
          className="header__nav-link"
          onClick={(e) => scrollToSection(e, '#work')}
          onMouseEnter={() => setHoveredLink('work')}
          onMouseLeave={() => setHoveredLink(null)}
        >
          <Palette size={24} weight={hoveredLink === 'work' ? 'fill' : 'regular'} className="header__nav-icon" />
          <span>Work</span>
        </a>
        <a 
          href="#about" 
          className="header__nav-link"
          onClick={(e) => scrollToSection(e, '#about')}
          onMouseEnter={() => setHoveredLink('about')}
          onMouseLeave={() => setHoveredLink(null)}
        >
          <User size={24} weight={hoveredLink === 'about' ? 'fill' : 'regular'} className="header__nav-icon" />
          <span>About</span>
        </a>
        <a 
          href="#testimonials" 
          className="header__nav-link"
          onClick={(e) => scrollToSection(e, '#testimonials')}
          onMouseEnter={() => setHoveredLink('testimonials')}
          onMouseLeave={() => setHoveredLink(null)}
        >
          <ChatCircleDots size={24} weight={hoveredLink === 'testimonials' ? 'fill' : 'regular'} className="header__nav-icon" />
          <span>Testimonials</span>
        </a>
        <button 
          className="header__nav-link header__theme-toggle"
          onMouseEnter={() => setHoveredLink('theme')}
          onMouseLeave={() => setHoveredLink(null)}
        >
          <Sun size={24} weight={hoveredLink === 'theme' ? 'fill' : 'regular'} className="header__nav-icon" />
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
        <Phone size={24} weight={hoveredLink === 'contact' ? 'fill' : 'regular'} className="header__contact-icon" />
        <span>Contact</span>
      </a>

      {/* Mobile Menu Button */}
      <button 
        className="header__mobile-toggle"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-label="Toggle menu"
      >
        <span className={`header__hamburger ${isMobileMenuOpen ? 'header__hamburger--open' : ''}`}></span>
      </button>

      {/* Mobile Navigation */}
      <nav className={`header__mobile-nav ${isMobileMenuOpen ? 'header__mobile-nav--open' : ''}`}>
        <a href="#work" className="header__mobile-link" onClick={(e) => scrollToSection(e, '#work')}>
          <Palette size={24} weight="regular" className="header__nav-icon" />
          <span>Work</span>
        </a>
        <a href="#about" className="header__mobile-link" onClick={(e) => scrollToSection(e, '#about')}>
          <User size={24} weight="regular" className="header__nav-icon" />
          <span>About</span>
        </a>
        <a href="#testimonials" className="header__mobile-link" onClick={(e) => scrollToSection(e, '#testimonials')}>
          <ChatCircleDots size={24} weight="regular" className="header__nav-icon" />
          <span>Testimonials</span>
        </a>
        <button className="header__mobile-link">
          <Sun size={24} weight="regular" className="header__nav-icon" />
          <span>Light Mode</span>
        </button>
        <a href="#contact" className="header__contact-btn header__contact-btn--mobile" onClick={(e) => scrollToSection(e, '#contact')}>
          <Phone size={24} weight="regular" className="header__contact-icon" />
          <span>Contact</span>
        </a>
      </nav>
    </header>
  );
};

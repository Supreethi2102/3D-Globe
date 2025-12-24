import React, { useEffect, useRef } from 'react';
import { Header, Hero, Footer, CaseStudies, Publications, About, Testimonials, Contact, Destinations, ColorSwatches } from './components';
import './App.css';

export const App: React.FC = () => {
  const globeContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Move the globe element into our React layout
    const globeElement = document.getElementById('globe');
    if (globeElement && globeContainerRef.current) {
      globeContainerRef.current.appendChild(globeElement);
    }
  }, []);

  return (
    <div className="app">
      <Header />
      
      {/* Hero Section with Globe */}
      <section className="hero-section">
        <main className="main">
          {/* Left Side - Hero */}
          <div className="main__left">
            <Hero />
          </div>
          
          {/* Right Side - Globe + Footer */}
          <div className="main__right">
            <div className="main__globe" ref={globeContainerRef}>
              {/* Globe will be moved here */}
            </div>
            <Footer />
          </div>
        </main>
      </section>

      {/* Case Studies Section */}
      <CaseStudies />

      {/* Publications Section */}
      <Publications />

      {/* About Section */}
      <About />

      {/* Testimonials Section */}
      <Testimonials />

      {/* Contact Section */}
      <Contact />

      {/* Destinations Section */}
      <Destinations />

      {/* Color Swatches Footer */}
      <ColorSwatches />
    </div>
  );
};

import React from 'react';
import './Hero.css';

export const Hero: React.FC = () => {
  return (
    <section className="hero">
      <div className="hero__content">
        <h1 className="hero__title">
          I'm Samantha.<br />
          Inspired by the world.<br />
          Driven by insight.<br />
          From places to pixels.
        </h1>
        
        <p className="hero__description">
          I craft bold, human-centred experiences that tell meaningful
          stories through purposeful, lasting design that connects,
          converts, and inspires across graphics, UI, and UX.
        </p>
      </div>
    </section>
  );
};


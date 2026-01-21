import React from 'react';
import './Hero.css';

export const Hero: React.FC = () => {
  return (
    <article className="hero" aria-label="Introduction">
      <div className="hero__content">
        <h1 className="hero__title">
          <span className="sr-only">I'm Samantha. Inspired by the world. Driven by insight. From places to pixels.</span>
          <span aria-hidden="true">
            I'm Samantha.<br />
            Inspired by the world.<br />
            Driven by insight.<br />
            From places to pixels.
          </span>
        </h1>
        
        <p className="hero__description">
          I craft thoughtful, people-first graphics, UI, and UX, combining
          strategy and storytelling to turn insight into real impact.
        </p>
      </div>
    </article>
  );
};


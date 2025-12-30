import React, { useState, useEffect } from 'react';
import { CaretLeft, CaretRight } from '@phosphor-icons/react';
import './Testimonials.css';

const testimonials = [
  {
    id: 1,
    quote: `I had the privilege of working with Sam in varying degrees and across many projects in our time together at The Warehouse Group. What always stood out about Sam was her infectious enthusiasm and dedication to every project she was involved in - resulting in many successful campaigns over the years. Sam is curious, empathetic, extremely hard working and strives for excellence in everything she does.`,
    author: 'Catherine Balle',
    role: 'International Event Retail at National Football League (NFL)',
  },
  {
    id: 2,
    quote: `Sam brings creativity and thoughtfulness to every project. Her attention to detail and ability to translate complex ideas into beautiful designs is remarkable.`,
    author: 'John Smith',
    role: 'Creative Director at Design Studio',
  },
  {
    id: 3,
    quote: `Working with Sam was an absolute pleasure. She consistently delivered high-quality work that exceeded our expectations.`,
    author: 'Emily Chen',
    role: 'Product Manager at Tech Company',
  },
  {
    id: 4,
    quote: `Sam's design thinking approach helped us solve complex user experience challenges. Her work had a measurable impact on our product success.`,
    author: 'Michael Brown',
    role: 'VP of Product at Startup Inc',
  },
  {
    id: 5,
    quote: `Collaborative, innovative, and always pushing boundaries. Sam is the kind of designer every team needs.`,
    author: 'Sarah Wilson',
    role: 'Head of Marketing at Brand Agency',
  },
];

export const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hoveredNav, setHoveredNav] = useState<'prev' | 'next' | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-advance testimonials
  useEffect(() => {
    if (isPaused) return;
    
    const interval = setInterval(() => {
      handleNext();
    }, 8000); // 8 seconds per testimonial
    
    return () => clearInterval(interval);
  }, [currentIndex, isPaused]);

  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
    setTimeout(() => setIsAnimating(false), 400);
  };

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    setTimeout(() => setIsAnimating(false), 400);
  };

  const handleDotClick = (index: number) => {
    if (isAnimating || index === currentIndex) return;
    setIsAnimating(true);
    setCurrentIndex(index);
    setTimeout(() => setIsAnimating(false), 400);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="testimonials" id="testimonials">
      <div 
        className="testimonials__card"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <span className="testimonials__label">Testimonials</span>

        <div className="testimonials__content">
          {/* Header */}
          <div className="testimonials__header">
            <h2 className="testimonials__title">Global shoutout</h2>
            <p className="testimonials__subtitle">
              Here's what collaborators and colleagues say — near and far.
            </p>
          </div>

          {/* Carousel - buttons aligned with quote */}
          <div className="testimonials__carousel">
            {/* Left Arrow */}
            <button 
              className="testimonials__nav" 
              onClick={handlePrev}
              onMouseEnter={() => setHoveredNav('prev')}
              onMouseLeave={() => setHoveredNav(null)}
              aria-label="Previous testimonial"
              disabled={isAnimating}
            >
              <CaretLeft size={24} weight={hoveredNav === 'prev' ? 'bold' : 'regular'} color={hoveredNav === 'prev' ? '#ffffff' : '#7150E5'} />
            </button>

            {/* Testimonial Quote with animation */}
            <div className="testimonials__quote-wrapper">
              <p className={`testimonials__quote ${isAnimating ? 'testimonials__quote--animating' : ''}`} key={currentIndex}>
                {currentTestimonial.quote}
              </p>
            </div>

            {/* Right Arrow */}
            <button 
              className="testimonials__nav" 
              onClick={handleNext}
              onMouseEnter={() => setHoveredNav('next')}
              onMouseLeave={() => setHoveredNav(null)}
              aria-label="Next testimonial"
              disabled={isAnimating}
            >
              <CaretRight size={24} weight={hoveredNav === 'next' ? 'bold' : 'regular'} color={hoveredNav === 'next' ? '#ffffff' : '#7150E5'} />
            </button>
          </div>

          {/* Author and Dots - below carousel */}
          <div className={`testimonials__author-block ${isAnimating ? 'testimonials__author-block--animating' : ''}`}>
            <p className="testimonials__author" key={`author-${currentIndex}`}>
              <strong>{currentTestimonial.author}</strong> - {currentTestimonial.role}
            </p>
            
            {/* Pagination Dots */}
            <div className="testimonials__dots">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`testimonials__dot ${index === currentIndex ? 'testimonials__dot--active' : ''}`}
                  onClick={() => handleDotClick(index)}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

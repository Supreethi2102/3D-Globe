import React, { useState, useEffect, useRef } from 'react';
import { Info } from '@phosphor-icons/react';
import './About.css';

/* =========================================
   BLOCK 1: Top Section - A World of Ideas
   ========================================= */
const AboutBlock1: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="about-block1">
      <div className="about-block1__illustration">
        <img src="/Illustration-Sam.png" alt="Samantha illustration" />
      </div>

      <div className="about-block1__content">
        <h2 className="about-block1__title">A world of ideas</h2>
        
        <div className="about-block1__text">
          <p>With a background in graphic design, my work has spanned everything from campaign concepts and art-directed photoshoots to rolling out print mailers, digital banners, and editorial layouts. That foundation still shapes how I design — with clarity, storytelling, and visual impact.</p>
          <p>Those skills now intersect with a growing UX and UI practice, where I explore how digital experiences can feel more human, inclusive, and emotionally engaging.</p>
          <p className="about-block1__spacer">&nbsp;</p>
          <p className="about-block1__subtitle">Creative Influences</p>
          <p>Travel fuels my creativity. It's where I notice the details, moods, and human moments that spark design ideas.</p>
          <p>Like standing on Monet's bridge in Giverny, looking down at the pond and feeling like I'd stepped into a painting. Or lying on the ground floor of the Guggenheim in New York, staring up at Frank Lloyd Wright's spiral while James Turrell's light installation shifted through colour and space. The whole building became the canvas.<br />(Yes, I tried to capture it. No, the security guard wasn't thrilled. Worth it? Absolutely.)</p>
          <p>The Christian Dior exhibition in Paris was a highlight. Every dress was stitched with emotion and craftsmanship. I was completely in my element. As someone with a long-standing love of dresses, it felt like being in a very glamorous dream. If my French had been better, I might've joined the atelier on the spot.</p>
          
          {/* Expandable content - hidden until "Read more" is clicked */}
          <div className={`about-block1__expandable ${isExpanded ? 'about-block1__expandable--expanded' : ''}`}>
            <p>Barcelona's Sagrada Familia reminded me that structure and imagination can coexist. And Yayoi Kusama's polka dot show in Wellington, New Zealand? Joyful, powerful, and deeply human.<br />(I've always had a soft spot for polka dots.)</p>
            <p>These moments stay with me. They remind me why I design<br />— to move people, even just a little.</p>
          </div>
          
          {!isExpanded && (
            <span 
              className="about-block1__read-more" 
              onClick={() => setIsExpanded(true)}
            >
              Read more
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

/* =========================================
   BLOCK 2: Quote Section (Romie font, NOT bold)
   ========================================= */
const AboutBlock2: React.FC = () => {
  return (
    <div className="about-block2">
      <p className="about-block2__quote">
        Travel fuels my creativity. It's where I notice the small details, the moods, and the human moments that spark how I design.
      </p>
    </div>
  );
};

/* =========================================
   BLOCK 3: Color Cards + Design in Practice
   ========================================= */

const colorCards = [
  { 
    id: 'nympheas', 
    name: 'Nymphéas Blue', 
    hex: '#5A87E8', 
    color: '#618eb6', 
    rotation: -2.122,
    zIndex: 3,
    position: { top: 0, left: 230 }
  },
  { 
    id: 'yellow', 
    name: 'Paradise Tipani Yellow', 
    hex: '#188974', 
    color: '#f6e067', 
    rotation: -21.906,
    zIndex: 2,
    position: { top: 213, left: 0 }
  },
  { 
    id: 'teal', 
    name: 'Sunshade Teal', 
    hex: '#188974', 
    color: '#188974', 
    rotation: 15.525,
    zIndex: 1,
    position: { top: 356, left: 288 }
  },
];

interface ColorCardProps {
  card: typeof colorCards[0];
  isVisible: boolean;
  animationDelay: number;
}

const ColorCard: React.FC<ColorCardProps> = ({ card, isVisible, animationDelay }) => {
  return (
    <div 
      className={`about-color-card ${isVisible ? 'about-color-card--animate' : ''}`}
      style={{ 
        '--card-rotation': `${card.rotation}deg`,
        '--card-top': `${card.position.top}px`,
        '--card-left': `${card.position.left}px`,
        '--animation-delay': `${animationDelay}ms`,
        zIndex: card.zIndex,
      } as React.CSSProperties}
    >
      <div className="about-color-card__inner">
        <div className="about-color-card__swatch" style={{ backgroundColor: card.color }} />
        <div className="about-color-card__text">
          <p className="about-color-card__name">{card.name}</p>
          <div className="about-color-card__hex-row">
            <span className="about-color-card__hex">{card.hex}</span>
            <Info size={20} weight="regular" color="#5238a8" />
          </div>
        </div>
        <span className="about-color-card__link">View colour mood</span>
      </div>
    </div>
  );
};

const AboutBlock3: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const block3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!block3Ref.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(block3Ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="about-block3" ref={block3Ref}>
      <div className="about-block3__cards">
        {colorCards.map((card, index) => (
          <ColorCard 
            key={card.id} 
            card={card}
            isVisible={isVisible}
            animationDelay={index * 200}
          />
        ))}
      </div>

      <div className="about-block3__content">
        <div className="about-block3__text-block">
          <p className="about-block3__title">Design in Practice</p>
          <p>Based in Aotearoa New Zealand, I work across UX, UI, and graphic design. Most days, I'm toggling between Figma and InDesign — sketching flows, refining kerning, building out a design system, or exploring layout directions.</p>
          <p>Projects that sit at the intersection of creativity and clarity tend to draw me in. I'm especially interested in work that:<br /> • helps people navigate complexity,<br /> • merges utility with beauty,<br /> • and reflects culture or emotion through thoughtful design.</p>
          <p>Whether I'm solo in deep focus or collaborating with developers, marketers, writers or stakeholders, I bring curiosity, empathy, and a sharp eye for detail to every project. I'm always open to new tools, methods, or ideas — especially if they lead to better outcomes for the people on the other side.</p>
          <p className="about-block3__spacer">&nbsp;</p>
          <p className="about-block3__title">Small Joys</p>
          <p>Music often shapes the rhythm of how I work — each project has its own pace and mood. Moodboards are where ideas begin to form, and naming colour palettes is one of my quiet pleasures.<br />A recent favourite: Saltwater Afternoon, a cool-toned teal with a hint of escapism. (Name subject to change.)</p>
          <p>This site is mostly black and white by intention. I wanted the work to speak for itself, with a few sneaky pops of colour if you switch modes.</p>
          <p>And if I'm deep in Figma or nudging paragraph styles into place, chances are there's a stash of Natural Confectionery Co. lollies nearby. Fruity chews are my colour-coded reward system — one lolly at a time.</p>
        </div>
        <img src="/Samantha signature 3.png" alt="Samantha" className="about-block3__signature" />
      </div>
    </div>
  );
};

/* =========================================
   MAIN ABOUT SECTION
   ========================================= */
export const About: React.FC = () => {
  return (
    <section className="about">
      <span className="about__label">About</span>
      <AboutBlock1 />
      <AboutBlock2 />
      <AboutBlock3 />
    </section>
  );
};

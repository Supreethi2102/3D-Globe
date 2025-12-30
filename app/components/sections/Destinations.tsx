import React, { useState, useRef, useEffect } from 'react';
import { ArrowSquareOut, X } from '@phosphor-icons/react';
import './Destinations.css';

// Destination data matching Figma design with expanded content
const destinations = {
  aarhus: { 
    id: 'denmark', 
    country: 'Denmark', 
    city: 'Aarhus', 
    image: '/destinations/here-to-travel-seqfFkckQcI-unsplash 8.png',
    expandedImage: '/Expanded Card Images/here-to-travel-seqfFkckQcI-unsplash 8-3.png',
    size: 'wide',
    title: 'Your rainbow panorama',
    artist: 'Your rainbow panorama by Olafur Eliasson.',
    photographer: 'Photo by Julia Taubitz',
    whyCity: 'Aarhus is home to the ARoS Aarhus Kunstmuseum, where architecture and art are designed as a single experience. The building is bold but restrained, intended to be moved through rather than simply observed.',
    whatDrawsMe: 'The circular skywalk reframes the city entirely through colour. As you move through the space, Aarhus shifts gradually, without changing form. Perception, not structure, does the work.',
    howInfluences: 'It supports the idea that experience unfolds over time. I try to design work that reveals itself progressively, using pacing and subtle cues to guide attention without overwhelming it.'
  },
  nevada: { 
    id: 'usa', 
    country: 'USA', 
    city: 'Nevada', 
    image: '/destinations/e-3Qf1QyJFs30-unsplash 6.png',
    expandedImage: '/Expanded Card Images/e-i3rzaeR37Wo-unsplash 4.png',
    size: 'tall',
    title: 'Seven Magic Mountains',
    artist: 'Seven Magic Mountains by Ugo Rondinone.',
    photographer: 'Photo by Erda Estremera',
    whyCity: 'Seven Magic Mountains rises boldly in the desert. Painted boulders, 9–11 metres high, contrast with the flat terrain and surroundings. Their scale turns the desert into a canvas, showing human creativity in the space.',
    whatDrawsMe: 'The towers balance simplicity and spectacle. Neon colours sit against natural stone, creating a striking clash between the artificial and the desert. Their scale feels almost architectural, like playful monuments interrupting the horizon.',
    howInfluences: 'The installation highlights how context shapes experience. I work to create designs where colour, scale, and placement create impact, spark curiosity, and draw people in.'
  },
  calpe: { 
    id: 'spain', 
    country: 'Spain', 
    city: 'Calpe', 
    image: '/destinations/lena-polishko-XrUCHZO97Ak-unsplash 15.png',
    expandedImage: '/Expanded Card Images/lena-polishko-XrUCHZO97Ak-unsplash 15.png',
    size: 'normal',
    title: 'La Muralla Roja',
    artist: 'La Muralla Roja by Ricardo Bofill.',
    photographer: 'Photo by Lena Polishko',
    whyCity: 'La Muralla Roja explores form and colour. Stacked volumes and interlocking courtyards make the building sculptural. Mediterranean and North African influences meet postmodern ideas to create playful, purposeful spaces.',
    whatDrawsMe: 'The maze-like layout guides movement and discovery. Reds and pinks dominate outside, cooler blues inside. Private terraces and shared paths create semi-public layers. Stairs and corridors frame spaces into flowing sequences.',
    howInfluences: 'It highlights how form, colour, and rhythm shape experience. I look to design work where layout and colour guide attention, create flow, and make interactions intuitive.'
  },
  giza: { 
    id: 'egypt', 
    country: 'Egypt', 
    city: 'Giza', 
    image: '/destinations/dilip-poddar--lu6ThTe2g4-unsplash 6.png',
    expandedImage: '/Expanded Card Images/dilip-poddar--lu6ThTe2g4-unsplash 6.png',
    size: 'normal',
    title: 'The Great Sphinx',
    artist: 'The Great Sphinx, built under Pharaoh Khafre.',
    photographer: 'Photo by Dilip Podda',
    whyCity: 'The Great Sphinx is one of the oldest great sculptures. Carved from a single limestone block, its lion\'s body and human head convey power and intellect. Its scale and survival reflect the ambition of ancient builders.',
    whatDrawsMe: 'Its form balances simplicity and symbolism. Every angle and curve communicates authority. Erosion adds texture, and its position on the Giza Plateau frames the pyramids behind it as part of a deliberate composition.',
    howInfluences: 'This approach reveals that design can tell a story over time. I focus on creating work where shape and proportion communicate meaning and leave a lasting impression.'
  },
  dubai: { 
    id: 'uae', 
    country: 'United Arab Emirates', 
    city: 'Dubai', 
    image: '/destinations/e-3Qf1QyJFs30-unsplash 7.png',
    expandedImage: '/Expanded Card Images/here-to-travel-seqfFkckQcI-unsplash 8-4.png',
    size: 'tall',
    title: 'Creek Harbour',
    artist: 'Creek Harbour arches, framing the skyline beyond.',
    photographer: 'Photo by Florian Wehde',
    whyCity: 'Dubai\'s architecture treats the city itself as a designed object. Geometry, heritage references, and future-facing ambition are used deliberately, not decoratively.',
    whatDrawsMe: 'The Santiago Calatrava inspired arches at Dubai Creek Harbour frame the skyline like a living artwork. Looking through the arch, the city becomes the focal point. Architecture acting as a lens, not the hero.',
    howInfluences: 'The work reinforces the power of framing and hierarchy. I aim to design interfaces that guide attention intentionally, using form and layout to elevate content rather than compete with it, across UI, UX, and visual design.'
  },
  marrakech: { 
    id: 'morocco', 
    country: 'Morocco', 
    city: 'Marrakech', 
    image: '/destinations/riccardo-monteleone-59mmHLj0sbQ-unsplash 6.png',
    expandedImage: '/Expanded Card Images/here-to-travel-seqfFkckQcI-unsplash 8-2.png',
    size: 'wide',
    title: 'The Jardin Majorelle',
    artist: 'The Jardin Majorelle, built by French painter Jacques Majorelle.',
    photographer: 'Photo by Riccardo Monteleone',
    whyCity: 'The Jardin Majorelle and the adjacent Musée Yves Saint Laurent show how colour, style, and space can create a strong visual identity. They reveal how trends and creative ideas ripple across design channels.',
    whatDrawsMe: 'The intense cobalt "Majorelle Blue" garden contrasts with lush plants, while the nearby fashion museum celebrates Yves Saint Laurent\'s use of silhouette, palette, and form to shape style and mood.',
    howInfluences: 'Fashion leads with mood and visual language. I apply that mindset to UI, UX, and graphic design through colour, hierarchy, and structure that feels intentional and trend-aware.'
  },
  jaipur: { 
    id: 'india', 
    country: 'India', 
    city: 'Jaipur', 
    image: '/destinations/aditya-kumar-gvY6OpSxNZY-unsplash 3.png',
    expandedImage: '/Expanded Card Images/here-to-travel-seqfFkckQcI-unsplash 8.png',
    size: 'normal',
    title: 'The Hawa Mahal',
    artist: 'The Hawa Mahal, with its pink sandstone façade.',
    photographer: 'Photo by Aditya Kumar',
    whyCity: 'Jaipur\'s architecture shows how beauty, colour, and function can coexist without compromise. Design here is deeply human, responding to climate, culture, and everyday life rather than pure spectacle.',
    whatDrawsMe: 'The Hawa Mahal, or Palace of Winds, with its pink sandstone façade and 953 jharokha windows. Its intricate latticework creates privacy, airflow, and rhythm, turning a practical solution into a defining visual identity.',
    howInfluences: 'Good design solves more than one problem at a time. Across my UI, UX, and graphic design work, Composition and detail are prioritised to deliver clarity with intent.'
  },
  naoshima: { 
    id: 'japan', 
    country: 'Japan', 
    city: 'Naoshima Island', 
    image: '/destinations/rebecca-lam-0uAUVfLxXsY-unsplash 7.png',
    expandedImage: '/Expanded Card Images/here-to-travel-seqfFkckQcI-unsplash 8-1.png',
    size: 'normal',
    title: 'Pumpkin',
    artist: 'Yayoi Kusama\'s "Pumpkin" on the Benesse jetty.',
    photographer: 'Photo by Rebecca Lam',
    whyCity: 'Off the coast of Japan, the island blends contemporary art, architecture, and nature seamlessly. Its network of museums and seasonal art festivals shows how minimalism and thoughtful detail can transform spaces into immersive experiences.',
    whatDrawsMe: 'Yayoi Kusama\'s polka dot installation on the jetty is playful and bold. Its repetition and scale contrast with the natural setting, creating a moment of surprise and delight.',
    howInfluences: 'Pattern, scale, and colour sit at the centre of my thinking. The outcome is clear, thoughtful, playful design that invites exploration without overwhelming the user.'
  },
};

type DestinationKey = keyof typeof destinations;

interface Destination {
  id: string;
  country: string;
  city: string;
  image: string;
  expandedImage: string;
  size: string;
  title: string;
  artist: string;
  photographer: string;
  whyCity: string;
  whatDrawsMe: string;
  howInfluences: string;
}

interface DestinationCardProps {
  destination: Destination;
  isExpanded: boolean;
  onToggle: () => void;
  layoutDirection?: 'image-left' | 'image-right';
}

const ExpandedContent: React.FC<{ destination: Destination }> = ({ destination }) => (
  <div className="destination-expanded__content">
    <div className="destination-expanded__header">
      <h3 className="destination-expanded__title">{destination.title}</h3>
      <p className="destination-expanded__location">{destination.city}, {destination.country}</p>
    </div>
    
    <div className="destination-expanded__sections">
      <div className="destination-expanded__section">
        <h4>Why {destination.city}?</h4>
        <p>{destination.whyCity}</p>
      </div>
      
      <div className="destination-expanded__section">
        <h4>What draws me to {destination.title}?</h4>
        <p>{destination.whatDrawsMe}</p>
      </div>
      
      <div className="destination-expanded__section">
        <h4>How it influences my design?</h4>
        <p>{destination.howInfluences}</p>
      </div>
    </div>
  </div>
);

const ExpandedImage: React.FC<{ destination: Destination }> = ({ destination }) => (
  <div className="destination-expanded__image-wrapper">
    <img 
      src={destination.expandedImage} 
      alt={destination.title}
      className="destination-expanded__image"
    />
    <div className="destination-expanded__credit">
      <p className="destination-expanded__artist">{destination.artist}</p>
      <p className="destination-expanded__photographer">{destination.photographer}</p>
    </div>
  </div>
);

const DestinationCard: React.FC<DestinationCardProps> = ({ 
  destination, 
  isExpanded, 
  onToggle,
  layoutDirection = 'image-left'
}) => {
  if (isExpanded) {
    return (
      <div className={`destination-expanded destination-expanded--${layoutDirection}`}>
        <button 
          type="button"
          className="destination-expanded__close" 
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onToggle();
          }}
        >
          Close <X size={16} weight="bold" />
        </button>
        
        {layoutDirection === 'image-left' ? (
          <>
            <ExpandedImage destination={destination} />
            <ExpandedContent destination={destination} />
          </>
        ) : (
          <>
            <ExpandedContent destination={destination} />
            <ExpandedImage destination={destination} />
          </>
        )}
      </div>
    );
  }

  return (
    <div 
      className={`destination-card destination-card--${destination.size}`}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onToggle();
      }}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onToggle();
        }
      }}
    >
      <div className="destination-card__image-wrapper">
        <img 
          src={destination.image} 
          alt={`${destination.city}, ${destination.country}`}
          className="destination-card__image"
        />
      </div>
      <div className="destination-card__info">
        <p className="destination-card__city">{destination.city}</p>
        <p className="destination-card__country">{destination.country}</p>
      </div>
    </div>
  );
};

// Small card component for the grid below expanded card
interface SmallCardProps {
  destination: Destination;
  onClick: () => void;
}

const SmallCard: React.FC<SmallCardProps> = ({ destination, onClick }) => (
  <div 
    className="destination-small" 
    onClick={(e) => {
      e.preventDefault();
      e.stopPropagation();
      onClick();
    }}
    role="button"
    tabIndex={0}
    onKeyDown={(e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onClick();
      }
    }}
  >
    <div className="destination-small__image-wrapper">
      <img 
        src={destination.image} 
        alt={`${destination.city}, ${destination.country}`}
        className="destination-small__image"
      />
    </div>
    <div className="destination-small__info">
      <p className="destination-small__city">{destination.city}</p>
      <p className="destination-small__country">{destination.country}</p>
    </div>
  </div>
);

export const Destinations: React.FC = () => {
  const [isShareHovered, setIsShareHovered] = useState(false);
  const [expandedCard, setExpandedCard] = useState<DestinationKey | null>(null);
  const expandedCardRef = useRef<HTMLDivElement>(null);

  const toggleCard = (id: DestinationKey) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  // Scroll to expanded card when it opens
  useEffect(() => {
    if (expandedCard && expandedCardRef.current) {
      // Delay to let the DOM update after state change
      const timeoutId = setTimeout(() => {
        const element = expandedCardRef.current;
        if (element) {
          const headerOffset = 80; // Account for fixed header
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.scrollY - headerOffset;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 150);
      
      return () => clearTimeout(timeoutId);
    }
  }, [expandedCard]);

  // Define which cards belong to which row
  const row1Cards: DestinationKey[] = ['aarhus', 'calpe', 'giza', 'nevada'];
  const row2Cards: DestinationKey[] = ['dubai', 'marrakech', 'jaipur', 'naoshima'];

  // Check if expanded card is from row 1 or row 2
  const isRow1Card = (key: DestinationKey) => row1Cards.includes(key);
  const isRow2Card = (key: DestinationKey) => row2Cards.includes(key);

  // Get other destinations based on which row the expanded card is in
  const getOtherRow1Cards = () => {
    if (!expandedCard) return [];
    return row1Cards.filter(key => key !== expandedCard);
  };

  const getOtherRow2Cards = () => {
    if (!expandedCard) return [];
    return row2Cards.filter(key => key !== expandedCard);
  };

  // Determine layout direction based on card
  const getLayoutDirection = (key: DestinationKey): 'image-left' | 'image-right' => {
    // Tall cards and some normal cards have content on left
    if (['nevada', 'dubai', 'naoshima', 'marrakech', 'jaipur'].includes(key)) {
      return 'image-right';
    }
    return 'image-left';
  };

  return (
    <section className="destinations">
      {/* Header */}
      <div className="destinations__header">
        <h2 className="destinations__title">Design destinations on my radar</h2>
        <p className="destinations__subtitle">
          Places I haven't explored yet, but they keep turning up in my moodboards and design thinking.
        </p>
      </div>

      {/* Content Area */}
      <div className="destinations__content">
        {expandedCard ? (
          <>
            {/* If Row 1 card is expanded: show expanded card, other Row 1 as small cards, Row 2 intact */}
            {isRow1Card(expandedCard) && (
              <>
                <div ref={expandedCardRef}>
                  <DestinationCard 
                    destination={destinations[expandedCard]} 
                    isExpanded={true} 
                    onToggle={() => setExpandedCard(null)}
                    layoutDirection={getLayoutDirection(expandedCard)}
                  />
                </div>
                
                {/* Other Row 1 cards as small cards */}
                <div className="destinations__small-grid destinations__small-grid--row1">
                  {getOtherRow1Cards().map(key => (
                    <SmallCard 
                      key={key}
                      destination={destinations[key]}
                      onClick={() => toggleCard(key)}
                    />
                  ))}
                </div>

                {/* Row 2 stays in original grid */}
                <div className="destinations__grid destinations__grid--compact">
                  <div className="destinations__row">
                    <DestinationCard 
                      destination={destinations.dubai} 
                      isExpanded={false} 
                      onToggle={() => toggleCard('dubai')} 
                    />
                    <div className="destinations__column">
                      <DestinationCard 
                        destination={destinations.marrakech} 
                        isExpanded={false} 
                        onToggle={() => toggleCard('marrakech')} 
                      />
                      <div className="destinations__row destinations__row--inner">
                        <DestinationCard 
                          destination={destinations.jaipur} 
                          isExpanded={false} 
                          onToggle={() => toggleCard('jaipur')} 
                        />
                        <DestinationCard 
                          destination={destinations.naoshima} 
                          isExpanded={false} 
                          onToggle={() => toggleCard('naoshima')} 
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* If Row 2 card is expanded: show Row 1 grid first, then expanded card, then other Row 2 as small cards */}
            {isRow2Card(expandedCard) && (
              <>
                {/* Row 1 stays in original grid */}
                <div className="destinations__grid destinations__grid--compact">
                  <div className="destinations__row">
                    <div className="destinations__column">
                      <DestinationCard 
                        destination={destinations.aarhus} 
                        isExpanded={false} 
                        onToggle={() => toggleCard('aarhus')} 
                      />
                      <div className="destinations__row destinations__row--inner">
                        <DestinationCard 
                          destination={destinations.calpe} 
                          isExpanded={false} 
                          onToggle={() => toggleCard('calpe')} 
                        />
                        <DestinationCard 
                          destination={destinations.giza} 
                          isExpanded={false} 
                          onToggle={() => toggleCard('giza')} 
                        />
                      </div>
                    </div>
                    <DestinationCard 
                      destination={destinations.nevada} 
                      isExpanded={false} 
                      onToggle={() => toggleCard('nevada')} 
                    />
                  </div>
                </div>

                {/* Expanded Row 2 card */}
                <div ref={expandedCardRef}>
                  <DestinationCard 
                    destination={destinations[expandedCard]} 
                    isExpanded={true} 
                    onToggle={() => setExpandedCard(null)}
                    layoutDirection={getLayoutDirection(expandedCard)}
                  />
                </div>
                
                {/* Other Row 2 cards as small cards */}
                <div className="destinations__small-grid">
                  {getOtherRow2Cards().map(key => (
                    <SmallCard 
                      key={key}
                      destination={destinations[key]}
                      onClick={() => toggleCard(key)}
                    />
                  ))}
                </div>
              </>
            )}
          </>
        ) : (
          /* Default Grid View */
      <div className="destinations__grid">
            {/* Row 1: Aarhus (wide) + Calpe/Giza (stacked) + Nevada (tall) */}
            <div className="destinations__row">
              <div className="destinations__column">
                <DestinationCard 
                  destination={destinations.aarhus} 
                  isExpanded={false} 
                  onToggle={() => toggleCard('aarhus')} 
                />
                <div className="destinations__row destinations__row--inner">
                  <DestinationCard 
                    destination={destinations.calpe} 
                    isExpanded={false} 
                    onToggle={() => toggleCard('calpe')} 
                  />
                  <DestinationCard 
                    destination={destinations.giza} 
                    isExpanded={false} 
                    onToggle={() => toggleCard('giza')} 
                  />
                </div>
              </div>
              <DestinationCard 
                destination={destinations.nevada} 
                isExpanded={false} 
                onToggle={() => toggleCard('nevada')} 
              />
            </div>
            
            {/* Row 2: Dubai (tall) + Marrakech (wide) + Jaipur/Naoshima (stacked) */}
            <div className="destinations__row">
              <DestinationCard 
                destination={destinations.dubai} 
                isExpanded={false} 
                onToggle={() => toggleCard('dubai')} 
              />
              <div className="destinations__column">
                <DestinationCard 
                  destination={destinations.marrakech} 
                  isExpanded={false} 
                  onToggle={() => toggleCard('marrakech')} 
                />
                <div className="destinations__row destinations__row--inner">
                  <DestinationCard 
                    destination={destinations.jaipur} 
                    isExpanded={false} 
                    onToggle={() => toggleCard('jaipur')} 
                  />
                  <DestinationCard 
                    destination={destinations.naoshima} 
                    isExpanded={false} 
                    onToggle={() => toggleCard('naoshima')} 
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* CTA Section */}
      <div className="destinations__cta">
        <p className="destinations__cta-text">
          Been to any of these places? Spotted great design?
          <br />
          Let me know, I'd love to hear about it.
        </p>
        <button 
          type="button"
          className="destinations__share-btn"
          onMouseEnter={() => setIsShareHovered(true)}
          onMouseLeave={() => setIsShareHovered(false)}
        >
          <ArrowSquareOut size={24} weight={isShareHovered ? 'fill' : 'regular'} color="#fbfbfb" className="destinations__share-icon" />
          <span>Share inspiration</span>
        </button>
      </div>
    </section>
  );
};

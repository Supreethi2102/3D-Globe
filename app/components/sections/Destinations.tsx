import React, { useState } from 'react';
import { ArrowSquareOut } from '@phosphor-icons/react';
import './Destinations.css';

// Destination data with renamed images from public folder
const destinations = [
  {
    id: 'croatia',
    country: 'Croatia',
    city: 'Dubrovnik',
    image: '/Dubrovnik.png',
    size: 'wide', // 2 columns wide
  },
  {
    id: 'vietnam',
    country: 'Vietnam',
    city: 'Hội An',
    image: '/Hội An.png',
    size: 'tall', // 2 rows tall
  },
  {
    id: 'greece',
    country: 'Greece',
    city: 'Santorini',
    image: '/Santorini.png',
    size: 'normal',
  },
  {
    id: 'mexico',
    country: 'Mexico',
    city: 'Mexico City',
    image: '/Mexico City.png',
    size: 'normal',
  },
  {
    id: 'usa',
    country: 'USA',
    city: 'New Orleans',
    image: '/New Orleans.png',
    size: 'tall', // 2 rows tall
  },
  {
    id: 'denmark',
    country: 'Denmark',
    city: 'Copenhagen',
    image: '/Copenhagen.png',
    size: 'wide', // 2 columns wide
  },
  {
    id: 'japan',
    country: 'Japan',
    city: 'Kyoto',
    image: '/Kyoto.png',
    size: 'normal',
  },
  {
    id: 'india',
    country: 'India',
    city: 'Jaipur',
    image: '/Jaipur.png',
    size: 'normal',
  },
];

interface DestinationCardProps {
  destination: typeof destinations[0];
}

const DestinationCard: React.FC<DestinationCardProps> = ({ destination }) => {
  return (
    <div className={`destination-card destination-card--${destination.size}`}>
      <div className="destination-card__image-wrapper">
        <img 
          src={destination.image} 
          alt={`${destination.city}, ${destination.country}`}
          className="destination-card__image"
        />
      </div>
      <div className="destination-card__info">
        <p className="destination-card__country">{destination.country}</p>
        <p className="destination-card__city">{destination.city}</p>
      </div>
    </div>
  );
};

export const Destinations: React.FC = () => {
  const [isShareHovered, setIsShareHovered] = useState(false);

  return (
    <section className="destinations">
      {/* Header */}
      <div className="destinations__header">
        <h2 className="destinations__title">Design destinations on my radar</h2>
        <p className="destinations__subtitle">
          Places I haven't explored yet, but they keep turning up in my moodboards and design thinking.
        </p>
      </div>

      {/* Masonry Grid */}
      <div className="destinations__grid">
        {destinations.map(dest => (
          <DestinationCard key={dest.id} destination={dest} />
        ))}
      </div>

      {/* CTA Section */}
      <div className="destinations__cta">
        <p className="destinations__cta-text">
          Been to any of these places? Spotted great design?
          <br />
          Let me know, I'd love to hear about it.
        </p>
        <button 
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

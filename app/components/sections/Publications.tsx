import React, { useState } from 'react';
import { BookOpen } from '@phosphor-icons/react';
import './Publications.css';

// Publication data with images from public folder (12 cards as per Figma)
const publications = [
  // Row 1
  {
    id: 1,
    title: 'Next magazine',
    subtitle: 'Layout/Art direction',
    image: '/misc/81183903d1a5b39abc75683b7deb5957a7a26ddf.png',
  },
  {
    id: 2,
    title: 'Little Treasures magazine',
    subtitle: 'Layout/Art direction',
    image: '/misc/bb424cd2f5ccd63b32cb1d33d5c48409b7eac79b.png',
  },
  {
    id: 3,
    title: 'Life Pharmacy look-book',
    subtitle: 'Layout/Art direction',
    image: '/misc/bc660a50bdd11425d3b6c0372e26dde94ed79648.png',
  },
  // Row 2
  {
    id: 4,
    title: 'Grooms guide',
    subtitle: 'Layout/Art direction',
    image: '/misc/c42f3d209027b1a6214a728484bf8bd46aa2dd0e.png',
  },
  {
    id: 5,
    title: 'Superlife booklet',
    subtitle: 'Layout/Art direction',
    image: '/misc/bb424cd2f5ccd63b32cb1d33d5c48409b7eac79b.png',
  },
  {
    id: 6,
    title: 'Pumpkin Patch catalogue',
    subtitle: 'Layout/Art direction',
    image: '/misc/fdabc05abb4416c7e2c0ef00313dce6bc3ce1fab.png',
  },
  // Row 3
  {
    id: 7,
    title: 'New Zealand Weddings magazine',
    subtitle: 'Layout/Art direction',
    image: '/misc/c45a327351fe193d5ffdd0defd77cfc4d77622e8.png',
  },
  {
    id: 8,
    title: 'Houses magazine',
    subtitle: 'Layout/Art direction',
    image: '/misc/b462b5710a875a0246180de073b790296e347afd.png',
  },
  {
    id: 9,
    title: 'Architecture New Zealand magazine',
    subtitle: 'Layout/Art direction',
    image: '/misc/81183903d1a5b39abc75683b7deb5957a7a26ddf.png',
  },
  // Row 4
  {
    id: 10,
    title: 'Next magazine',
    subtitle: 'Layout/Art direction',
    image: '/misc/81183903d1a5b39abc75683b7deb5957a7a26ddf.png',
  },
  {
    id: 11,
    title: 'Little Treasures magazine',
    subtitle: 'Layout/Art direction',
    image: '/misc/bb424cd2f5ccd63b32cb1d33d5c48409b7eac79b.png',
  },
  {
    id: 12,
    title: 'Life Pharmacy look-book',
    subtitle: 'Layout/Art direction',
    image: '/misc/bc660a50bdd11425d3b6c0372e26dde94ed79648.png',
  },
];

interface PublicationCardProps {
  publication: typeof publications[0];
}

const PublicationCard: React.FC<PublicationCardProps> = ({ publication }) => {
  return (
    <article 
      className="publication-card"
      tabIndex={0}
      role="button"
      aria-label={`View ${publication.title} - ${publication.subtitle}`}
    >
      <figure className="publication-card__image-container">
        <img 
          src={publication.image} 
          alt={`${publication.title} cover`}
          className="publication-card__image"
        />
      </figure>
      <div className="publication-card__info">
        <h3 className="publication-card__title">{publication.title}</h3>
        <p className="publication-card__subtitle">{publication.subtitle}</p>
      </div>
    </article>
  );
};

export const Publications: React.FC = () => {
  const [isViewHovered, setIsViewHovered] = useState(false);

  return (
    <section 
      className="publications"
      aria-labelledby="publications-title"
    >
      <h2 id="publications-title" className="publications__title">
        Publications <span className="publications__subtitle">Print and digital editorial work</span>
      </h2>
      
      <div 
        className="publications__grid"
        role="list"
        aria-label="Publication portfolio"
      >
        {publications.map(pub => (
          <PublicationCard key={pub.id} publication={pub} />
        ))}
      </div>

      <footer className="publications__footer">
        <button 
          type="button"
          className="view-publications-btn"
          onMouseEnter={() => setIsViewHovered(true)}
          onMouseLeave={() => setIsViewHovered(false)}
          aria-label="View all publications in portfolio"
        >
          <BookOpen size={24} weight={isViewHovered ? 'fill' : 'regular'} color="#7150E5" className="view-publications-btn__icon" aria-hidden="true" />
          <span>View all publications</span>
        </button>
      </footer>
    </section>
  );
};


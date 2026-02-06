import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { X, CaretLeft, CaretRight, SpeakerHigh, ArrowsOut } from '@phosphor-icons/react';
import { getPublicationById, getGalleryImages, getPublicationCopy } from '../../data/publications';
import './PublicationDetail.css';

export const PublicationDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [hoveredBtn, setHoveredBtn] = useState<string | null>(null);

  const publicationId = id ? parseInt(id, 10) : null;
  const publication = publicationId ? getPublicationById(publicationId) : null;

  useEffect(() => {
    if (!publication) {
      navigate('/');
      return;
    }
  }, [publication, navigate]);

  if (!publication) {
    return null;
  }

  const galleryImages = getGalleryImages(publication);
  const copy = getPublicationCopy(publication);
  const currentImage = galleryImages[currentImageIndex] || publication.image;

  const handlePrevious = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentImageIndex((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1));
  };

  const handleThumbnailClick = (index: number) => {
    setCurrentImageIndex(index);
  };

  const handleFullscreen = () => {
    setIsFullscreen(true);
  };

  const handleCloseFullscreen = () => {
    setIsFullscreen(false);
  };

  const handleClose = () => {
    navigate('/');
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (isFullscreen) {
        if (e.key === 'Escape') {
          setIsFullscreen(false);
        } else if (e.key === 'ArrowLeft') {
          setCurrentImageIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1));
        } else if (e.key === 'ArrowRight') {
          setCurrentImageIndex((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1));
        }
      } else {
        if (e.key === 'Escape') {
          navigate('/');
        } else if (e.key === 'ArrowLeft') {
          setCurrentImageIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1));
        } else if (e.key === 'ArrowRight') {
          setCurrentImageIndex((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1));
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isFullscreen, galleryImages.length, navigate]);

  return (
    <>
      <div className="publication-detail">
        <div className="publication-detail__container">
          {/* Header with breadcrumb */}
          <header className="publication-detail__header">
            <div className="publication-detail__breadcrumb">Publications / Photo gallery</div>
          </header>

          {/* Main content - two columns */}
          <div className="publication-detail__body">
            {/* Left column - Text content */}
            <div className="publication-detail__text-col">
              <h1 className="publication-detail__title">{publication.title}</h1>
              <p className="publication-detail__subtitle">{copy.modalSubtitle}</p>
              
              <p className="publication-detail__intro">{copy.intro}</p>
              
              {copy.bullets && copy.bullets.length > 0 && (
                <ul className="publication-detail__bullets">
                  {copy.bullets.map((bullet, index) => (
                    <li key={index}>{bullet}</li>
                  ))}
                </ul>
              )}

              {copy.conclusion && (
                <div className="publication-detail__conclusion">
                  {copy.conclusion.split('\n\n').map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              )}

              {/* Listen button */}
              <button 
                className="publication-detail__listen-btn" 
                aria-label="Listen to publication"
                onMouseEnter={() => setHoveredBtn('listen')}
                onMouseLeave={() => setHoveredBtn(null)}
              >
                <div className="publication-detail__listen-icon">
                  <SpeakerHigh size={24} weight={hoveredBtn === 'listen' ? 'fill' : 'regular'} color="#7150E5" aria-hidden="true" />
                </div>
                <div className="publication-detail__listen-divider" aria-hidden="true"></div>
                <span className="publication-detail__listen-text">Listen</span>
              </button>
            </div>

            {/* Right column - Image gallery */}
            <div className="publication-detail__gallery-col">
              {/* Image counter */}
              <div className="publication-detail__counter">
                {currentImageIndex + 1}/{galleryImages.length} images
              </div>

              {/* Main image */}
              <div className="publication-detail__main-image-wrap">
                <img
                  src={currentImage}
                  alt={`${publication.title} - Image ${currentImageIndex + 1}`}
                  className="publication-detail__main-image"
                />
                
                {/* Navigation arrows */}
                {galleryImages.length > 1 && (
                  <>
                    <button
                      className="publication-detail__nav-btn publication-detail__nav-btn--prev"
                      onClick={handlePrevious}
                      aria-label="Previous image"
                    >
                      <CaretLeft size={24} weight="bold" />
                    </button>
                    <button
                      className="publication-detail__nav-btn publication-detail__nav-btn--next"
                      onClick={handleNext}
                      aria-label="Next image"
                    >
                      <CaretRight size={24} weight="bold" />
                    </button>
                  </>
                )}

                {/* Fullscreen button */}
                <button
                  className="publication-detail__expand-btn"
                  onClick={handleFullscreen}
                  aria-label="View fullscreen"
                >
                  <ArrowsOut size={20} weight="regular" />
                </button>
              </div>

              {/* Thumbnail carousel */}
              {galleryImages.length > 1 && (
                <div className="publication-detail__thumbnails">
                  {galleryImages.map((image, index) => (
                    <button
                      key={index}
                      className={`publication-detail__thumb ${index === currentImageIndex ? 'publication-detail__thumb--selected' : ''}`}
                      onClick={() => handleThumbnailClick(index)}
                      aria-label={`View image ${index + 1}`}
                    >
                      <img src={image || publication.image} alt={`Thumbnail ${index + 1}`} />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen overlay */}
      {isFullscreen && (
        <div className="publication-detail__fullscreen-overlay" onClick={handleCloseFullscreen}>
          <button
            className="publication-detail__fullscreen-close"
            onClick={handleCloseFullscreen}
            aria-label="Close fullscreen"
          >
            <X size={24} weight="bold" />
          </button>
          <img
            src={currentImage}
            alt={`${publication.title} - Fullscreen`}
            className="publication-detail__fullscreen-image"
            onClick={(e) => e.stopPropagation()}
          />
          {galleryImages.length > 1 && (
            <>
              <button
                className="publication-detail__fullscreen-nav publication-detail__fullscreen-nav--prev"
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrevious();
                }}
                aria-label="Previous image"
              >
                <CaretLeft size={32} weight="bold" />
              </button>
              <button
                className="publication-detail__fullscreen-nav publication-detail__fullscreen-nav--next"
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                aria-label="Next image"
              >
                <CaretRight size={32} weight="bold" />
              </button>
            </>
          )}
        </div>
      )}
    </>
  );
};

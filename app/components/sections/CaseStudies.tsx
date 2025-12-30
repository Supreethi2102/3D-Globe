import React, { useState } from 'react';
import { 
  SelectionAll, 
  PaintBrush, 
  Megaphone, 
  Package, 
  Ruler,
  ArrowsClockwise,
  PuzzlePiece,
  Target,
  ChartLineUp,
  SpeakerHigh,
  Folders,
  IconWeight,
  Icon
} from '@phosphor-icons/react';
import './CaseStudies.css';

// Category data - UX uses custom SVG from Figma, others use Phosphor
type CategoryType = {
  id: string;
  label: string;
  Icon?: Icon;
  svgPath?: string;
};

const categories: CategoryType[] = [
  { id: 'all', label: 'All', Icon: SelectionAll },
  { id: 'branding', label: 'Branding', Icon: PaintBrush },
  { id: 'campaigns', label: 'Campaigns', Icon: Megaphone },
  { id: 'packaging', label: 'Packaging', Icon: Package },
  { id: 'ui', label: 'UI', Icon: Ruler },
  { id: 'ux', label: 'UX', svgPath: '/icons/user-pencil.svg' },
];

// Case study data with actual images from public folder
const caseStudies = [
  {
    id: 1,
    title: 'What if your banking app knew how to smile?',
    subtitle: 'Palmy bank | UI',
    description: `Palmy is a fictional challenger bank I created to reimagine what trust, clarity and playfulness could feel like in everyday banking. It's designed for those too often excluded, including Pacific peoples, Māori and women. A warm, human-centred experience. Welcoming. Maybe even smile-worthy.`,
    duration: '7 months',
    category: 'ui',
    image: '/misc/47acc09551b581ea0204690ee9c9bf854e3a5309.png',
  },
  {
    id: 2,
    title: 'What if your banking app knew how to smile?',
    subtitle: 'Palmy bank | UI',
    description: `Palmy is a fictional challenger bank I created to reimagine what trust, clarity and playfulness could feel like in everyday banking. It's designed for those too often excluded, including Pacific peoples, Māori and women. A warm, human-centred experience. Welcoming. Maybe even smile-worthy.`,
    duration: '7 months',
    category: 'ui',
    image: '/misc/eb063b7647d2bb7897c12e3ac9acb89080d8a3d6.png',
  },
  {
    id: 3,
    title: 'What if your banking app knew how to smile?',
    subtitle: 'Palmy bank | UI',
    description: `Palmy is a fictional challenger bank I created to reimagine what trust, clarity and playfulness could feel like in everyday banking. It's designed for those too often excluded, including Pacific peoples, Māori and women. A warm, human-centred experience. Welcoming. Maybe even smile-worthy.`,
    duration: '7 months',
    category: 'ui',
    image: '/misc/junior-VRjbcJSINVc-unsplash-1.png',
  },
];

interface CaseStudyCardProps {
  study: typeof caseStudies[0];
}

const CaseStudyCard: React.FC<CaseStudyCardProps> = ({ study }) => {
  const [activeTab, setActiveTab] = useState('challenge');
  const [hoveredBtn, setHoveredBtn] = useState<string | null>(null);

  return (
    <div className="case-study-card">
      {/* Left Content */}
      <div className="case-study-card__content">
        {/* Sidebar */}
        <div className="case-study-card__sidebar">
          {/* Flip Button */}
          <button 
            className="flip-button"
            onMouseEnter={() => setHoveredBtn('flip')}
            onMouseLeave={() => setHoveredBtn(null)}
          >
            <div className="flip-button__icon">
              <ArrowsClockwise size={24} weight={hoveredBtn === 'flip' ? 'fill' : 'regular'} color="#7150E5" />
            </div>
            <span className="flip-button__text">Flip for inspiration</span>
          </button>

          {/* Tabs */}
          <div className="case-study-card__tabs">
            <button 
              className={`tab ${activeTab === 'challenge' ? 'tab--active' : ''}`}
              onClick={() => setActiveTab('challenge')}
              onMouseEnter={() => setHoveredBtn('challenge')}
              onMouseLeave={() => setHoveredBtn(null)}
            >
              <PuzzlePiece 
                size={24} 
                weight={activeTab === 'challenge' || hoveredBtn === 'challenge' ? 'fill' : 'regular'} 
                color={activeTab === 'challenge' ? '#111213' : '#3c3f43'} 
              />
              <span>Challenge</span>
            </button>
            <button 
              className={`tab ${activeTab === 'focus' ? 'tab--active' : ''}`}
              onClick={() => setActiveTab('focus')}
              onMouseEnter={() => setHoveredBtn('focus')}
              onMouseLeave={() => setHoveredBtn(null)}
            >
              <Target 
                size={24} 
                weight={activeTab === 'focus' || hoveredBtn === 'focus' ? 'fill' : 'regular'} 
                color={activeTab === 'focus' ? '#111213' : '#3c3f43'} 
              />
              <span>Focus</span>
            </button>
            <button 
              className={`tab ${activeTab === 'impact' ? 'tab--active' : ''}`}
              onClick={() => setActiveTab('impact')}
              onMouseEnter={() => setHoveredBtn('impact')}
              onMouseLeave={() => setHoveredBtn(null)}
            >
              <ChartLineUp 
                size={24} 
                weight={activeTab === 'impact' || hoveredBtn === 'impact' ? 'fill' : 'regular'} 
                color={activeTab === 'impact' ? '#111213' : '#3c3f43'} 
              />
              <span>Impact</span>
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="case-study-card__main">
          <p className="case-study-card__subtitle">{study.subtitle}</p>
          <h3 className="case-study-card__title">{study.title}</h3>
          <p className="case-study-card__description">{study.description}</p>
          <button 
            className="view-design-btn"
            onMouseEnter={() => setHoveredBtn('viewDesign')}
            onMouseLeave={() => setHoveredBtn(null)}
          >
            <Ruler size={24} weight={hoveredBtn === 'viewDesign' ? 'fill' : 'regular'} color="#fbfbfb" />
            <span>View the design</span>
          </button>
        </div>
      </div>

      {/* Right Image */}
      <div className="case-study-card__image">
        <div className="case-study-card__duration">
          Duration: {study.duration}
        </div>
        <div 
          className="case-study-card__image-bg"
          style={{ backgroundImage: `url(${study.image})` }}
        />
        <button 
          className="listen-button"
          onMouseEnter={() => setHoveredBtn('listen')}
          onMouseLeave={() => setHoveredBtn(null)}
        >
          <div className="listen-button__icon">
            <SpeakerHigh size={24} weight={hoveredBtn === 'listen' ? 'fill' : 'regular'} color="#7150E5" />
          </div>
          <div className="listen-button__divider"></div>
          <span className="listen-button__text">Listen</span>
        </button>
      </div>
    </div>
  );
};

export const CaseStudies: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [hoveredViewAll, setHoveredViewAll] = useState(false);

  const filteredStudies = activeCategory === 'all' 
    ? caseStudies 
    : caseStudies.filter(s => s.category === activeCategory);

  const getIconWeight = (catId: string): IconWeight => {
    if (activeCategory === catId || hoveredCategory === catId) return 'fill';
    return 'regular';
  };

  return (
    <section className="case-studies" id="work">
      {/* Header */}
      <div className="case-studies__header">
        <h2 className="case-studies__title">
          Case studies <span className="case-studies__subtitle">Browse by design category</span>
        </h2>
      </div>

      {/* Category Filter */}
      <div className="case-studies__filter">
        {categories.map(cat => (
          <button
            key={cat.id}
            className={`category-pill ${activeCategory === cat.id ? 'category-pill--active' : ''}`}
            onClick={() => setActiveCategory(cat.id)}
            onMouseEnter={() => setHoveredCategory(cat.id)}
            onMouseLeave={() => setHoveredCategory(null)}
          >
            <div className="category-pill__icon">
              {cat.Icon ? (
                <cat.Icon size={24} weight={getIconWeight(cat.id)} color="#7150E5" />
              ) : cat.svgPath ? (
                <img src={cat.svgPath} alt="" />
              ) : null}
            </div>
            <span className="category-pill__label">{cat.label}</span>
          </button>
        ))}
      </div>

      {/* Case Study Cards */}
      <div className="case-studies__grid">
        {filteredStudies.map(study => (
          <CaseStudyCard key={study.id} study={study} />
        ))}
      </div>

      {/* View All Button */}
      <div className="case-studies__footer">
        <button 
          className={`view-all-btn ${hoveredViewAll ? 'view-all-btn--hovered' : ''}`}
          onMouseEnter={() => setHoveredViewAll(true)}
          onMouseLeave={() => setHoveredViewAll(false)}
        >
          <Folders size={24} weight={hoveredViewAll ? 'fill' : 'regular'} color={hoveredViewAll ? '#ffffff' : '#7150E5'} />
          <span>View all cases</span>
        </button>
      </div>
    </section>
  );
};

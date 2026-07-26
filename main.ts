import './examples/style.css';
import './app/globe-markers.css';
import './app/main.tsx';

import type {LayerProps, MarkerProps} from './src';
import {RenderMode, WebGlGlobe} from './src';
import {
  GLOBE_MARKERS,
  buildGlobeMarkerHtml,
  canUseGlobeHover,
  focusCaseStudyCard,
} from './app/data/globeMarkers';

const distance = 20_000_000;
const AUTO_SPIN_SPEED = 1;

// Equirectangular PNG (from public/illustration-global-inspiration-globe 2.svg)
// Cache-bust when the texture file is replaced (browser/CDN may keep the old PNG).
const customImageUrl = encodeURI('/Images/Illustrations 2/illustration-global-inspiration-map.png') + '?v=3';

const globeEl = document.querySelector('#globe')! as HTMLElement;

const globe = new WebGlGlobe(globeEl, {
  renderMode: RenderMode.GLOBE,
  layers: [
    {
      id: 'basemap',
      type: 'image',
      urlParameters: {},
      zIndex: 0,
      minZoom: 1,
      maxZoom: 4,
      debug: false,
      getUrl: () => customImageUrl
    } as LayerProps
  ],
  // Start facing New Zealand; lat raised so Antarctica stays out of frame
  cameraView: {lng: 131, lat: 18, altitude: distance, isAnimated: false}
});

function resizeGlobeIfVisible() {
  const {width, height} = globeEl.getBoundingClientRect();
  if (width <= 0 || height <= 0) return;
  try {
    globe.resize();
  } catch (e) {
    console.warn('Globe resize error:', e);
  }
}

window.__portfolioGlobeResize = resizeGlobeIfVisible;

// Notify WebGL globe when container dimensions change (e.g. responsive resize or move into hero)
const resizeObserver = new ResizeObserver(() => {
  resizeGlobeIfVisible();
});
resizeObserver.observe(globeEl);

function getMarkerRoot(id: string): HTMLElement | null {
  return globeEl.querySelector(`.globe-marker[data-marker-id="${id}"]`);
}

/**
 * Place the card where it fits: pins in the upper part of the globe open
 * downward (caret on top); pins near the bottom open upward (caret below).
 */
function applyTooltipPlacement(markerRoot: HTMLElement) {
  const globeRect = globeEl.getBoundingClientRect();
  if (globeRect.height <= 0) return;

  const pinRect = markerRoot.getBoundingClientRect();
  const pinCenterY = pinRect.top + pinRect.height / 2;
  const relativeY = (pinCenterY - globeRect.top) / globeRect.height;

  // Upper ~58% of the sphere → tooltip below pin (Figma “Up” / caret on top)
  const placeAbove = relativeY > 0.58;

  const tooltip = markerRoot.querySelector('.globe-marker__tooltip');
  const card = markerRoot.querySelector('.globe-marker__card');
  if (!(tooltip instanceof HTMLElement) || !(card instanceof HTMLElement)) return;

  tooltip.classList.toggle('globe-marker__tooltip--above', placeAbove);
  tooltip.classList.toggle('globe-marker__tooltip--below', !placeAbove);
  card.classList.toggle('globe-marker__card--above', placeAbove);
  card.classList.toggle('globe-marker__card--below', !placeAbove);
}

function closeAllTooltips() {
  globeEl.querySelectorAll('.globe-marker.is-open').forEach(el => {
    el.classList.remove('is-open');
    const pin = el.querySelector('.globe-marker__pin');
    pin?.setAttribute('aria-expanded', 'false');
  });
  globe.startAutoSpin(AUTO_SPIN_SPEED);
}

function openTooltip(markerRoot: HTMLElement) {
  if (markerRoot.classList.contains('is-open')) {
    if (!canUseGlobeHover()) {
      // Touch toggle: second tap on the same pin closes
      closeAllTooltips();
    }
    return;
  }
  closeAllTooltips();
  applyTooltipPlacement(markerRoot);
  markerRoot.classList.add('is-open');
  markerRoot.querySelector('.globe-marker__pin')?.setAttribute('aria-expanded', 'true');
  globe.stopAutoSpin();
}

const markerProps: MarkerProps[] = GLOBE_MARKERS.map(marker => ({
  id: marker.id,
  html: buildGlobeMarkerHtml(marker),
  lng: marker.lng,
  lat: marker.lat,
  onClick: id => {
    // Desktop uses hover; pin click is for mobile/tablet (and keyboard)
    if (canUseGlobeHover()) return;
    const root = getMarkerRoot(id);
    if (!root) return;
    openTooltip(root);
  },
  onCardClick: caseStudyId => {
    closeAllTooltips();
    focusCaseStudyCard(caseStudyId);
  },
}));

globe.setProps({markers: markerProps});
globe.setControlsInteractionEnabled(true);
globe.startAutoSpin(AUTO_SPIN_SPEED);
globe.setZoomEnabled(false);

// Desktop: show tooltip while hovering the pin or its tooltip card
globeEl.addEventListener('mouseover', ev => {
  if (!canUseGlobeHover()) return;
  const marker = (ev.target as Element | null)?.closest?.('.globe-marker');
  if (!(marker instanceof HTMLElement)) return;
  const related = ev.relatedTarget as Node | null;
  if (related && marker.contains(related)) return;
  openTooltip(marker);
});

globeEl.addEventListener('mouseout', ev => {
  if (!canUseGlobeHover()) return;
  const marker = (ev.target as Element | null)?.closest?.('.globe-marker');
  if (!(marker instanceof HTMLElement)) return;
  const related = ev.relatedTarget as Node | null;
  if (related && marker.contains(related)) return;
  if (marker.classList.contains('is-open')) {
    closeAllTooltips();
  }
});

// Mobile/tablet: tap outside a marker to dismiss
document.addEventListener(
  'pointerdown',
  ev => {
    if (canUseGlobeHover()) return;
    const target = ev.target as Element | null;
    if (target?.closest?.('.globe-marker')) return;
    if (!globeEl.querySelector('.globe-marker.is-open')) return;
    closeAllTooltips();
  },
  true,
);

// Debug: Listen for layer loading state changes
globe.addEventListener('layerLoadingStateChanged', (ev: any) => {
  console.log('Layer loading state:', ev.detail.layer.id, ev.detail.state);
  if (ev.detail.state === 'error') {
    console.error('Layer failed to load:', ev.detail.layer.id);
  }
});

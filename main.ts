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
const TOOLTIP_CLOSE_DELAY_MS = 120;

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

type TooltipHome = {parent: HTMLElement; nextSibling: ChildNode | null};
const tooltipHomes = new WeakMap<HTMLElement, TooltipHome>();

let closeTimer = 0;

function cancelScheduledClose() {
  window.clearTimeout(closeTimer);
  closeTimer = 0;
}

function scheduleClose() {
  cancelScheduledClose();
  closeTimer = window.setTimeout(() => {
    closeTimer = 0;
    closeAllTooltips();
  }, TOOLTIP_CLOSE_DELAY_MS);
}

function getTooltipScale(markerRoot: HTMLElement): number {
  const raw = getComputedStyle(markerRoot).getPropertyValue('--globe-tooltip-scale').trim();
  const value = Number.parseFloat(raw);
  return Number.isFinite(value) ? value : 0.88;
}

/** Fixed once to the viewport so the card stacks above .main__globe-ring — no per-frame follow. */
function positionPortaledTooltip(markerRoot: HTMLElement, tooltip: HTMLElement) {
  const pin = markerRoot.querySelector('.globe-marker__pin');
  if (!(pin instanceof HTMLElement)) return;

  const pinRect = pin.getBoundingClientRect();
  const placeAbove = tooltip.classList.contains('globe-marker__tooltip--above');
  const scale = getTooltipScale(markerRoot);
  const overlap = 14;

  // Round to whole pixels to avoid sub-pixel jitter
  const centerX = Math.round(pinRect.left + pinRect.width / 2);
  const topEdge = Math.round(pinRect.top);
  const bottomEdge = Math.round(pinRect.bottom);

  tooltip.style.position = 'fixed';
  tooltip.style.left = `${centerX}px`;
  tooltip.style.right = 'auto';
  tooltip.style.zIndex = '10000';
  tooltip.style.margin = '0';
  tooltip.style.opacity = '1';
  tooltip.style.visibility = 'visible';
  tooltip.style.pointerEvents = 'auto';
  tooltip.style.transition = 'none';
  tooltip.style.transform = `translateX(-50%) scale(${scale})`;
  tooltip.style.transformOrigin = placeAbove ? '50% 100%' : '50% 0%';

  if (placeAbove) {
    tooltip.style.top = 'auto';
    tooltip.style.bottom = `${window.innerHeight - topEdge - overlap}px`;
  } else {
    tooltip.style.bottom = 'auto';
    tooltip.style.top = `${bottomEdge - overlap}px`;
  }
}

function clearPortaledTooltipStyles(tooltip: HTMLElement) {
  tooltip.style.position = '';
  tooltip.style.left = '';
  tooltip.style.right = '';
  tooltip.style.top = '';
  tooltip.style.bottom = '';
  tooltip.style.zIndex = '';
  tooltip.style.margin = '';
  tooltip.style.opacity = '';
  tooltip.style.visibility = '';
  tooltip.style.pointerEvents = '';
  tooltip.style.transition = '';
  tooltip.style.transform = '';
  tooltip.style.transformOrigin = '';
}

function portalTooltip(markerRoot: HTMLElement) {
  const tooltip = markerRoot.querySelector('.globe-marker__tooltip');
  if (!(tooltip instanceof HTMLElement)) return null;
  if (tooltip.parentElement !== document.body) {
    tooltipHomes.set(tooltip, {parent: markerRoot, nextSibling: tooltip.nextSibling});
    tooltip.dataset.markerId = markerRoot.dataset.markerId ?? '';
    tooltip.classList.add('globe-marker__tooltip--portaled');
    document.body.appendChild(tooltip);
  }
  positionPortaledTooltip(markerRoot, tooltip);
  return tooltip;
}

function restorePortaledTooltip(tooltip: HTMLElement) {
  const home = tooltipHomes.get(tooltip);
  clearPortaledTooltipStyles(tooltip);
  tooltip.classList.remove('globe-marker__tooltip--portaled');
  delete tooltip.dataset.markerId;
  if (home?.parent.isConnected) {
    home.parent.insertBefore(tooltip, home.nextSibling);
  }
  tooltipHomes.delete(tooltip);
}

function isRelatedToOpenMarker(related: EventTarget | null, marker: HTMLElement): boolean {
  if (!(related instanceof Node)) return false;
  if (marker.contains(related)) return true;
  const tip = document.querySelector(
    `.globe-marker__tooltip--portaled[data-marker-id="${marker.dataset.markerId}"]`,
  );
  return Boolean(tip?.contains(related));
}

function dismissOpenTooltips() {
  cancelScheduledClose();
  document.querySelectorAll('.globe-marker__tooltip--portaled').forEach(el => {
    if (el instanceof HTMLElement) restorePortaledTooltip(el);
  });
  globeEl.querySelectorAll('.globe-marker.is-open').forEach(el => {
    el.classList.remove('is-open');
    const pin = el.querySelector('.globe-marker__pin');
    pin?.setAttribute('aria-expanded', 'false');
  });
}

function closeAllTooltips() {
  dismissOpenTooltips();
  globe.startAutoSpin(AUTO_SPIN_SPEED);
}

function openTooltip(markerRoot: HTMLElement) {
  cancelScheduledClose();
  if (markerRoot.classList.contains('is-open')) {
    if (!canUseGlobeHover()) {
      // Touch toggle: second tap on the same pin closes
      closeAllTooltips();
    }
    return;
  }
  dismissOpenTooltips();
  // Stop spin first so the pin is still when we lock tooltip position
  globe.stopAutoSpin();
  applyTooltipPlacement(markerRoot);
  markerRoot.classList.add('is-open');
  markerRoot.querySelector('.globe-marker__pin')?.setAttribute('aria-expanded', 'true');
  portalTooltip(markerRoot);
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

// Desktop: same hover open/close as before, with a short bridge so pin → portaled card works
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
  if (!marker.classList.contains('is-open')) return;
  if (isRelatedToOpenMarker(ev.relatedTarget, marker)) {
    cancelScheduledClose();
    return;
  }
  scheduleClose();
});

document.addEventListener('mouseover', ev => {
  if (!canUseGlobeHover()) return;
  const tip = (ev.target as Element | null)?.closest?.('.globe-marker__tooltip--portaled');
  if (!(tip instanceof HTMLElement)) return;
  cancelScheduledClose();
  const id = tip.dataset.markerId;
  if (!id) return;
  const marker = getMarkerRoot(id);
  if (marker && !marker.classList.contains('is-open')) {
    openTooltip(marker);
  }
});

document.addEventListener('mouseout', ev => {
  if (!canUseGlobeHover()) return;
  const tip = (ev.target as Element | null)?.closest?.('.globe-marker__tooltip--portaled');
  if (!(tip instanceof HTMLElement)) return;
  const id = tip.dataset.markerId;
  if (!id) return;
  const marker = getMarkerRoot(id);
  if (!marker?.classList.contains('is-open')) return;
  if (isRelatedToOpenMarker(ev.relatedTarget, marker)) {
    cancelScheduledClose();
    return;
  }
  scheduleClose();
});

// Portaled cards sit outside MarkerHtml's click target — handle CTA here
document.addEventListener('click', ev => {
  const card = (ev.target as Element | null)?.closest?.(
    '.globe-marker__tooltip--portaled [data-scroll-case-study]',
  );
  if (!(card instanceof HTMLElement)) return;
  const caseStudyId = Number(card.getAttribute('data-scroll-case-study'));
  if (Number.isNaN(caseStudyId)) return;
  closeAllTooltips();
  focusCaseStudyCard(caseStudyId);
});

// Mobile/tablet: tap outside a marker to dismiss
document.addEventListener(
  'pointerdown',
  ev => {
    if (canUseGlobeHover()) return;
    const target = ev.target as Element | null;
    if (target?.closest?.('.globe-marker')) return;
    if (target?.closest?.('.globe-marker__tooltip--portaled')) return;
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

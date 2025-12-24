import './examples/style.css';
import './app/main.tsx';

import type {LayerProps, MarkerProps} from './src';
import {RenderMode, WebGlGlobe} from './src';

const distance = 20_000_000;

// Use a single PNG image for the globe
// Place your flat map image in the public directory and update the filename below
const customImageUrl = '/world-map-outline.png'; // Update this to match your image filename

const globe = new WebGlGlobe(document.querySelector('#globe')!, {
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
  cameraView: {lng: 155, lat: -10, altitude: distance, isAnimated: false}
});

// Simple pin icon without text - sized for resized globe
// Three concentric circles scaled to 40x40
const pinIconHtml = `
  <div class="myMarker" style="width: 40px; height: 40px; margin: -20px;">
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Third circle (outermost): 10% opacity -->
      <circle cx="20" cy="20" r="16" fill="#7150E5" fill-opacity="0.1"/>
      <!-- Second circle (middle): 20% opacity -->
      <circle cx="20" cy="20" r="10" fill="#7150E5" fill-opacity="0.2"/>
      <!-- Main center circle: 100% opacity -->
      <circle cx="20" cy="20" r="3.5" fill="#7150E5"/>
    </svg>
  </div>`;

const markerProps: MarkerProps[] = [
  // New Zealand area
  {id: 'newzealand', html: pinIconHtml, lng: 174.76, lat: -41.29},
  // Jaipur, India
  {id: 'jaipur', html: pinIconHtml, lng: 75.79, lat: 26.92},
  // Random markers spread across the globe
  {id: 'paris', html: pinIconHtml, lng: 2.35, lat: 48.86},
  {id: 'tokyo', html: pinIconHtml, lng: 139.69, lat: 35.69},
  {id: 'capetown', html: pinIconHtml, lng: 18.42, lat: -33.93},
  {id: 'vancouver', html: pinIconHtml, lng: -123.12, lat: 49.28},
  {id: 'rio', html: pinIconHtml, lng: -43.21, lat: -22.91},
  {id: 'sydney', html: pinIconHtml, lng: 151.21, lat: -33.87}
];

markerProps.forEach(m => {
  m.onClick = id => console.log('clicked:', id);
});

globe.setProps({markers: markerProps});
globe.setControlsInteractionEnabled(true);
globe.startAutoSpin(1);
globe.setZoomEnabled(false);

// Debug: Listen for layer loading state changes
globe.addEventListener('layerLoadingStateChanged', (ev: any) => {
  console.log('Layer loading state:', ev.detail.layer.id, ev.detail.state);
  if (ev.detail.state === 'error') {
    console.error('Layer failed to load:', ev.detail.layer.id);
  }
});


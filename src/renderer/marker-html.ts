import {Vector3} from 'three';
import {latLngAltitudeToGlobePosition} from './lib/convert-spaces';
import {Renderer} from './renderer';
import {RenderMode} from './types/renderer';

import type {MarkerProps} from './types/marker';

const v3 = new Vector3();

export class MarkerHtml {
  readonly id: string;

  private readonly renderer: Renderer;
  private readonly markerEl: HTMLDivElement;
  private props: MarkerProps;
  private rafId: number = 0;

  private globePosition: Vector3 = new Vector3();
  private mapPosition: Vector3 = new Vector3();
  private pendingPointerTarget: EventTarget | null = null;

  constructor(renderer: Renderer, props: MarkerProps) {
    this.id = props.id;
    this.props = props;
    this.renderer = renderer;

    this.markerEl = document.createElement('div');
    this.markerEl.style.cssText = `
      position: absolute;
      top: 0; left: 0;
      will-change: transform;
    `;
    renderer.container.appendChild(this.markerEl);

    this.markerEl.addEventListener('pointerdown', ev => {
      this.pendingPointerTarget = ev.target;
      this.markerEl.setPointerCapture(ev.pointerId);
      this.markerEl.addEventListener('pointerup', () => this.handleMarkerClick(), {once: true});

      // need to stop propagation here, otherwise the OrbitControls will
      // pick up the event and prevent any other event from coming through
      // via setPointerCapture().
      ev.stopPropagation();
    });

    this.setProps(this.props);

    this.rafId = requestAnimationFrame(this.update);
  }

  private update = () => {
    this.rafId = requestAnimationFrame(this.update);
    this.updatePosition();
  };

  updatePosition() {
    const camera = this.renderer.getCamera();
    const renderMode = this.renderer.getRenderMode();
    const {width, height} = this.renderer.getRendererSize();

    let occluded = false;
    if (renderMode === RenderMode.GLOBE) {
      // Hide pins on the far side so they never project onto the wrong continent
      const camDir = camera.position.clone().normalize();
      occluded = this.globePosition.dot(camDir) < 0.35;
      v3.copy(this.globePosition).project(camera);
    } else {
      v3.copy(this.mapPosition).project(camera);
    }

    const left = ((v3.x + 1) / 2) * width;
    const top = (1 - (v3.y + 1) / 2) * height;

    this.markerEl.style.transform = `translate(${left}px, ${top}px)`;
    const isOpen = Boolean(this.markerEl.querySelector('.globe-marker.is-open'));
    if (occluded && !isOpen) {
      this.markerEl.style.visibility = 'hidden';
      this.markerEl.style.opacity = '0';
      this.markerEl.style.pointerEvents = 'none';
      this.markerEl.style.zIndex = '0';
    } else {
      this.markerEl.style.visibility = 'visible';
      this.markerEl.style.opacity = '1';
      this.markerEl.style.pointerEvents = 'auto';
      this.markerEl.style.zIndex = isOpen ? '20' : '2';
    }
  }

  setProps(props: MarkerProps) {
    this.props = {...this.props, ...props};
    this.markerEl.innerHTML = this.props.html;

    let {lat, lng} = this.props;
    // Altitude of 1 meter - markers sit on the globe surface
    latLngAltitudeToGlobePosition({lng, lat, altitude: 1}, this.globePosition);

    this.mapPosition.set(lng / 90, lat / 90, 0);

    this.updatePosition();
  }

  destroy() {
    cancelAnimationFrame(this.rafId);

    this.markerEl.removeEventListener('click', this.handleMarkerClick);
    this.markerEl.remove();
  }

  private handleMarkerClick = () => {
    const target = this.pendingPointerTarget as HTMLElement | null;
    this.pendingPointerTarget = null;

    const card = target?.closest?.('[data-scroll-case-study]') as HTMLElement | null;
    if (card) {
      const caseStudyId = Number(card.getAttribute('data-scroll-case-study'));
      if (!Number.isNaN(caseStudyId)) {
        this.props.onCardClick?.(caseStudyId);
      }
      return;
    }

    this.props.onClick?.(this.id);
  };
}

export interface MarkerProps {
  id: string;
  html: string;
  lng: number;
  lat: number;
  onClick?: (id: string) => void;
  /** Fired when the tooltip card is activated */
  onCardClick?: (caseStudyId: number) => void;
  offset?: [number, number];
}

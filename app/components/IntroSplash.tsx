import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight } from '@phosphor-icons/react';
import {
  DEFAULT_GREETINGS,
  FINALE_EXPAND_MS,
  FINALE_HOLD_MS,
  FINALE_ZOOM_MS,
  GREETING_HOLD_MS,
  GREETING_SLAM_MS,
  INTRO_AUTO_DISMISS_MS,
  INTRO_TAGLINE,
  markIntroSeen,
  type IntroGreeting,
} from '../config/introSplash';
import './IntroSplash.css';

interface IntroSplashProps {
  onComplete: () => void;
}

type LayerState = 'in' | 'out' | 'finale';

type Layer = {
  id: number;
  greeting: IntroGreeting;
  state: LayerState;
};

function prefersReducedMotion(): boolean {
  return typeof window !== 'undefined'
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export const IntroSplash: React.FC<IntroSplashProps> = ({ onComplete }) => {
  const greetings = DEFAULT_GREETINGS;
  const lastIndex = greetings.length - 1;
  const reduceMotion = prefersReducedMotion();
  const [layers, setLayers] = useState<Layer[]>(() => [
    {
      id: 0,
      greeting: greetings[reduceMotion ? lastIndex : 0],
      state: reduceMotion ? 'finale' : 'in',
    },
  ]);
  const [taglineOn, setTaglineOn] = useState(reduceMotion);
  const [expanding, setExpanding] = useState(false);
  const completedRef = useRef(false);
  const expandingRef = useRef(false);
  const timersRef = useRef<number[]>([]);
  const layerIdRef = useRef(0);

  const clearTimers = () => {
    timersRef.current.forEach((id) => window.clearTimeout(id));
    timersRef.current = [];
  };

  const queue = (fn: () => void, ms: number) => {
    const id = window.setTimeout(fn, ms);
    timersRef.current.push(id);
  };

  const beginExpandReveal = () => {
    if (completedRef.current || expandingRef.current) return;
    expandingRef.current = true;
    clearTimers();
    setTaglineOn(true);
    setExpanding(true);
    markIntroSeen();
    queue(() => {
      if (completedRef.current) return;
      completedRef.current = true;
      onComplete();
    }, reduceMotion ? 400 : FINALE_EXPAND_MS);
  };

  useEffect(() => {
    document.body.classList.add('intro-splash-open');
    return () => {
      document.body.classList.remove('intro-splash-open');
      clearTimers();
    };
  }, []);

  useEffect(() => {
    if (reduceMotion) {
      setTaglineOn(true);
      queue(beginExpandReveal, 2400);
      return clearTimers;
    }

    let cancelled = false;
    let i = 0;

    const showNext = () => {
      if (cancelled || completedRef.current || expandingRef.current) return;
      if (i >= lastIndex) return;

      queue(() => {
        if (cancelled || completedRef.current || expandingRef.current) return;

        i += 1;
        layerIdRef.current += 1;
        const nextId = layerIdRef.current;
        const nextGreeting = greetings[i];
        const isFinale = i === lastIndex;

        setLayers((prev) => {
          const outgoing = prev
            .filter((layer) => layer.state === 'in' || layer.state === 'finale')
            .map((layer) => ({ ...layer, state: 'out' as const }));
          return [
            ...outgoing,
            {
              id: nextId,
              greeting: nextGreeting,
              state: isFinale ? 'finale' : 'in',
            },
          ];
        });

        if (isFinale) setTaglineOn(true);

        queue(() => {
          if (cancelled || completedRef.current || expandingRef.current) return;
          setLayers((prev) => prev.filter((layer) => layer.id === nextId));
          if (isFinale) {
            queue(() => {
              if (cancelled || completedRef.current) return;
              beginExpandReveal();
            }, FINALE_HOLD_MS);
          } else {
            showNext();
          }
        }, isFinale ? FINALE_ZOOM_MS : GREETING_SLAM_MS);
      }, GREETING_HOLD_MS + GREETING_SLAM_MS * 0.15);
    };

    showNext();
    queue(beginExpandReveal, INTRO_AUTO_DISMISS_MS);

    return () => {
      cancelled = true;
      clearTimers();
    };
  }, [greetings, lastIndex, reduceMotion]);

  return (
    <div
      className={[
        'intro-splash',
        expanding ? 'intro-splash--expanding' : '',
      ].filter(Boolean).join(' ')}
      role="dialog"
      aria-modal="true"
      aria-labelledby="intro-splash-greeting"
      aria-describedby="intro-splash-tagline"
    >
      <div className="intro-splash__logo" aria-hidden="true">
        <img
          src="/about/SJS Illustrator logo.svg"
          alt=""
          className="intro-splash__logo-img"
        />
      </div>

      <div className="intro-splash__stage">
        <div className="intro-splash__greeting-stack" aria-live="polite">
          {layers.map((layer) => (
            <p
              key={layer.id}
              id={layer.state !== 'out' ? 'intro-splash-greeting' : undefined}
              className={`intro-splash__greeting intro-splash__greeting--${layer.state}`}
              lang={layer.greeting.lang}
            >
              {layer.greeting.text}
            </p>
          ))}
        </div>

        <p
          id="intro-splash-tagline"
          className={[
            'intro-splash__tagline',
            taglineOn ? 'intro-splash__tagline--in' : '',
            expanding ? 'intro-splash__tagline--exit' : '',
          ].filter(Boolean).join(' ')}
        >
          {INTRO_TAGLINE}
        </p>
      </div>

      <div className="intro-splash__footer">
        <button type="button" className="intro-splash__cta" onClick={beginExpandReveal}>
          <ArrowRight size={18} weight="bold" aria-hidden="true" />
          <span>Start the journey</span>
        </button>

        <button type="button" className="intro-splash__skip" onClick={beginExpandReveal}>
          Skip intro
        </button>
      </div>
    </div>
  );
};

import React, { useCallback, useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { ArrowsOut, Pause, Play, X } from '@phosphor-icons/react';

type CaseStudyMockupVideoProps = {
  vimeoId: string;
  mockupSrc: string;
  label: string;
};

type VimeoMessage = {
  event?: string;
  method?: string;
  data?: unknown;
};

function buildPlayerSrc(vimeoId: string) {
  const params = new URLSearchParams({
    autoplay: '1',
    loop: '1',
    muted: '1',
    autopause: '0',
    controls: '0',
    title: '0',
    byline: '0',
    portrait: '0',
    dnt: '1',
    transparent: '0',
  });
  return `https://player.vimeo.com/video/${vimeoId}?${params.toString()}`;
}

function postToPlayer(iframe: HTMLIFrameElement | null, method: string, value?: unknown) {
  if (!iframe?.contentWindow) return;
  const message = value === undefined ? { method } : { method, value };
  iframe.contentWindow.postMessage(JSON.stringify(message), 'https://player.vimeo.com');
}

export const CaseStudyMockupVideo: React.FC<CaseStudyMockupVideoProps> = ({
  vimeoId,
  mockupSrc,
  label,
}) => {
  const playerSrc = buildPlayerSrc(vimeoId);
  const titleId = useId();
  const cardIframeRef = useRef<HTMLIFrameElement>(null);
  const expandedIframeRef = useRef<HTMLIFrameElement>(null);
  const isPlayingRef = useRef(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);

  const activeIframe = () => (isExpanded ? expandedIframeRef.current : cardIframeRef.current);

  const bindPlayer = useCallback((iframe: HTMLIFrameElement | null) => {
    if (!iframe) return;
    const ready = () => {
      postToPlayer(iframe, 'addEventListener', 'play');
      postToPlayer(iframe, 'addEventListener', 'pause');
      postToPlayer(iframe, isPlayingRef.current ? 'play' : 'pause');
    };
    iframe.addEventListener('load', ready);
    ready();
    return () => iframe.removeEventListener('load', ready);
  }, []);

  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      if (event.origin !== 'https://player.vimeo.com') return;
      let data: VimeoMessage | null = null;
      try {
        data = typeof event.data === 'string' ? (JSON.parse(event.data) as VimeoMessage) : (event.data as VimeoMessage);
      } catch {
        return;
      }
      if (data?.event === 'play') {
        isPlayingRef.current = true;
        setIsPlaying(true);
      }
      if (data?.event === 'pause') {
        isPlayingRef.current = false;
        setIsPlaying(false);
      }
    };

    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, []);

  useEffect(() => bindPlayer(cardIframeRef.current), [bindPlayer, playerSrc]);

  useEffect(() => {
    if (!isExpanded) return;
    postToPlayer(cardIframeRef.current, 'pause');
    return bindPlayer(expandedIframeRef.current);
  }, [bindPlayer, isExpanded, playerSrc]);

  useEffect(() => {
    if (isExpanded) return;
    postToPlayer(cardIframeRef.current, isPlayingRef.current ? 'play' : 'pause');
  }, [isExpanded]);

  const togglePlayback = useCallback(() => {
    const next = !isPlayingRef.current;
    isPlayingRef.current = next;
    setIsPlaying(next);
    postToPlayer(activeIframe(), next ? 'play' : 'pause');
  }, [isExpanded]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!isExpanded) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsExpanded(false);
      if (event.key === ' ' || event.key === 'k' || event.key === 'K') {
        event.preventDefault();
        togglePlayback();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isExpanded, togglePlayback]);

  const renderScreen = (iframeRef: React.RefObject<HTMLIFrameElement | null>, mode: 'card' | 'expanded') => (
    <div className={`case-study-mockup-video__screen case-study-mockup-video__screen--${mode}`}>
      <iframe
        ref={iframeRef}
        src={playerSrc}
        title={`${label} interface demonstration`}
        allow="autoplay; fullscreen; picture-in-picture"
        loading={mode === 'expanded' ? 'eager' : 'lazy'}
      />
      <div className="case-study-mockup-video__controls">
        <button
          type="button"
          className="case-study-mockup-video__control"
          onClick={togglePlayback}
          aria-label={isPlaying ? `Pause ${label} video` : `Play ${label} video`}
        >
          {isPlaying ? <Pause size={18} weight="fill" aria-hidden="true" /> : <Play size={18} weight="fill" aria-hidden="true" />}
        </button>
        {mode === 'card' ? (
          <button
            type="button"
            className="case-study-mockup-video__control"
            onClick={() => setIsExpanded(true)}
            aria-label={`Expand ${label} mockup`}
          >
            <ArrowsOut size={18} weight="bold" aria-hidden="true" />
          </button>
        ) : null}
      </div>
    </div>
  );

  return (
    <>
      <div className="case-study-mockup-video" aria-label={`${label} mockup video`}>
        <div className="case-study-mockup-video__stage">{renderScreen(cardIframeRef, 'card')}</div>
      </div>

      {isExpanded
        ? createPortal(
            <div
              className="case-study-mockup-video__lightbox"
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
              onClick={() => setIsExpanded(false)}
            >
              <div className="case-study-mockup-video__lightbox-panel" onClick={(event) => event.stopPropagation()}>
                <div className="case-study-mockup-video__lightbox-toolbar">
                  <p id={titleId} className="case-study-mockup-video__lightbox-title">
                    {label}
                  </p>
                  <button
                    type="button"
                    className="case-study-mockup-video__control case-study-mockup-video__control--close"
                    onClick={() => setIsExpanded(false)}
                    aria-label="Close expanded mockup"
                  >
                    <X size={18} weight="bold" aria-hidden="true" />
                  </button>
                </div>
                <div className="case-study-mockup-video__lightbox-stage">
                  <div className="case-study-mockup-video__lightbox-zoom">
                    <img
                      className="case-study-mockup-video__lightbox-mockup"
                      src={mockupSrc}
                      alt=""
                      aria-hidden="true"
                      draggable={false}
                    />
                    {renderScreen(expandedIframeRef, 'expanded')}
                  </div>
                </div>
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  );
};

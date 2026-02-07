import React, { useState, useId, useRef, useEffect } from 'react';
import { PaperPlaneTilt, CheckCircle, WarningCircle } from '@phosphor-icons/react';
import { gsap } from 'gsap';
import { toPng } from 'html-to-image';
import emailjs from '@emailjs/browser';
import { emailjsConfig } from '../../config/emailjs';
import './Contact.css';

// Character limit for message field
const MESSAGE_MAX_LENGTH = 2000;
// Animation testing mode: keep EmailJS OFF until explicitly re-enabled.
const ENABLE_EMAILJS = true;

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSendHovered, setIsSendHovered] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [cardKey, setCardKey] = useState(0); // Track which card is active
  const [activeSlot, setActiveSlot] = useState<0 | 1>(0);
  const [showValidationErrors, setShowValidationErrors] = useState(false);
  
  // Refs for GSAP animations
  const wrapperRef = useRef<HTMLElement>(null);
  const cardARef = useRef<HTMLDivElement>(null);
  const cardBRef = useRef<HTMLDivElement>(null);
  const isAnimatingRef = useRef(false);
  
  // Generate unique IDs for form fields
  const nameId = useId();
  const emailId = useId();
  const messageId = useId();
  const nameErrorId = useId();
  const emailErrorId = useId();
  const messageErrorId = useId();
  const messageCharCountId = useId();
  const statusAnnouncementRef = useRef<HTMLDivElement>(null);

  // Check for reduced motion preference
  const prefersReducedMotion = typeof window !== 'undefined' && 
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Ensure initial state is correct on mount
  useEffect(() => {
    const a = cardARef.current;
    const b = cardBRef.current;
    if (!a || !b) return;

    // Initial: A is active, B is hidden (next)
    gsap.set(a, {
      clearProps: 'all',
      x: 0,
      y: 0,
      opacity: 1,
      scale: 1,
      scaleX: 1,
      scaleY: 1,
      skewX: 0,
      rotateZ: 0,
      filter: 'none',
      boxShadow: 'none',
      zIndex: 1,
    });
    a.style.display = 'block';
    a.style.pointerEvents = '';

    gsap.set(b, {
      clearProps: 'all',
      x: '-100%',
      y: 0,
      opacity: 1,
      scale: 1,
      scaleX: 1,
      scaleY: 1,
      skewX: 0,
      rotateZ: 0,
      filter: 'none',
      boxShadow: 'none',
      zIndex: 2,
    });
    b.style.display = 'none';
  }, []);

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validateField = (name: string, value: string) => {
    switch (name) {
      case 'name':
        return value.trim().length < 2 ? 'Name must be at least 2 characters' : '';
      case 'email':
        return !validateEmail(value) ? 'Please enter a valid email' : '';
      case 'message':
        if (value.trim().length < 10) {
          return 'Message must be at least 10 characters';
        }
        if (value.length > MESSAGE_MAX_LENGTH) {
          return `Message exceeds the maximum length of ${MESSAGE_MAX_LENGTH} characters`;
        }
        return '';
      default:
        return '';
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (showValidationErrors) {
      const error = validateField(name, value);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    // Do NOT show validation errors on blur.
    // Errors should appear only after the user tries to submit.
  };

  // Render contact card content (reusable)
  const renderContactCard = (
    cardFormData: typeof formData,
    cardErrors: typeof errors,
    cardTouched: typeof touched,
    cardIsSubmitting: boolean,
    cardSubmitStatus: typeof submitStatus,
    cardKey: string,
    formDomId: string,
    isActive: boolean
  ) => (
    <div className="contact__card">
      {/* Left Side - Form */}
      <div className="contact__form-side">
        <span className="contact__label">Contact</span>
        <h2 className="contact__title">Say hello from anywhere</h2>
        
        <form 
          id={formDomId}
          className="contact__form" 
          onSubmit={(e) => {
            if (!isActive) {
              e.preventDefault();
              return;
            }
            handleSubmit(e);
          }}
          aria-label="Contact form"
          noValidate
        >
            <div className={`contact__field ${cardErrors.name && cardTouched.name ? 'contact__field--error' : ''}`}>
              <label className="contact__field-label" htmlFor={`${nameId}-${cardKey}`}>
                Name
                <span className="sr-only"> (required)</span>
              </label>
              <input
                type="text"
                id={`${nameId}-${cardKey}`}
                name="name"
                className="contact__input"
                placeholder="e.g. Jane Doe"
                value={cardFormData.name}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={cardIsSubmitting}
                aria-required="true"
                aria-invalid={cardErrors.name && cardTouched.name ? 'true' : 'false'}
                aria-describedby={cardErrors.name && cardTouched.name ? `${nameErrorId}-${cardKey}` : undefined}
                autoComplete="name"
              />
              {cardErrors.name && showValidationErrors && (
                <span id={`${nameErrorId}-${cardKey}`} className="contact__error" role="alert">
                  {cardErrors.name}
                </span>
              )}
            </div>

            <div className={`contact__field ${cardErrors.email && cardTouched.email ? 'contact__field--error' : ''}`}>
              <label className="contact__field-label" htmlFor={`${emailId}-${cardKey}`}>
                Email
                <span className="sr-only"> (required)</span>
              </label>
              <input
                type="email"
                id={`${emailId}-${cardKey}`}
                name="email"
                className="contact__input"
                placeholder="e.g. jane@example.com"
                value={cardFormData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={cardIsSubmitting}
                aria-required="true"
                aria-invalid={cardErrors.email && cardTouched.email ? 'true' : 'false'}
                aria-describedby={cardErrors.email && cardTouched.email ? `${emailErrorId}-${cardKey}` : undefined}
                autoComplete="email"
              />
              {cardErrors.email && showValidationErrors && (
                <span id={`${emailErrorId}-${cardKey}`} className="contact__error" role="alert">
                  {cardErrors.email}
                </span>
              )}
            </div>

            <div className={`contact__field ${cardErrors.message && cardTouched.message ? 'contact__field--error' : ''}`}>
              <label className="contact__field-label" htmlFor={`${messageId}-${cardKey}`}>
                Message
                <span className="sr-only"> (required)</span>
              </label>
              <div className="contact__textarea-wrapper">
                <textarea
                  id={`${messageId}-${cardKey}`}
                  name="message"
                  className="contact__textarea"
                  placeholder="e.g. Hi, I'd like to get in touch about..."
                  value={cardFormData.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  disabled={cardIsSubmitting}
                  maxLength={MESSAGE_MAX_LENGTH}
                  aria-required="true"
                  aria-invalid={cardErrors.message && cardTouched.message ? 'true' : 'false'}
                  aria-describedby={[`${messageCharCountId}-${cardKey}`, cardErrors.message && cardTouched.message ? `${messageErrorId}-${cardKey}` : null].filter(Boolean).join(' ') || undefined}
                />
              </div>
              <div id={`${messageCharCountId}-${cardKey}`} className="contact__char-count-wrapper" aria-live="polite">
                <span
                  className={`contact__char-count ${
                    cardFormData.message.length > MESSAGE_MAX_LENGTH
                      ? 'contact__char-count--error'
                      : cardFormData.message.length > MESSAGE_MAX_LENGTH * 0.9
                        ? 'contact__char-count--warning'
                        : ''
                  }`}
                >
                  {cardFormData.message.length} / {MESSAGE_MAX_LENGTH}
                  {cardFormData.message.length > MESSAGE_MAX_LENGTH && (
                    <span className="contact__char-count-over"> (over limit)</span>
                  )}
                </span>
              </div>
              {cardErrors.message && showValidationErrors && (
                <span id={`${messageErrorId}-${cardKey}`} className="contact__error" role="alert">
                  {cardErrors.message}
                </span>
              )}
            </div>
          </form>
      </div>

      {/* Divider */}
      <div className="contact__divider" aria-hidden="true" />

      {/* Right Side - Postcard */}
      <aside className="contact__postcard-side" aria-label="Postcard decoration">
        <div className="contact__postcard-slot">
          <div className="contact__postcard">
            <div className="contact__stamp-area">
              <img
                src="/about/postage-stamp-textured 2.png"
                alt=""
                className="contact__stamp"
                role="presentation"
              />
            </div>
            <address className="contact__address-area">
              <img
                src="/about/postal address 6.png"
                alt="Contact address: Samantha Smith, 123 Pixel Parade, Design District, Imagination NZ"
                className="contact__address"
              />
            </address>
            <button
              type="submit"
              form={isActive ? formDomId : undefined}
              className={`contact__submit-btn send-message ${cardIsSubmitting ? 'contact__submit-btn--loading' : ''} ${cardSubmitStatus === 'success' ? 'contact__submit-btn--success' : ''}`}
              onMouseEnter={() => setIsSendHovered(true)}
              onMouseLeave={() => setIsSendHovered(false)}
              disabled={!isActive || cardIsSubmitting || isAnimatingRef.current}
              aria-busy={cardIsSubmitting}
              aria-label={
                cardIsSubmitting
                  ? 'Sending message...'
                  : cardSubmitStatus === 'success'
                    ? 'Message sent successfully'
                    : 'Send message'
              }
            >
                {cardIsSubmitting ? (
                  <>
                    <span className="contact__spinner" aria-hidden="true" />
                    <span>Sending...</span>
                  </>
                ) : cardSubmitStatus === 'success' ? (
                  <>
                    <CheckCircle size={24} weight="fill" color="#F6F7F8" aria-hidden="true" />
                    <span>Message sent!</span>
                  </>
                ) : (
                  <>
                    <PaperPlaneTilt size={24} weight={isSendHovered ? 'fill' : 'regular'} color={isSendHovered ? '#F6F7F8' : '#7150E5'} aria-hidden="true" />
                    <span>Send message</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {submitStatus === 'error' && (
            <p className="contact__submit-error" role="alert">
              <WarningCircle size={16} weight="fill" aria-hidden="true" />
              {errorMessage || 'Something went wrong. Please try again.'}
            </p>
          )}
      </aside>
    </div>
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isAnimatingRef.current) return;

    // Validate all fields
    setShowValidationErrors(true);
    const newErrors: Record<string, string> = {};
    Object.entries(formData).forEach(([key, value]) => {
      const error = validateField(key, String(value));
      if (error) newErrors[key] = error;
    });
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setTouched({ name: true, email: true, message: true });
      return;
    }

    if (!emailjsConfig.publicKey || !emailjsConfig.serviceId || !emailjsConfig.templateId) {
      console.error('EmailJS is not configured.');
      setSubmitStatus('error');
      setErrorMessage('Email service is not configured.');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');
    isAnimatingRef.current = true;

    // Disable pointer events on active card
    const active = activeSlot === 0 ? cardARef.current : cardBRef.current;
    if (active) active.style.pointerEvents = 'none';

    try {
      if (ENABLE_EMAILJS) {
        if (emailjsConfig.publicKey && emailjsConfig.publicKey !== 'YOUR_PUBLIC_KEY_HERE') {
          emailjs.init(emailjsConfig.publicKey);
        }

        const templateParams = {
          from_name: formData.name.trim(),
          from_email: formData.email.trim(),
          message: formData.message.trim(),
          date: new Date().toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          }),
        };

        const response = await emailjs.send(
          emailjsConfig.serviceId,
          emailjsConfig.templateId,
          templateParams
        );
        console.log('Email sent successfully:', response);
      }

      setSubmitStatus('success');
      setErrorMessage('');
      
      // Start GSAP animation
      void animateCardTransition();
      
    } catch (error: any) {
      console.error('Failed:', error);
      setSubmitStatus('error');
      setErrorMessage('Something went wrong. Please try again.');
      isAnimatingRef.current = false;
      if (active) active.style.pointerEvents = '';
      
      /*
      setSubmitStatus('error');
      setErrorMessage('Something went wrong. Please try again.');
      isAnimatingRef.current = false;
      // If needed: re-enable pointer events on the active card wrapper here.
      */
    } finally {
      setIsSubmitting(false);
    }
  };

  const animateCardTransition = () => {
    const a = cardARef.current;
    const b = cardBRef.current;
    if (!a || !b) return;

    const active = activeSlot === 0 ? a : b;
    const next = activeSlot === 0 ? b : a;

    // Promote the active card to a viewport-layer element so the "shoot" can
    // fly OUT of the section (not get clipped by `.contact-wrapper` overflow).
    const activeRect = active.getBoundingClientRect();
    active.style.display = 'block';
    active.style.position = 'fixed';
    active.style.top = `${activeRect.top}px`;
    active.style.left = `${activeRect.left}px`;
    active.style.right = 'auto';
    active.style.bottom = 'auto';
    active.style.width = `${activeRect.width}px`;
    active.style.height = `${activeRect.height}px`;
    active.style.margin = '0';
    active.style.maxWidth = 'none';
    active.style.zIndex = '9999';

    // Keep next fully hidden until the "shoot/throw" starts
    next.style.display = 'none';
    gsap.set(next, { x: '-120vw', y: 0, opacity: 1, zIndex: 1, filter: 'none' });
    gsap.set(active, { x: 0, y: 0, opacity: 1, zIndex: 2, filter: 'none' });

    const finalizeSwap = () => {
      // reset old active
      gsap.set(active, {
        clearProps: 'all',
        x: 0,
        y: 0,
        opacity: 1,
        scale: 1,
        scaleX: 1,
        scaleY: 1,
        skewX: 0,
        rotateZ: 0,
        filter: 'none',
        boxShadow: 'none',
        zIndex: 1,
      });
      // Restore positioning back to CSS-controlled state
      active.style.position = '';
      active.style.top = '';
      active.style.left = '';
      active.style.right = '';
      active.style.bottom = '';
      active.style.width = '';
      active.style.height = '';
      active.style.margin = '';
      active.style.maxWidth = '';
      active.style.zIndex = '';
      active.style.filter = '';
      active.style.pointerEvents = '';
      active.style.display = 'none';

      // keep next visible and clean
      gsap.set(next, {
        clearProps: 'filter,boxShadow',
        x: 0,
        y: 0,
        opacity: 1,
        scale: 1,
        scaleX: 1,
        scaleY: 1,
        skewX: 0,
        rotateZ: 0,
        filter: 'none',
        boxShadow: 'none',
        zIndex: 1,
      });
      next.style.display = 'block';
      next.style.pointerEvents = '';
      // No layout reflow: cards stay absolute within `.contact-stage`.
      gsap.set(next, { x: 0, y: 0 });

      // reset form + statuses for a "fresh" card
      setFormData({ name: '', email: '', message: '' });
      setTouched({});
      setErrors({});
      setShowValidationErrors(false);
      setSubmitStatus('idle');
      setErrorMessage('');
      setCardKey((k) => k + 1);

      // promote next to active via state
      setActiveSlot((s) => (s === 0 ? 1 : 0));
      isAnimatingRef.current = false;
    };

    if (prefersReducedMotion) {
      const tl = gsap.timeline({ onComplete: finalizeSwap });
      tl.to(active, { opacity: 0, duration: 0.25, ease: 'power2.out' })
        .set(next, { display: 'block' })
        .fromTo(next, { x: '-20px', opacity: 0 }, { x: 0, opacity: 1, duration: 0.25, ease: 'power2.out' }, '-=0.1');
      return;
    }

    const tl = gsap.timeline({
      defaults: { ease: 'power2.out' },
      onComplete: finalizeSwap,
    });

    /* -------- PAPER FOLD (PINCH EFFECT) -------- */
    tl.to(active, {
      duration: 0.25,
      scaleX: 0.85,
      scaleY: 0.9,
      skewX: -8,
      rotateZ: -6,
      transformOrigin: 'center center',
      boxShadow: '0 10px 18px rgba(0, 0, 0, 0.12), 0 6px 12px rgba(0, 0, 0, 0.08)', // reduced shadow stretch
      force3D: true,
    });

    /* -------- ROCKET SHAPE COMPRESSION -------- */
    tl.to(active, {
      duration: 0.2,
      scaleX: 0.35,
      rotateZ: -18,
      skewX: -18,
      ease: 'power3.in',
      force3D: true,
    });

    /* -------- THROW ROCKET -------- */
    tl.addLabel('throwStart')
    .to(active, {
      duration: 0.7,
      x: '140vw',
      y: '-140vh',
      rotateZ: 35,
      scale: 0.15,
      opacity: 0,
      ease: 'power4.in',
      force3D: true,
      onStart: () => {
        // Add motion blur during rocket throw
        active.style.filter = 'blur(0.6px)';
      },
    }, 'throwStart');

    /* -------- NEW CARD SWIPE IN -------- */
    // Start the swipe-in near the END of the throw so it doesn't appear early.
    // (Throw duration is 0.7s; this delay means swipe begins when the rocket is ~85% done.)
    const swipeDelay = 0.6;
    tl.set(next, { display: 'block' }, `throwStart+=${swipeDelay}`)
      .to(
        next,
        {
          duration: 0.55,
          x: 0,
          y: 0,
          ease: 'power3.out',
          force3D: true,
        },
        `throwStart+=${swipeDelay}` // begin after most of the throw is complete
      );
  };

  return (
    <section 
      ref={wrapperRef}
      className="contact-wrapper" 
      id="contact"
      aria-labelledby="contact-title"
      tabIndex={-1}
    >
      {/* Screen reader announcements */}
      <div 
        ref={statusAnnouncementRef}
        className="sr-only" 
        role="status" 
        aria-live="polite"
        aria-atomic="true"
      >
        {submitStatus === 'success' && 'Message sent successfully!'}
        {submitStatus === 'error' && 'Failed to send message. Please try again.'}
        {isSubmitting && 'Sending message...'}
      </div>

      <div className="contact-stage">
        {/* Active card */}
        <div ref={cardARef} className={`contact-card ${activeSlot === 0 ? 'is-active' : 'is-next'}`}>
          {renderContactCard(
            activeSlot === 0 ? formData : { name: '', email: '', message: '' },
            activeSlot === 0 ? errors : {},
            activeSlot === 0 ? touched : {},
            activeSlot === 0 ? isSubmitting : false,
            activeSlot === 0 ? submitStatus : 'idle',
            `a-${cardKey}`,
            `contact-form-a-${cardKey}`,
            activeSlot === 0
          )}
        </div>

        {/* Next card */}
        <div ref={cardBRef} className={`contact-card ${activeSlot === 1 ? 'is-active' : 'is-next'}`}>
          {renderContactCard(
            activeSlot === 1 ? formData : { name: '', email: '', message: '' },
            activeSlot === 1 ? errors : {},
            activeSlot === 1 ? touched : {},
            activeSlot === 1 ? isSubmitting : false,
            activeSlot === 1 ? submitStatus : 'idle',
            `b-${cardKey}`,
            `contact-form-b-${cardKey}`,
            activeSlot === 1
          )}
        </div>
      </div>
    </section>
  );
};

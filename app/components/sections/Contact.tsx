import React, { useState, useId, useRef, useEffect } from 'react';
import { PaperPlaneTilt, CheckCircle, WarningCircle } from '@phosphor-icons/react';
import emailjs from '@emailjs/browser';
import { emailjsConfig } from '../../config/emailjs';
import './Contact.css';

// Character limit for message field (generous limit)
const MESSAGE_MAX_LENGTH = 2000;

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    country: '',
    message: '',
  });
  const [isSendHovered, setIsSendHovered] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  
  // Generate unique IDs for form fields
  const nameId = useId();
  const emailId = useId();
  const countryId = useId();
  const messageId = useId();
  const nameErrorId = useId();
  const emailErrorId = useId();
  const messageErrorId = useId();
  const statusAnnouncementRef = useRef<HTMLDivElement>(null);

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
    
    // Clear error when user starts typing
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields
    const newErrors: Record<string, string> = {};
    Object.entries(formData).forEach(([key, value]) => {
      const error = validateField(key, value);
      if (error) newErrors[key] = error;
    });
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setTouched({ name: true, email: true, country: true, message: true });
      return;
    }

    // Check if EmailJS is configured
    if (!emailjsConfig.publicKey || !emailjsConfig.serviceId || !emailjsConfig.templateId) {
      console.error('EmailJS is not configured. Please set up your EmailJS credentials.');
      setSubmitStatus('error');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Initialize EmailJS with public key
      emailjs.init(emailjsConfig.publicKey);

      // Prepare template parameters
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        country: formData.country.trim() || 'Somewhere in the world',
        message: formData.message,
        to_email: emailjsConfig.toEmail, // Recipient email: vadadasupreethi@gmail.com
        date: new Date().toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        }),
      };

      // Send email using EmailJS
      const response = await emailjs.send(
        emailjsConfig.serviceId,
        emailjsConfig.templateId,
        templateParams
      );

      // Success
      console.log('Email sent successfully:', response);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', country: '', message: '' });
      setTouched({});
      setErrors({});
      
      // Reset success message after 5 seconds
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } catch (error: any) {
      console.error('Failed to send email:', error);
      console.error('Error details:', {
        status: error?.status,
        text: error?.text,
        message: error?.message,
        config: {
          serviceId: emailjsConfig.serviceId,
          templateId: emailjsConfig.templateId,
          hasPublicKey: !!emailjsConfig.publicKey,
        }
      });
      
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section 
      className="contact" 
      id="contact"
      aria-labelledby="contact-title"
      tabIndex={-1}
    >
      {/* Screen reader announcements for form status */}
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

      <div className="contact__card">
        {/* Left Side - Form */}
        <div className="contact__form-side">
          <span className="contact__label">Contact</span>
          
          <h2 id="contact-title" className="contact__title">Say hello from anywhere</h2>
          
          <form 
            className="contact__form" 
            onSubmit={handleSubmit}
            aria-label="Contact form"
            noValidate
          >
            <div className={`contact__field ${errors.name && touched.name ? 'contact__field--error' : ''}`}>
              <label className="contact__field-label" htmlFor={nameId}>
                Name
                <span className="sr-only"> (required)</span>
              </label>
              <input
                type="text"
                id={nameId}
                name="name"
                className="contact__input"
                placeholder="Enter your name here"
                value={formData.name}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={isSubmitting}
                aria-required="true"
                aria-invalid={errors.name && touched.name ? 'true' : 'false'}
                aria-describedby={errors.name && touched.name ? nameErrorId : undefined}
                autoComplete="name"
              />
              {errors.name && touched.name && (
                <span id={nameErrorId} className="contact__error" role="alert">
                  {errors.name}
                </span>
              )}
            </div>

            <div className={`contact__field ${errors.email && touched.email ? 'contact__field--error' : ''}`}>
              <label className="contact__field-label" htmlFor={emailId}>
                Email
                <span className="sr-only"> (required)</span>
              </label>
              <input
                type="email"
                id={emailId}
                name="email"
                className="contact__input"
                placeholder="Enter your email address"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={isSubmitting}
                aria-required="true"
                aria-invalid={errors.email && touched.email ? 'true' : 'false'}
                aria-describedby={errors.email && touched.email ? emailErrorId : undefined}
                autoComplete="email"
              />
              {errors.email && touched.email && (
                <span id={emailErrorId} className="contact__error" role="alert">
                  {errors.email}
                </span>
              )}
            </div>

            <div className="contact__field">
              <label className="contact__field-label" htmlFor={countryId}>
                Country
                <span className="sr-only"> (optional)</span>
              </label>
              <input
                type="text"
                id={countryId}
                name="country"
                className="contact__input"
                placeholder="Enter your country"
                value={formData.country}
                onChange={handleChange}
                disabled={isSubmitting}
                autoComplete="country-name"
              />
            </div>

            <div className={`contact__field ${errors.message && touched.message ? 'contact__field--error' : ''}`}>
              <label className="contact__field-label" htmlFor={messageId}>
                Message
                <span className="sr-only"> (required)</span>
              </label>
              <div className="contact__textarea-wrapper">
                <textarea
                  id={messageId}
                  name="message"
                  className="contact__textarea"
                  placeholder="Type your message..."
                  value={formData.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  disabled={isSubmitting}
                  maxLength={MESSAGE_MAX_LENGTH}
                  aria-required="true"
                  aria-invalid={errors.message && touched.message ? 'true' : 'false'}
                  aria-describedby={errors.message && touched.message ? messageErrorId : undefined}
                />
                <div className="contact__char-count-wrapper">
                  <span 
                    className={`contact__char-count ${
                      formData.message.length > MESSAGE_MAX_LENGTH 
                        ? 'contact__char-count--error' 
                        : formData.message.length > MESSAGE_MAX_LENGTH * 0.9 
                          ? 'contact__char-count--warning' 
                          : ''
                    }`}
                    aria-live="polite"
                  >
                    {formData.message.length} / {MESSAGE_MAX_LENGTH}
                    {formData.message.length > MESSAGE_MAX_LENGTH && (
                      <span className="contact__char-count-over"> (over limit)</span>
                    )}
                  </span>
                </div>
              </div>
              {errors.message && touched.message && (
                <span id={messageErrorId} className="contact__error" role="alert">
                  {errors.message}
                </span>
              )}
            </div>
          </form>
        </div>

        {/* Divider */}
        <div className="contact__divider" aria-hidden="true" />

        {/* Right Side - Postcard */}
        <aside className="contact__postcard-side" aria-label="Postcard decoration">
          {/* Postage Stamp */}
          <div className="contact__stamp-area">
            <img 
              src="/about/postage-stamp-textured 2.png" 
              alt="" 
              className="contact__stamp"
              role="presentation"
            />
          </div>

          {/* Address */}
          <address className="contact__address-area">
            <img 
              src="/about/postal address 6.png" 
              alt="Contact address: Samantha Smith, 123 Pixel Parade, Design District, Imagination NZ" 
              className="contact__address"
            />
          </address>

          {/* Send Button */}
          <button 
            type="submit" 
            className={`contact__submit-btn ${isSubmitting ? 'contact__submit-btn--loading' : ''} ${submitStatus === 'success' ? 'contact__submit-btn--success' : ''}`}
            onClick={handleSubmit}
            onMouseEnter={() => setIsSendHovered(true)}
            onMouseLeave={() => setIsSendHovered(false)}
            disabled={isSubmitting}
            aria-busy={isSubmitting}
            aria-label={
              isSubmitting 
                ? 'Sending message...' 
                : submitStatus === 'success' 
                  ? 'Message sent successfully' 
                  : 'Send message'
            }
          >
            {isSubmitting ? (
              <>
                <span className="contact__spinner" aria-hidden="true" />
                <span>Sending...</span>
              </>
            ) : submitStatus === 'success' ? (
              <>
                <CheckCircle size={24} weight="fill" color="#F6F7F8" aria-hidden="true" />
                <span>Message sent!</span>
              </>
            ) : (
              <>
                <PaperPlaneTilt size={24} weight={isSendHovered ? 'fill' : 'regular'} color="#F6F7F8" aria-hidden="true" />
                <span>Send message</span>
              </>
            )}
          </button>
          
          {submitStatus === 'error' && (
            <p className="contact__submit-error" role="alert">
              <WarningCircle size={16} weight="fill" aria-hidden="true" />
              Something went wrong. Please try again.
            </p>
          )}
        </aside>
      </div>
    </section>
  );
};


import React, { useState } from 'react';
import { PaperPlaneTilt } from '@phosphor-icons/react';
import './Contact.css';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    country: '',
    message: '',
  });
  const [isSendHovered, setIsSendHovered] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission
  };

  return (
    <section className="contact">
      <div className="contact__card">
        {/* Left Side - Form */}
        <div className="contact__form-side">
          <span className="contact__label">Contact</span>
          
          <h2 className="contact__title">Say hello from anywhere</h2>
          
          <form className="contact__form" onSubmit={handleSubmit}>
            <div className="contact__field">
              <label className="contact__field-label" htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                className="contact__input"
                placeholder="Enter your name here"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div className="contact__field">
              <label className="contact__field-label" htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                className="contact__input"
                placeholder="Enter your email address"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="contact__field">
              <label className="contact__field-label" htmlFor="country">Country</label>
              <input
                type="text"
                id="country"
                name="country"
                className="contact__input"
                placeholder="Enter your country"
                value={formData.country}
                onChange={handleChange}
              />
            </div>

            <div className="contact__field">
              <label className="contact__field-label" htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                className="contact__textarea"
                placeholder="Type your message..."
                value={formData.message}
                onChange={handleChange}
              />
            </div>
          </form>
        </div>

        {/* Divider */}
        <div className="contact__divider" />

        {/* Right Side - Postcard */}
        <div className="contact__postcard-side">
          {/* Postage Stamp */}
          <div className="contact__stamp-area">
            <img 
              src="/postage-stamp-textured 2.png" 
              alt="Postage stamp" 
              className="contact__stamp"
            />
          </div>

          {/* Address */}
          <div className="contact__address-area">
            <img 
              src="/postal address 6.png" 
              alt="Samantha Smith, 123 Pixel Parade, Design District, Imagination NZ" 
              className="contact__address"
            />
          </div>

          {/* Send Button */}
          <button 
            type="submit" 
            className="contact__submit-btn" 
            onClick={handleSubmit}
            onMouseEnter={() => setIsSendHovered(true)}
            onMouseLeave={() => setIsSendHovered(false)}
          >
            <PaperPlaneTilt size={24} weight={isSendHovered ? 'fill' : 'regular'} color="#F6F7F8" />
            <span>Send message</span>
          </button>
        </div>
      </div>
    </section>
  );
};


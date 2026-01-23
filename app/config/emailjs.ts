/**
 * EmailJS Configuration
 * 
 * To set up EmailJS:
 * 1. Go to https://www.emailjs.com/ and create a free account
 * 2. Create an email service (Gmail, Outlook, etc.)
 * 3. Create an email template with variables: {{name}}, {{email}}, {{country}}, {{message}}
 * 4. Get your Public Key, Service ID, and Template ID from the EmailJS dashboard
 * 5. Replace the values below or use environment variables
 */

export const emailjsConfig = {
  // Your EmailJS Public Key (found in Account > API Keys)
  // Replace 'YOUR_PUBLIC_KEY_HERE' with your actual public key from EmailJS dashboard
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY_HERE',
  
  // Your EmailJS Service ID (found in Email Services)
  // Replace 'YOUR_SERVICE_ID_HERE' with your actual service ID (e.g., service_xxxxxxx)
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID_HERE',
  
  // Your EmailJS Template ID (found in Email Templates)
  // Replace 'YOUR_TEMPLATE_ID_HERE' with your actual template ID (e.g., template_xxxxxxx)
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID_HERE',
  
  // Recipient email - all contact form submissions will be sent here
  toEmail: import.meta.env.VITE_EMAILJS_TO_EMAIL || 'vadadasupreethi@gmail.com',
};

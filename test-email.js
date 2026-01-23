/**
 * Test EmailJS Configuration
 * 
 * Run this script to test if your EmailJS setup is working:
 * 
 * 1. Make sure you've added your EmailJS credentials to app/config/emailjs.ts
 * 2. Run: node test-email.js
 * 
 * This will check if your configuration is valid and attempt to send a test email.
 */

import emailjs from '@emailjs/browser';

// Import the config (you may need to adjust the path)
// For testing, you can also set these directly:
const config = {
  publicKey: 'YOUR_PUBLIC_KEY_HERE',
  serviceId: 'YOUR_SERVICE_ID_HERE',
  templateId: 'YOUR_TEMPLATE_ID_HERE',
  toEmail: 'vadadasupreethi@gmail.com',
};

async function testEmail() {
  console.log('🧪 Testing EmailJS Configuration...\n');

  // Check configuration
  if (!config.publicKey || config.publicKey === 'YOUR_PUBLIC_KEY_HERE') {
    console.error('❌ Public Key not configured');
    console.log('   Please add your EmailJS Public Key to app/config/emailjs.ts\n');
    return;
  }

  if (!config.serviceId || config.serviceId === 'YOUR_SERVICE_ID_HERE') {
    console.error('❌ Service ID not configured');
    console.log('   Please add your EmailJS Service ID to app/config/emailjs.ts\n');
    return;
  }

  if (!config.templateId || config.templateId === 'YOUR_TEMPLATE_ID_HERE') {
    console.error('❌ Template ID not configured');
    console.log('   Please add your EmailJS Template ID to app/config/emailjs.ts\n');
    return;
  }

  console.log('✅ Configuration check passed\n');
  console.log('📧 Attempting to send test email...\n');

  try {
    // Initialize EmailJS
    emailjs.init(config.publicKey);

    // Prepare test email
    const templateParams = {
      from_name: 'Test User',
      from_email: 'test@example.com',
      country: 'Test Country',
      message: 'This is a test email to verify EmailJS is working correctly.',
      to_email: config.toEmail,
      date: new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
    };

    // Send email
    const response = await emailjs.send(
      config.serviceId,
      config.templateId,
      templateParams
    );

    console.log('✅ Email sent successfully!');
    console.log('   Response:', response);
    console.log(`\n📬 Check ${config.toEmail} for the test email\n`);
  } catch (error) {
    console.error('❌ Failed to send email:', error);
    console.error('   Error details:', {
      status: error?.status,
      text: error?.text,
      message: error?.message,
    });
    console.log('\n💡 Troubleshooting:');
    console.log('   1. Verify your EmailJS credentials are correct');
    console.log('   2. Check that your Email Service is connected');
    console.log('   3. Verify your Template ID exists');
    console.log('   4. Check the EmailJS dashboard for error details\n');
  }
}

// Note: This script requires the EmailJS credentials to be configured
// For browser-based testing, use the contact form in the app instead
console.log('⚠️  Note: This script is for reference.');
console.log('   To actually test, use the contact form in your browser.\n');
console.log('   The form will send emails when EmailJS is properly configured.\n');

// Uncomment to run (after configuring credentials):
// testEmail();

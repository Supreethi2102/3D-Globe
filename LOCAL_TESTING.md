# Testing Email Functionality on Localhost

Yes! You can absolutely test the email functionality from localhost. EmailJS works entirely client-side, so it will work from your local development server.

## Quick Setup for Local Testing

### Option 1: Direct Configuration (Fastest for Testing)

1. Edit `app/config/emailjs.ts`
2. Replace the empty strings with your EmailJS credentials:

```typescript
export const emailjsConfig = {
  publicKey: 'your_public_key_here',
  serviceId: 'your_service_id_here',
  templateId: 'your_template_id_here',
  toEmail: 'vadadasupreethi@gmail.com',
};
```

3. Start your dev server: `npm start`
4. Navigate to the contact form and test!

### Option 2: Using Environment Variables (Recommended for Production)

1. Create a `.env` file in the root directory:

```env
VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
VITE_EMAILJS_SERVICE_ID=your_service_id_here
VITE_EMAILJS_TEMPLATE_ID=your_template_id_here
VITE_EMAILJS_TO_EMAIL=vadadasupreethi@gmail.com
```

2. Restart your dev server: `npm start`
3. Test the form!

## Getting Your EmailJS Credentials

1. **Sign up/Login** at [https://www.emailjs.com/](https://www.emailjs.com/)
2. **Create Email Service:**
   - Go to Email Services → Add New Service
   - Choose Gmail (or your email provider)
   - Connect your email account
   - Set "To Email" to `vadadasupreethi@gmail.com`
   - Copy the **Service ID**

3. **Create Email Template:**
   - Go to Email Templates → Create New Template
   - Copy the HTML from `app/templates/postcard-email.html`
   - Paste it in the HTML editor
   - Set Subject: `Postcard from {{from_name}}`
   - Copy the **Template ID**

4. **Get Public Key:**
   - Go to Account → General
   - Find your **Public Key** in the API Keys section

## Testing Steps

1. Make sure your dev server is running: `npm start`
2. Open `http://localhost:5173` (or whatever port Vite uses)
3. Navigate to the contact form
4. Fill out the form:
   - Name: Your name
   - Email: Your email
   - Country: (optional)
   - Message: Test message
5. Click "Send message"
6. Check `vadadasupreethi@gmail.com` inbox for the postcard email!

## Troubleshooting

- **"EmailJS is not configured" error**: Make sure you've added your credentials to `emailjs.ts` or `.env` file
- **Email not received**: 
  - Check spam folder
  - Verify your EmailJS service is properly connected
  - Check EmailJS dashboard for any errors
- **CORS errors**: EmailJS handles CORS, but if you see issues, make sure you're using the correct public key

## Important Notes

- EmailJS free tier allows 200 emails/month
- Emails are sent through EmailJS's servers, not from your localhost
- The recipient email (`vadadasupreethi@gmail.com`) is already configured in the code
- You can test as many times as you want during development (within your monthly limit)

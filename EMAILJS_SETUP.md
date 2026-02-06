# EmailJS Setup Guide

This guide will help you set up email functionality for the contact form using EmailJS.

## Step 1: Create an EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account (200 emails/month on free tier)

## Step 2: Create an Email Service

1. In the EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the setup instructions for your provider
5. **Important:** Set the "To Email" field to `vadadasupreethi@gmail.com` (or leave it blank if your service allows dynamic recipients)
6. Note your **Service ID** (you'll need this later)

## Step 3: Create an Email Template (Postcard Style)

1. Go to **Email Templates** in the EmailJS dashboard
2. Click **Create New Template**
3. Set the **Subject** to: `Postcard from {{from_name}}`
4. For the email content, you have two options:

### Option A: Use the Beautiful Postcard HTML Template (Recommended)

1. Open the file `app/templates/postcard-email.html` in this project
2. Copy the entire HTML content
3. In EmailJS, switch to the **HTML** editor (not plain text)
4. Paste the HTML template
5. The template includes:
   - Beautiful postcard-style design with borders and styling
   - Proper formatting for all message content
   - Responsive design that works in email clients
   - Visual elements like decorative lines and stamps

### Option B: Simple Text Template

If you prefer a simple text template, use:

```
Subject: New Contact Form Submission from {{from_name}}

From: {{from_name}} ({{from_email}})
Country: {{country}}
Message:
{{message}}
```

**Note:** The HTML postcard template provides a much better visual experience and matches the aesthetic of your contact form!

5. Note your **Template ID** (you'll need this later)

## Step 4: Get Your Public Key

1. Go to **Account** > **General**
2. Find your **Public Key** in the API Keys section
3. Copy this key

## Step 5: Configure the Application

### Option A: Using Environment Variables (Recommended)

1. Create a `.env` file in the root directory of the project
2. Add the following variables:

```env
VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
VITE_EMAILJS_SERVICE_ID=your_service_id_here
VITE_EMAILJS_TEMPLATE_ID=your_template_id_here
VITE_EMAILJS_TO_EMAIL=vadadasupreethi@gmail.com
```

**Note:** The recipient email is already set to `vadadasupreethi@gmail.com` in the code. You can override it with the environment variable if needed, but it's already configured by default.

3. Replace the placeholder values with your actual EmailJS credentials

### Option B: Direct Configuration

Edit `app/config/emailjs.ts` and replace the empty strings with your credentials:

```typescript
export const emailjsConfig = {
  publicKey: 'your_public_key_here',
  serviceId: 'your_service_id_here',
  templateId: 'your_template_id_here',
  toEmail: 'your_email@example.com',
};
```

## Step 6: Test the Form

1. Start your development server: `npm start`
2. Navigate to the contact form
3. Fill out and submit the form
4. Check your email inbox for the submission

## Troubleshooting

- **"EmailJS is not configured" error**: Make sure all credentials are set in either `.env` or `emailjs.ts`
- **Email not received**: Check your spam folder and verify your EmailJS service is properly connected
- **Template variables not working**: Make sure your template uses the exact variable names: `{{from_name}}`, `{{from_email}}`, `{{message}}`, `{{date}}`
- **Postcard template not displaying correctly**: Make sure you're using the HTML editor in EmailJS (not plain text), and that email clients support HTML (most modern clients do)

## Security Notes

- Never commit your `.env` file to version control
- The `.env` file is already in `.gitignore`
- EmailJS Public Key is safe to expose in frontend code (it's designed for client-side use)
- For production, consider adding rate limiting or additional validation

# Troubleshooting Email Sending Issues

If you're seeing an error when trying to send emails, follow these steps:

## Step 1: Check Browser Console

1. Open your browser's Developer Tools (F12 or Right-click → Inspect)
2. Go to the **Console** tab
3. Try submitting the form again
4. Look for error messages - they will tell you exactly what's wrong

## Step 2: Verify EmailJS Configuration

Make sure you have configured EmailJS credentials. You have two options:

### Option A: Direct Configuration (Quick Test)

Edit `app/config/emailjs.ts`:

```typescript
export const emailjsConfig = {
  publicKey: 'YOUR_PUBLIC_KEY_HERE',  // ← Replace this
  serviceId: 'YOUR_SERVICE_ID_HERE',  // ← Replace this
  templateId: 'YOUR_TEMPLATE_ID_HERE', // ← Replace this
  toEmail: 'vadadasupreethi@gmail.com',
};
```

### Option B: Environment Variables

Create a `.env` file in the root directory:

```env
VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
VITE_EMAILJS_SERVICE_ID=your_service_id_here
VITE_EMAILJS_TEMPLATE_ID=your_template_id_here
VITE_EMAILJS_TO_EMAIL=vadadasupreethi@gmail.com
```

**Important:** After adding credentials, restart your dev server!

## Step 3: Get Your EmailJS Credentials

If you haven't set up EmailJS yet:

1. **Sign up at [emailjs.com](https://www.emailjs.com/)**
   - Free account allows 200 emails/month

2. **Create Email Service:**
   - Go to **Email Services** → **Add New Service**
   - Choose **Gmail** (or your email provider)
   - Connect your Gmail account
   - Set **"To Email"** to: `vadadasupreethi@gmail.com`
   - Copy the **Service ID** (looks like: `service_xxxxxxx`)

3. **Create Email Template:**
   - Go to **Email Templates** → **Create New Template**
   - Click the **HTML** button (not plain text)
   - Open `app/templates/postcard-email.html` in your project
   - Copy the entire HTML content
   - Paste it into the EmailJS template editor
   - Set **Subject** to: `Postcard from {{from_name}}`
   - Copy the **Template ID** (looks like: `template_xxxxxxx`)

4. **Get Public Key:**
   - Go to **Account** → **General**
   - Find **Public Key** in the API Keys section
   - Copy it (looks like: `xxxxxxxxxxxxx`)

## Step 4: Common Error Messages

### "EmailJS is not configured. Missing: Public Key, Service ID, Template ID"
**Solution:** Add your EmailJS credentials to `app/config/emailjs.ts` or `.env` file

### "Authentication failed" or "401 error"
**Solution:** Check that your Public Key is correct

### "Service or template not found" or "404 error"
**Solution:** 
- Verify your Service ID is correct
- Verify your Template ID is correct
- Make sure the template exists in your EmailJS dashboard

### "Invalid email configuration" or "400 error"
**Solution:**
- Check that your Email Service is properly connected
- Verify the "To Email" is set correctly in your Email Service settings

## Step 5: Test Configuration

After adding your credentials:

1. **Restart your dev server:**
   ```bash
   # Stop the server (Ctrl+C)
   npm start
   ```

2. **Open browser console** (F12)

3. **Submit the form** and check:
   - Console for any error messages
   - The error message displayed on the form

## Step 6: Verify Email Service Setup

In EmailJS dashboard:
- Go to **Email Services** → Your service
- Make sure it shows "Connected" or "Active"
- Verify the "To Email" field is set to `vadadasupreethi@gmail.com`

## Still Having Issues?

1. **Check EmailJS Dashboard:**
   - Go to EmailJS dashboard → Activity
   - See if there are any failed attempts with error details

2. **Test with Simple Template:**
   - Try creating a simple text template first to verify the connection works
   - Then switch to the HTML postcard template

3. **Check Network Tab:**
   - Open Developer Tools → Network tab
   - Submit the form
   - Look for requests to `api.emailjs.com`
   - Check if they're successful (status 200) or failing

4. **Verify CORS:**
   - EmailJS handles CORS automatically, but if you see CORS errors, make sure you're using the correct Public Key

## Quick Checklist

- [ ] EmailJS account created
- [ ] Email Service created and connected
- [ ] Email Template created with HTML from `app/templates/postcard-email.html`
- [ ] Public Key copied from Account settings
- [ ] Service ID copied from Email Services
- [ ] Template ID copied from Email Templates
- [ ] Credentials added to `app/config/emailjs.ts` or `.env`
- [ ] Dev server restarted after adding credentials
- [ ] Browser console checked for specific error messages

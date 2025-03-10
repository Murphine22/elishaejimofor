# Email Setup Instructions

This document provides instructions on how to set up email sending functionality for the contact form.

## Environment Variables

The application uses environment variables to securely store email credentials. These are stored in a `.env.local` file which should never be committed to version control.

1. Create a `.env.local` file in the root of your project (if it doesn't exist already)
2. Add the following variables:

```
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM=your-email@gmail.com
```

## Gmail App Password Setup

If you're using Gmail, you'll need to create an "App Password" instead of using your regular Gmail password:

1. Go to your Google Account settings: https://myaccount.google.com/
2. Select "Security" from the left menu
3. Under "Signing in to Google," select "2-Step Verification" (you must have this enabled)
4. At the bottom of the page, select "App passwords"
5. Select "Mail" as the app and "Other" as the device (name it something like "My Website Contact Form")
6. Click "Generate"
7. Google will display a 16-character password - copy this password
8. Paste this password as the value for `EMAIL_PASS` in your `.env.local` file

## Testing Email Functionality

To test if your email setup is working:

1. Make sure your `.env.local` file is properly configured
2. Start your development server: `npm run dev`
3. Fill out and submit the contact form
4. Check your server logs for confirmation of email sending
5. Check your email inbox to verify receipt

## Troubleshooting

If emails are not being sent:

1. Check that your Gmail account has "Less secure app access" enabled or that you're using an App Password
2. Verify that your `.env.local` file contains the correct credentials
3. Check the server logs for any error messages
4. Make sure your Gmail account doesn't have any restrictions that might block automated emails

## Production Deployment

When deploying to production:

1. Make sure to set the environment variables in your hosting platform (Vercel, Netlify, etc.)
2. Never commit your `.env.local` file to version control
3. Consider using a dedicated email service like SendGrid or Mailgun for production environments 
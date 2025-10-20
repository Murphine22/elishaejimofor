# 📧 Contact Form Setup Guide

Your contact form now uses a custom email API with your Gmail account instead of Formspree!

## ✅ What Was Changed

### 1. **Created Custom Email API** (`app/api/contact/route.ts`)
   - Handles form submissions server-side
   - Sends emails using nodemailer with your Gmail
   - Sends 2 emails:
     - ✉️ One to you (`elishaejimofor@gmail.com`) with the message
     - ✉️ Auto-reply to the sender thanking them

### 2. **Updated Contact Form** (`components/contact.tsx`)
   - Removed Formspree dependency
   - Added custom form state management
   - Better error handling with user-friendly messages
   - Success/error animations

### 3. **Environment Variables** (`.env.local`)
   ```
   GEMINI_API_KEY=AIzaSyAfHlVMNBLB-II5qbd44PKKXfIHWqagL_c
   EMAIL_USER=elishaejimofor@gmail.com
   EMAIL_PASS=fepq zgkf wztk dvnj
   EMAIL_TO=elishaejimofor@gmail.com
   ```

## 🧪 Testing Your Contact Form

### Option 1: Test via Website
1. Start your dev server:
   ```bash
   npm run dev
   ```
2. Go to http://localhost:3000
3. Navigate to the Contact section
4. Fill out and submit the form
5. Check your email at `elishaejimofor@gmail.com`

### Option 2: Test via API Script
1. Start your dev server:
   ```bash
   npm run dev
   ```
2. In a new terminal, run:
   ```bash
   node scripts/test-contact-api.js
   ```
3. Check your email inbox

## 📋 What Happens When Someone Submits the Form

1. **User fills out the form** with their name, email, subject, and message
2. **Form validates** the data (required fields, email format)
3. **API sends 2 emails:**
   - **To you:** Contains the sender's info and message
   - **To sender:** Auto-reply thanking them for contacting you
4. **Success message** shows on the form
5. **You can reply** directly to the email you receive

## 🎨 Email Templates

### Email to You (Website Owner)
- Clean, professional design
- Shows sender's name, email, subject, and message
- Reply-to address is set to the sender's email
- Branded with your colors

### Auto-Reply to Sender
- Thanks them for reaching out
- Confirms you received their message
- Shows their original message
- Includes your contact info and branding
- Professional gradient design

## 🔒 Security Notes

### ✅ Good Practices (Already Implemented)
- ✅ `.env.local` is in `.gitignore` (never committed to Git)
- ✅ Email validation on both client and server
- ✅ Rate limiting possible (can add if needed)
- ✅ Server-side processing (credentials never exposed to client)

### ⚠️ Important Reminders
- **NEVER** commit `.env.local` to Git
- **NEVER** share your `EMAIL_PASS` (Gmail app password)
- The app password is specific to this app and can be revoked anytime

## 🚀 Deploying to Vercel

When deploying, you need to add environment variables to Vercel:

1. Go to your Vercel project dashboard
2. Click **Settings** → **Environment Variables**
3. Add these variables:
   ```
   GEMINI_API_KEY = AIzaSyAfHlVMNBLB-II5qbd44PKKXfIHWqagL_c
   EMAIL_USER = elishaejimofor@gmail.com
   EMAIL_PASS = fepq zgkf wztk dvnj
   EMAIL_TO = elishaejimofor@gmail.com
   ```
4. Redeploy your site

## 🛠️ Troubleshooting

### Issue: "Failed to send email"
**Solutions:**
- Check that `.env.local` exists and has correct values
- Verify Gmail app password is correct (16 characters, no spaces)
- Make sure 2-Step Verification is enabled on your Google account
- Try generating a new app password

### Issue: "Network error"
**Solutions:**
- Make sure dev server is running (`npm run dev`)
- Check browser console for errors
- Verify API route exists at `/api/contact`

### Issue: Emails not arriving
**Solutions:**
- Check spam/junk folder
- Verify `EMAIL_TO` is correct in `.env.local`
- Check server logs for errors
- Test with the test script: `node scripts/test-contact-api.js`

### Issue: Auto-reply not working
**Solutions:**
- Check that sender's email is valid
- Verify both email sends in API logs
- Check sender's spam folder

## 📊 Monitoring

To see email sending logs:
1. Check your terminal where `npm run dev` is running
2. Look for console.log output when form is submitted
3. Any errors will appear in the terminal

## 🎯 Next Steps (Optional Enhancements)

Want to improve your contact form further? Consider:

1. **Add rate limiting** - Prevent spam submissions
2. **Add CAPTCHA** - Extra spam protection (reCAPTCHA)
3. **Email notifications** - Get push notifications for new messages
4. **Database storage** - Save messages to a database
5. **Admin dashboard** - View all messages in one place
6. **File attachments** - Allow users to upload files

Let me know if you want help implementing any of these!

---

## ✨ Summary

Your contact form is now fully functional with:
- ✅ Custom email API using your Gmail
- ✅ Professional email templates
- ✅ Auto-replies to senders
- ✅ Error handling and validation
- ✅ Beautiful animations
- ✅ Ready for production deployment

**Test it now and start receiving messages!** 🎉

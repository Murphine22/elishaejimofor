# Elisha's Portfolio Website

A modern portfolio website built with Next.js, React, and Tailwind CSS.

## Features

- Responsive design
- Dark/light mode
- Interactive UI components
- Contact form with email functionality
- Blog section
- Services showcase
- Project gallery
- Admin panel for content management

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Run the development server:
   ```
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Email Setup

The contact form is configured to send emails using Nodemailer. To set up email functionality:

1. Create a `.env.local` file in the root directory
2. Add the following environment variables:
   ```
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   EMAIL_FROM=your-email@gmail.com
   ```
3. If using Gmail, you'll need to create an App Password (see `EMAIL_SETUP.md` for detailed instructions)
4. Test your email configuration:
   ```
   npm run test-email
   ```

For detailed email setup instructions, see [EMAIL_SETUP.md](./EMAIL_SETUP.md).

## Deployment

This project can be deployed on Vercel, Netlify, or any other Next.js-compatible hosting platform.

Remember to set up your environment variables on your hosting platform.

## License

This project is licensed under the MIT License. 
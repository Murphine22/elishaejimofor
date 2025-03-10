// Test script for email functionality
const nodemailer = require('nodemailer');
require('dotenv').config({ path: '.env.local' });

async function main() {
  console.log('Testing email configuration...');
  
  // Check if environment variables are set
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.error('ERROR: Email credentials not found in .env.local file');
    console.log('Please make sure you have set EMAIL_USER and EMAIL_PASS in your .env.local file');
    process.exit(1);
  }
  
  console.log(`Using email: ${process.env.EMAIL_USER}`);
  
  // Create a test transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
  
  try {
    // Send a test email
    const info = await transporter.sendMail({
      from: `"Email Test" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER, // Send to yourself
      subject: "Test Email from Your Website",
      text: "If you're reading this, your email configuration is working correctly!",
      html: "<b>If you're reading this, your email configuration is working correctly!</b>",
    });
    
    console.log('Test email sent successfully!');
    console.log('Message ID:', info.messageId);
    console.log('Preview URL:', nodemailer.getTestMessageUrl(info));
    
  } catch (error) {
    console.error('ERROR: Failed to send test email');
    console.error(error);
    process.exit(1);
  }
}

main().catch(console.error); 
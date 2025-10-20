// Test script for the contact API
// Run with: node scripts/test-contact-api.js

const testContactAPI = async () => {
  try {
    console.log('🧪 Testing Contact API...\n')
    
    const testData = {
      name: 'Test User',
      email: 'test@example.com',
      subject: 'Test Email from Contact Form',
      message: 'This is a test message to verify the contact form is working correctly.'
    }

    console.log('📤 Sending test email with data:')
    console.log(JSON.stringify(testData, null, 2))
    console.log('\n⏳ Please wait...\n')

    const response = await fetch('http://localhost:3000/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData),
    })

    const result = await response.json()

    if (response.ok) {
      console.log('✅ SUCCESS! Email sent successfully!')
      console.log('📧 Check your email inbox at: elishaejimofor@gmail.com')
      console.log('📧 Also check test@example.com for the auto-reply')
      console.log('\nResponse:', result)
    } else {
      console.log('❌ FAILED! Error sending email')
      console.log('Error:', result)
    }
  } catch (error) {
    console.log('❌ NETWORK ERROR!')
    console.log('Make sure your dev server is running: npm run dev')
    console.log('Error:', error.message)
  }
}

testContactAPI()

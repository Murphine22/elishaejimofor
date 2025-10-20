/**
 * Simple test script to verify Gemini AI integration
 * Run this with: node test-gemini.js
 */

const { GoogleGenerativeAI } = require("@google/generative-ai");

// Your API key
const API_KEY = "AIzaSyAfHlVMNBLB-II5qbd44PKKXfIHWqagL_c";

async function testGemini() {
  console.log("🧪 Testing Gemini AI Integration...\n");

  try {
    // Initialize Gemini
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    console.log("✅ Gemini AI initialized successfully");
    console.log("📡 Sending test message...\n");

    // Test message
    const prompt = "Say hello and confirm you're working!";
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    console.log("✅ Response received:");
    console.log("─".repeat(50));
    console.log(text);
    console.log("─".repeat(50));
    console.log("\n🎉 Gemini AI is working correctly!");
    console.log("\nYou can now use the chatbot on your website.");

  } catch (error) {
    console.error("❌ Error testing Gemini AI:");
    console.error(error.message);
    console.log("\n💡 Troubleshooting tips:");
    console.log("1. Check your internet connection");
    console.log("2. Verify your API key is correct");
    console.log("3. Ensure @google/generative-ai is installed");
    console.log("4. Check if you've exceeded API rate limits");
  }
}

// Run the test
testGemini();

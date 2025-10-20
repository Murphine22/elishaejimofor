# Gemini AI Integration Setup Guide

## Overview
Your AI chatbot assistant has been enhanced with Google Gemini AI to provide more intelligent and context-aware responses about your website, skills, projects, and services.

## What's New

### Enhanced Features
- **Intelligent Responses**: Gemini AI provides natural, context-aware conversations
- **Website Knowledge**: The AI has comprehensive information about your portfolio, skills, and services
- **Conversation Memory**: Maintains context throughout the conversation
- **Fallback System**: Automatically falls back to local responses if the API is unavailable

### Files Created/Modified

1. **`/app/api/chat/route.ts`** (NEW)
   - API endpoint for Gemini AI integration
   - Handles chat requests and responses
   - Includes comprehensive website context

2. **`/components/chatbot.tsx`** (MODIFIED)
   - Updated to use Gemini API
   - Added async handling for API calls
   - Improved error handling with fallback

3. **`.env.example`** (NEW)
   - Template for environment variables

## Setup Instructions

### Step 1: Install Dependencies
Run the following command to install the Google Generative AI package:

```bash
npm install @google/generative-ai
```

### Step 2: Configure API Key
Create a `.env.local` file in the root directory and add your Gemini API key:

```env
GEMINI_API_KEY=AIzaSyAfHlVMNBLB-II5qbd44PKKXfIHWqagL_c
```

**Note**: Your API key is already included in the code as a fallback, but using environment variables is recommended for security.

### Step 3: Restart Development Server
After installing dependencies and setting up the environment variables, restart your development server:

```bash
npm run dev
```

## How It Works

### 1. Website Context
The AI assistant has been pre-loaded with comprehensive information about:
- Your professional background and skills
- All your projects and their details
- Services you offer with pricing tiers
- Website features and navigation
- Contact information
- Blog content and topics

### 2. Conversation Flow
```
User Message → Frontend (chatbot.tsx) → API Route (/api/chat) → Gemini AI → Response → User
```

### 3. Fallback Mechanism
If the Gemini API fails (network issues, rate limits, etc.), the chatbot automatically falls back to the original local response system, ensuring uninterrupted service.

## Testing the Integration

1. **Open the chatbot** by clicking the chat icon in the bottom-right corner
2. **Try these sample questions**:
   - "What skills does Elisha have?"
   - "Tell me about the projects"
   - "What services do you offer?"
   - "How can I contact Elisha?"
   - "What technologies is this website built with?"

3. **Verify the response quality** - Gemini should provide detailed, contextual answers

## API Key Security

### Best Practices
- ✅ Store API keys in `.env.local` (already gitignored)
- ✅ Never commit API keys to version control
- ✅ Use environment variables in production
- ✅ Rotate keys periodically

### Getting Your Own API Key
If you need a new API key:
1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Create a new API key
4. Copy and paste it into your `.env.local` file

## Troubleshooting

### Issue: "Failed to generate response"
**Solution**: Check that:
- The `@google/generative-ai` package is installed
- Your API key is correct in `.env.local`
- You've restarted the development server
- Your internet connection is stable

### Issue: Chatbot shows offline mode message
**Solution**: This means the API call failed. Check:
- API key validity
- Network connection
- API rate limits (Gemini free tier has limits)
- Browser console for specific error messages

### Issue: Responses are not contextual
**Solution**: 
- Ensure the API route is being called (check Network tab in browser DevTools)
- Verify the WEBSITE_CONTEXT in `/app/api/chat/route.ts` is complete
- Check conversation history is being passed correctly

## Customization

### Updating Website Context
To update the information the AI knows about your website, edit the `WEBSITE_CONTEXT` constant in `/app/api/chat/route.ts`.

### Adjusting AI Behavior
You can modify the prompt structure in the API route to change how the AI responds:
- Make it more formal or casual
- Add specific instructions
- Include additional context

### Changing the Model
To use a different Gemini model, update this line in `/app/api/chat/route.ts`:
```typescript
const model = genAI.getGenerativeModel({ model: "gemini-pro" });
```

Available models:
- `gemini-pro` - Best for text-based tasks (current)
- `gemini-pro-vision` - For image understanding (requires additional setup)

## Performance Considerations

- **Response Time**: Gemini API typically responds in 1-3 seconds
- **Rate Limits**: Free tier has daily limits; consider upgrading for production
- **Caching**: Consider implementing response caching for common questions
- **Error Handling**: The fallback system ensures users always get a response

## Next Steps

### Enhancements You Can Add
1. **Conversation History Storage**: Save conversations to localStorage
2. **User Feedback**: Add thumbs up/down for responses
3. **Typing Indicators**: More realistic typing simulation
4. **Voice Input**: Add speech-to-text capabilities
5. **Multi-language Support**: Detect and respond in user's language
6. **Analytics**: Track popular questions and improve responses

## Support

If you encounter any issues or need help:
1. Check the browser console for error messages
2. Review the API route logs
3. Test the API key directly with a simple Gemini API call
4. Refer to [Google Gemini Documentation](https://ai.google.dev/docs)

---

**Congratulations!** Your AI assistant is now powered by Google Gemini and ready to provide intelligent, context-aware assistance to your website visitors. 🎉

# Sales Dashboard Setup Guide

## Environment Configuration

### 1. Environment Variables Setup

The `.env.local` file has been created with the following structure:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here
SUPABASE_PASSWORD=X5oHKRlVtgt7qNBj

# Gemini AI Configuration
GEMINI_API_KEY=your_gemini_api_key_here

# Application Configuration
NEXTAUTH_SECRET=your_nextauth_secret_here
NEXTAUTH_URL=http://localhost:3000
```

### 2. Required API Keys

#### Gemini AI API Key
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Copy the key and replace `your_gemini_api_key_here` in `.env.local`

#### Supabase Configuration (Optional for current setup)
1. Go to [Supabase Dashboard](https://app.supabase.com/)
2. Create a new project or select existing one
3. Go to Settings > API
4. Copy the following:
   - Project URL → `NEXT_PUBLIC_SUPABASE_URL`
   - Anon public key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - Service role key → `SUPABASE_SERVICE_ROLE_KEY`

### 3. Installation & Running

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:3000`

## API Endpoints

### Chat API (`/api/chat`)

**POST** `/api/chat`
- Sends messages to Gemini AI
- Includes conversation history for context
- Returns AI-generated responses

**Request Body:**
```json
{
  "message": "Your question or message",
  "conversationHistory": [
    {
      "role": "user|assistant",
      "content": "Previous message content"
    }
  ]
}
```

**Response:**
```json
{
  "message": "AI response",
  "timestamp": "2023-12-22T10:30:00.000Z",
  "error": "Optional error message"
}
```

## Features

### AI Chat Interface (`/upload`)
- Real-time chat with Gemini AI
- Context-aware conversations
- Sales dashboard specific prompts
- Error handling with fallback messages
- Conversation history support

### Dashboard Features
- Individual metric dashboards
- Week-by-week data editing
- Timeline navigation
- Sales rep management
- Performance visualization

## Troubleshooting

### Common Issues

1. **"GEMINI_API_KEY is required" error**
   - Ensure you've added your Gemini API key to `.env.local`
   - Restart the development server after adding the key

2. **API calls failing**
   - Check your internet connection
   - Verify the API key is valid
   - Check browser console for detailed error messages

3. **Environment variables not loading**
   - Ensure `.env.local` is in the root directory
   - Restart the development server
   - Check that variable names match exactly

### Error Handling

The chat interface includes:
- Automatic fallback responses if API fails
- Error indicators in the UI
- Graceful degradation of functionality
- Retry mechanisms for temporary failures

## Security Notes

- Never commit `.env.local` to version control
- Keep your API keys secure
- The Gemini API key should be kept private
- Supabase keys have different access levels - use appropriately 
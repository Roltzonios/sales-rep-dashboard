import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { message, conversationHistory } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    // Check if API key is available
    const apiKey = process.env.GEMINI_API_KEY;
    console.log('API Key available:', !!apiKey);
    console.log('API Key length:', apiKey?.length || 0);
    
    if (!apiKey) {
      console.error('GEMINI_API_KEY not found in environment variables');
      return NextResponse.json({
        message: "Configuration error: API key not found. Please check your environment setup.",
        timestamp: new Date().toISOString(),
        error: 'Missing API key'
      });
    }

    // Initialize the Gemini AI client
    const genAI = new GoogleGenerativeAI(apiKey);

    // Get the generative model - using the correct model name
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    // Create a context-aware prompt that includes sales dashboard context
    const systemPrompt = `You are an AI assistant for a sales performance dashboard. You help sales managers and representatives analyze their data, provide insights, and answer questions about sales metrics including:

- Number of Hours worked
- Call Logs and activity
- Accounts Touched
- Spoke With (conversations)
- Number of Leads generated
- Conversion rates (Leads vs Accounts Touched %)
- Efficiency metrics (Spoke With vs Leads Sent %, Calls per Hour)

You can help with:
- Data analysis and interpretation
- Performance insights and recommendations
- Trend identification
- Goal setting and tracking
- Best practices for sales improvement
- Comparative analysis between team members

Provide helpful, actionable insights in a professional yet conversational tone. Be specific when possible and offer concrete suggestions for improvement.`;

    // Build conversation context
    let conversationContext = systemPrompt + '\n\n';
    
    if (conversationHistory && conversationHistory.length > 0) {
      conversationContext += 'Previous conversation:\n';
      conversationHistory.forEach((msg: any) => {
        conversationContext += `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}\n`;
      });
      conversationContext += '\n';
    }
    
    conversationContext += `User: ${message}\nAssistant:`;

    console.log('Sending request to Gemini API...');
    
    // Generate response
    const result = await model.generateContent(conversationContext);
    const response = await result.response;
    const text = response.text();

    console.log('Gemini API response received successfully');

    return NextResponse.json({
      message: text,
      timestamp: new Date().toISOString(),
    });

  } catch (error) {
    console.error('Error calling Gemini API:', error);
    console.error('Error details:', {
      name: error instanceof Error ? error.name : 'Unknown',
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : 'No stack trace'
    });
    
    // Provide fallback response if API fails
    const fallbackResponses = [
      "I'm experiencing some technical difficulties right now, but I'm here to help you analyze your sales data. Could you please rephrase your question?",
      "I'm having trouble connecting to my AI services at the moment. In the meantime, I can help you understand that your dashboard tracks key metrics like call logs, accounts touched, and conversion rates.",
      "There seems to be a temporary issue with my AI capabilities. However, I can tell you that your sales dashboard provides valuable insights into team performance and efficiency metrics.",
    ];
    
    const fallbackMessage = fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
    
    return NextResponse.json({
      message: fallbackMessage,
      timestamp: new Date().toISOString(),
      error: 'AI service temporarily unavailable',
      debug: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Chat API is running. Use POST to send messages.',
    timestamp: new Date().toISOString(),
    apiKeyConfigured: !!process.env.GEMINI_API_KEY
  });
} 
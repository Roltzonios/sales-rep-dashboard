import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';
import { formatDataForGeminiContext } from '../../../lib/data-store';

// Sample data structure - this should match your actual data structure
const currentSalesData = {
  weekEnding: "2024-03-22",
  reps: [
    {
      name: "JP",
      metrics: {
        hoursWorked: 40,
        callLogs: 180,
        accountsTouched: 120,
        spokeWith: 45,
        leads: 15,
        leadsVsAccountsTouchedPercent: "12.5%",
        spokeWithVsLeadsSentPercent: "33.3%",
        callsPerHour: 4.5
      }
    },
    {
      name: "Kayla",
      metrics: {
        hoursWorked: 38,
        callLogs: 165,
        accountsTouched: 110,
        spokeWith: 42,
        leads: 14,
        leadsVsAccountsTouchedPercent: "12.7%",
        spokeWithVsLeadsSentPercent: "33.3%",
        callsPerHour: 4.3
      }
    },
    {
      name: "Ken",
      metrics: {
        hoursWorked: 42,
        callLogs: 190,
        accountsTouched: 130,
        spokeWith: 48,
        leads: 16,
        leadsVsAccountsTouchedPercent: "12.3%",
        spokeWithVsLeadsSentPercent: "33.3%",
        callsPerHour: 4.5
      }
    },
    {
      name: "Paul",
      metrics: {
        hoursWorked: 39,
        callLogs: 175,
        accountsTouched: 115,
        spokeWith: 43,
        leads: 15,
        leadsVsAccountsTouchedPercent: "13.0%",
        spokeWithVsLeadsSentPercent: "34.9%",
        callsPerHour: 4.5
      }
    },
    {
      name: "Margo",
      metrics: {
        hoursWorked: 41,
        callLogs: 185,
        accountsTouched: 125,
        spokeWith: 46,
        leads: 15,
        leadsVsAccountsTouchedPercent: "12.0%",
        spokeWithVsLeadsSentPercent: "32.6%",
        callsPerHour: 4.5
      }
    },
    {
      name: "Brian",
      metrics: {
        hoursWorked: 40,
        callLogs: 180,
        accountsTouched: 120,
        spokeWith: 45,
        leads: 15,
        leadsVsAccountsTouchedPercent: "12.5%",
        spokeWithVsLeadsSentPercent: "33.3%",
        callsPerHour: 4.5
      }
    }
  ]
};

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

    // Get formatted historical data for context
    const historicalDataContext = formatDataForGeminiContext();

    // Create a context-aware prompt that includes sales dashboard context and historical data
    const systemPrompt = `You are an AI assistant for a sales performance dashboard. 

Your sole purpose is to help the user upload data within their dashboard and understand any information within the dashboard and the database which you are connected to. 

Here is the complete historical sales data, with the most recent week first:

${historicalDataContext}

If you are prompted to upload new data, you will be asking the user to upload the data either in a file attachment or just being able to paste it in the chat in a structured format. Upon them pasting this information in a structured format, you will then use the data to update the dashboard based on the values that are provided. 

When analyzing trends or performance:
- Compare data across weeks to identify patterns
- Highlight significant changes or improvements
- Consider both individual and team performance
- Look at efficiency metrics over time
- Note any correlations between different metrics

If you are prompted to understand the data, you will specify anything or explain the data in a way that is easy to understand. 
If you are prompted to understand the dashboard, you will use the most recent data unless otherwise specified. 

Do not use any bold text in your response. 
Do not use any emojis in your response. 
Do not use any markdown in your response. 
Do not use any code in your response.`;

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
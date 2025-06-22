'use client';

import React, { useState, useRef, useEffect } from 'react';
import DashboardLayout from '../../components/dashboard-layout';
import { Button } from "../../../@/components/ui/button";
import { Textarea } from "../../../@/components/ui/textarea";
import { Send, AlertCircle } from "lucide-react";

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  error?: boolean;
}

export default function UploadPage() {
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hello! I\'m your AI assistant powered by Gemini. I can help you analyze data, answer questions about your sales metrics, provide insights, and assist with various tasks. What would you like to know or discuss today?',
      timestamp: new Date()
    }
  ]);
  const [chatInput, setChatInput] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll chat to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || isTyping) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: chatInput.trim(),
      timestamp: new Date()
    };

    setChatMessages(prev => [...prev, userMessage]);
    const currentInput = chatInput.trim();
    setChatInput('');
    setIsTyping(true);

    try {
      // Send request to our API endpoint
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: currentInput,
          conversationHistory: chatMessages.slice(-10) // Send last 10 messages for context
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.message,
        timestamp: new Date(),
        error: !!data.error
      };

      setChatMessages(prev => [...prev, assistantMessage]);
      
    } catch (error) {
      console.error('Error calling chat API:', error);
      
      // Fallback error message
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'I apologize, but I\'m experiencing technical difficulties right now. Please check your internet connection and try again. If the problem persists, the API service might be temporarily unavailable.',
        timestamp: new Date(),
        error: true
      };

      setChatMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col h-screen bg-white">
        {/* Header */}
        <div className="border-b border-slate-200 p-6">
          <h1 className="text-2xl font-semibold text-slate-900">AI Assistant</h1>
          <p className="text-slate-600 mt-1">Powered by Gemini - Get insights and analysis for your sales data</p>
        </div>

        {/* Chat Messages Area */}
        <div className="flex-1 overflow-y-auto px-8 py-6">
          <div className="max-w-4xl mx-auto space-y-8">
            {chatMessages.map((message) => (
              <div key={message.id} className="flex flex-col space-y-2">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-slate-700">
                    {message.role === 'user' ? 'You' : 'AI Assistant'}
                  </span>
                  <span className="text-xs text-slate-500">
                    {formatTime(message.timestamp)}
                  </span>
                  {message.error && (
                    <div className="flex items-center space-x-1 text-orange-600">
                      <AlertCircle className="h-3 w-3" />
                      <span className="text-xs">Service Issue</span>
                    </div>
                  )}
                </div>
                
                <div className={`p-6 rounded-lg ${
                  message.role === 'user' 
                    ? 'bg-blue-50 border border-blue-200' 
                    : message.error
                    ? 'bg-orange-50 border border-orange-200'
                    : 'bg-slate-50 border border-slate-200'
                }`}>
                  <p className="text-lg leading-relaxed text-slate-800 whitespace-pre-wrap">
                    {message.content}
                  </p>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex flex-col space-y-2">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-slate-700">AI Assistant</span>
                  <span className="text-xs text-slate-500">thinking...</span>
                </div>
                <div className="bg-slate-50 border border-slate-200 p-6 rounded-lg">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={chatEndRef} />
          </div>
        </div>

        {/* Input Area */}
        <div className="border-t border-slate-200 p-6">
          <div className="max-w-4xl mx-auto">
            <form onSubmit={handleChatSubmit} className="flex space-x-4">
              <Textarea
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Ask me anything about your sales data, performance metrics, or business insights..."
                className="flex-1 min-h-[60px] text-base resize-none border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleChatSubmit(e);
                  }
                }}
                disabled={isTyping}
              />
              <Button 
                type="submit" 
                disabled={!chatInput.trim() || isTyping}
                className="h-[60px] px-6 bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50"
              >
                <Send className="h-5 w-5" />
              </Button>
            </form>
            <div className="flex items-center justify-between mt-2">
              <p className="text-xs text-slate-500">
                Press Enter to send, Shift + Enter for new line
              </p>
              <div className="flex items-center space-x-2 text-xs text-slate-500">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Powered by Gemini AI</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
} 
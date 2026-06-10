import { NextResponse } from 'next/server';
import Groq from 'groq-sdk';
import { SYSTEM_PROMPT } from '../../../lib/chatbot-knowledge';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const rateLimit = new Map();
const RATE_LIMIT_WINDOW = 60 * 1000;  
const MAX_REQUESTS      = 20;          

function checkRateLimit(ip) {
  const now = Date.now();
  const userRequests = rateLimit.get(ip) || [];
  const recent = userRequests.filter((time) => now - time < RATE_LIMIT_WINDOW);

  if (recent.length >= MAX_REQUESTS) return false;

  recent.push(now);
  rateLimit.set(ip, recent);
  return true;
}

export async function POST(request) {
  try {
    // Rate limiting by IP
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    if (!checkRateLimit(ip)) {    
      return NextResponse.json(
        { error: 'Too many requests. Please try again in a minute.' },
        { status: 429 }
      );
    }

    const { messages } = await request.json();

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: 'Messages array is required' },
        { status: 400 }
      );
    }

    // Build complete conversation with system prompt
    const conversationHistory = [
      { role: 'system', content: SYSTEM_PROMPT },
      // Last 10 messages only (token optimization)
      ...messages.slice(-10).map((m) => ({
        role:    m.role === 'user' ? 'user' : 'assistant',
        content: m.content,
      })),
    ];

    // Call Groq API — using Llama 3.3 70B (best quality + free + fast)
    const completion = await groq.chat.completions.create({
      messages:    conversationHistory,
      model:       'llama-3.3-70b-versatile', 
      temperature: 0.7,
      max_tokens:  1024,
      top_p:       0.95,
      stream:      false,
    });

    const reply = completion.choices[0]?.message?.content || 'Sorry, I could not generate a response.';

    return NextResponse.json({
      reply,
      usage: completion.usage,
    });

  } catch (error) {
    console.error('Chat API error:', error);

    return NextResponse.json(
      {
        error: 'Sorry, I encountered an error. Please try again or call support at +1 855 316 3173.',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined,
      },
      { status: 500 }
    );
  }
}
'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import {
  MessageCircle, X, Send, Sparkles, Phone, RotateCcw,
} from 'lucide-react';
import { QUICK_ACTIONS, GREETINGS } from '../../../lib/chatbot-knowledge';

const STORAGE_KEY = 'reservationkart_chat_history';

export default function ChatWidget() {
  const [isOpen,        setIsOpen]        = useState(false);
  const [messages,      setMessages]      = useState([]);
  const [input,         setInput]         = useState('');
  const [isLoading,     setIsLoading]     = useState(false);
  const [showQuickActions, setShowQuickActions] = useState(true);
  const [unreadCount,   setUnreadCount]   = useState(0);

  const messagesEndRef = useRef(null);
  const inputRef       = useRef(null);

  // Load chat history from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setMessages(parsed);
        if (parsed.length > 0) setShowQuickActions(false);
      } else {
        // First time — show greeting
        const greeting = GREETINGS[Math.floor(Math.random() * GREETINGS.length)];
        setMessages([{
          role:      'assistant',
          content:   greeting,
          timestamp: Date.now(),
        }]);
      }
    } catch (err) {
      console.error('Failed to load chat history');
    }
  }, []);

  // Save to localStorage whenever messages change
  useEffect(() => {
    if (messages.length > 0) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
      } catch (err) {}
    }
  }, [messages]);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      setUnreadCount(0);
    }
  }, [isOpen]);

  const sendMessage = useCallback(async (messageText) => {
    const text = messageText.trim();
    if (!text || isLoading) return;

    const userMessage = { role: 'user', content: text, timestamp: Date.now() };
    const newMessages = [...messages, userMessage];

    setMessages(newMessages);
    setInput('');
    setIsLoading(true);
    setShowQuickActions(false);

    try {
      const response = await fetch('/api/chat', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ messages: newMessages }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to get response');
      }

      const assistantMessage = {
        role:      'assistant',
        content:   data.reply,
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, assistantMessage]);

      if (!isOpen) setUnreadCount((c) => c + 1);
    } catch (error) {
      setMessages((prev) => [...prev, {
        role:    'assistant',
        content: `${error.message}\n\nYou can also call us directly at +1 8002345245 for immediate help.`,
        timestamp: Date.now(),
        isError:   true,
      }]);
    } finally {
      setIsLoading(false);
    }
  }, [messages, isLoading, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleQuickAction = (prompt) => {
    sendMessage(prompt);
  };

  const handleClearChat = () => {
    if (!confirm('Clear chat history?')) return;
    const greeting = GREETINGS[Math.floor(Math.random() * GREETINGS.length)];
    setMessages([{ role: 'assistant', content: greeting, timestamp: Date.now() }]);
    setShowQuickActions(true);
    try { localStorage.removeItem(STORAGE_KEY); } catch (err) {}
  };

  return (
    <>
      {/* Floating Chat Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
        className={`fixed bottom-6 right-6 z-40 w-14 h-14 sm:w-16 sm:h-16 rounded-full shadow-2xl transition-all duration-300 flex items-center justify-center group ${
          isOpen
            ? 'bg-gray-700 hover:bg-gray-800 rotate-90 scale-90'
            : 'bg-gradient-to-br from-brand-orange-500 to-brand-orange-600 hover:scale-110'
        }`}
      >
        {isOpen ? (
          <X className="h-6 w-6 text-white" />
        ) : (
          <>
            <MessageCircle className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
            {/* Pulse ring */}
            <span className="absolute inset-0 rounded-full bg-brand-orange-500 animate-ping opacity-30" />
            {/* Unread badge */}
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-red-500 text-white text-xs font-bold flex items-center justify-center border-2 border-white">
                {unreadCount}
              </span>
            )}
            {/* Tooltip on hover */}
            <span className="absolute right-full mr-3 px-3 py-1.5 rounded-lg bg-gray-900 text-white text-sm font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              Need help?
            </span>
          </>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-40 w-[calc(100vw-3rem)] sm:w-96 h-[600px] max-h-[calc(100vh-8rem)] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden animate-in slide-in-from-bottom-4 fade-in duration-300">

          {/* Header */}
          <div className="bg-gradient-to-r from-brand-orange-500 to-brand-orange-600 text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-green-400 border-2 border-brand-orange-500" />
              </div>
              <div>
                <div className="font-bold text-sm">TravelBot</div>
                <div className="text-xs text-white/80 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                  Online — Replies instantly
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={handleClearChat}
                aria-label="Clear chat"
                className="p-1.5 rounded-lg hover:bg-white/20 transition-colors"
              >
                <RotateCcw className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Minimize"
                className="p-1.5 rounded-lg hover:bg-white/20 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Messages area */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-gradient-to-b from-gray-50 to-white">
            {messages.map((msg, idx) => (
              <Message key={idx} message={msg} />
            ))}

            {/* Loading indicator */}
            {isLoading && (
              <div className="flex items-end gap-2">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-brand-orange-500 to-brand-orange-600 flex items-center justify-center flex-shrink-0">
                  <Sparkles className="h-3.5 w-3.5 text-white" />
                </div>
                <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" />
                    <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}

            {/* Quick action buttons (shown only initially) */}
            {showQuickActions && messages.length <= 1 && !isLoading && (
              <div className="pt-3">
                <div className="text-xs font-semibold text-gray-500 mb-2 px-1">Quick questions:</div>
                <div className="grid grid-cols-2 gap-2">
                  {QUICK_ACTIONS.map((action) => (
                    <button
                      key={action.label}
                      type="button"
                      onClick={() => handleQuickAction(action.prompt)}
                      className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-white border border-gray-200 hover:border-brand-orange-300 hover:bg-brand-orange-50 text-left transition-all"
                    >
                      <span className="text-lg flex-shrink-0">{action.icon}</span>
                      <span className="text-xs font-semibold text-brand-dark">
                        {action.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Footer with phone */}
          <div className="px-4 py-2 border-t border-gray-100 bg-gray-50 flex items-center justify-between">
            <a
              href="tel:+18002228888"
              className="text-xs text-gray-600 hover:text-brand-orange-500 flex items-center gap-1.5 font-semibold"
            >
              <Phone className="h-3 w-3" />
              Or call +1 855 316 3173
            </a>
            <span className="text-xs text-gray-400">
              Powered by AI ⚡
            </span>
          </div>

          {/* Input area */}
          <form onSubmit={handleSubmit} className="p-3 border-t border-gray-200 bg-white">
            <div className="flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything..."
                disabled={isLoading}
                aria-label="Type your message"
                className="flex-1 px-4 py-2.5 rounded-full border border-gray-200 bg-gray-50 focus:bg-white focus:border-brand-orange-500 focus:outline-none text-sm disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                aria-label="Send message"
                className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-orange-500 to-brand-orange-600 text-white flex items-center justify-center hover:shadow-lg active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed transition-all flex-shrink-0"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

/* ==========================================================
   Single Message Component — with markdown-like formatting
   ========================================================== */
function Message({ message }) {
  const isUser = message.role === 'user';

  // Simple markdown rendering for AI responses
  const renderContent = (text) => {
    const lines = text.split('\n');
    return lines.map((line, i) => {
      // Bold: **text**
      const withBold = line.split(/(\*\*[^*]+\*\*)/g).map((part, j) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={j}>{part.slice(2, -2)}</strong>;
        }
        return part;
      });

      // Bullet points
      if (line.trim().startsWith('- ') || line.trim().startsWith('• ')) {
        return (
          <div key={i} className="flex gap-2 my-0.5">
            <span className="text-brand-orange-500">•</span>
            <span>{withBold}</span>
          </div>
        );
      }

      return line ? <div key={i}>{withBold}</div> : <br key={i} />;
    });
  };

  return (
    <div className={`flex items-end gap-2 ${isUser ? 'flex-row-reverse' : ''}`}>
      {!isUser && (
        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-brand-orange-500 to-brand-orange-600 flex items-center justify-center flex-shrink-0">
          <Sparkles className="h-3.5 w-3.5 text-white" />
        </div>
      )}
      <div
        className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
          isUser
            ? 'bg-brand-orange-500 text-white rounded-br-sm'
            : message.isError
            ? 'bg-red-50 border border-red-200 text-red-800 rounded-bl-sm'
            : 'bg-white border border-gray-200 text-brand-dark rounded-bl-sm shadow-sm'
        }`}
      >
        {renderContent(message.content)}
      </div>
    </div>
  );
}
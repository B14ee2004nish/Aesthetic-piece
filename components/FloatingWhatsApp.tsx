'use client';

import React, { useState } from 'react';
import { MessageCircle, X, Send, Sparkles } from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'studio' | 'visitor';
  text: string;
}

export default function FloatingWhatsApp() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'studio',
      text: 'Welcome to Aesthetic Piece! How can we help you today?',
    },
  ]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = inputValue.trim();
    if (!trimmed) return;

    setMessages((prev) => [
      ...prev,
      { id: `msg-${Date.now()}`, sender: 'visitor', text: trimmed },
      {
        id: `ack-${Date.now() + 1}`,
        sender: 'studio',
        text: 'Thank you for reaching out. Our curation team has received your note and will reply shortly at modernstyle2026@gmail.com.',
      },
    ]);
    setInputValue('');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Popup Message Box */}
      {isOpen && (
        <div
          role="dialog"
          aria-label="Aesthetic Piece Concierge Message Box"
          className="w-[330px] sm:w-[360px] bg-white border border-[#e5e5e5] rounded-2xl shadow-[0_20px_50px_-12px_rgba(17,17,17,0.22)] overflow-hidden"
        >
          {/* Header */}
          <div className="bg-[#111111] text-[#faf9f6] px-5 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-full bg-[#faf9f6]/10 border border-[#faf9f6]/20 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-[#c2b29d]" />
              </span>
              <div>
                <h3 className="font-serif text-base font-normal tracking-tight text-white leading-tight">
                  Aesthetic Piece
                </h3>
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#a3a3a3] mt-0.5">
                  Client Concierge
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close message box"
              className="p-1.5 rounded-full text-[#a3a3a3] hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="bg-[#faf9f6] p-4 max-h-64 overflow-y-auto space-y-3">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === 'visitor' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] px-4 py-2.5 text-xs leading-relaxed rounded-2xl ${
                    msg.sender === 'visitor'
                      ? 'bg-[#111111] text-[#faf9f6] rounded-br-sm'
                      : 'bg-white text-[#111111] border border-[#e5e5e5] rounded-bl-sm shadow-[0_2px_8px_-2px_rgba(0,0,0,0.04)]'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input Bar */}
          <form
            onSubmit={handleSendMessage}
            className="bg-white border-t border-[#e5e5e5] p-3 flex items-center gap-2"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 px-3.5 py-2.5 text-xs bg-[#faf9f6] border border-[#e5e5e5] rounded-full text-[#111111] placeholder-[#a3a3a3] focus:outline-none focus:border-[#111111] focus:bg-white transition-colors"
            />
            <button
              type="submit"
              aria-label="Send message"
              className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-[#111111] hover:bg-black text-white transition-colors shrink-0 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}

      {/* Floating Circular Message Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? 'Close message assistant' : 'Open message box'}
        aria-expanded={isOpen}
        className="w-14 h-14 rounded-full bg-[#111111] hover:bg-black text-white border border-[#2a2a2a] shadow-[0_14px_34px_-8px_rgba(17,17,17,0.45)] flex items-center justify-center hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
      >
        {isOpen ? (
          <X className="w-5 h-5 stroke-[1.75]" />
        ) : (
          <MessageCircle className="w-6 h-6 stroke-[1.6]" />
        )}
      </button>
    </div>
  );
}

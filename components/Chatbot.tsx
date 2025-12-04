import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI, FunctionDeclaration, Type } from "@google/genai";
import { WhatsAppIcon, XIcon, SendIcon } from './icons';

interface Message {
  role: 'user' | 'model';
  text: string;
}

const SYSTEM_INSTRUCTION = `You are "Bollita", the friendly and kawaii AI assistant for "Goyibollita", a web shop that sells custom plushies and figurines. 
Your tone should be enthusiastic, helpful, and use emojis occasionally 🌸✨.

Here is the store information you need to answer customer queries:
- **Products:** We sell pre-made plushies/figurines in the Catalogue and allow Custom Orders.
- **Custom Orders:** 
    - Custom Plushies start at $60 (Soft Fleece included).
    - Custom Figurines start at $90 (Matte Finish included).
    - Sizes: Small (Standard), Medium (+$20), Large (+$50).
    - Process: Customers upload a reference image and describe their vision.
- **Shipping:** 
    - Standard: 5-7 business days.
    - Expedited: 2-3 business days.
    - We ship internationally (customer pays customs fees).
- **Payment:** We accept cards via our secure checkout.
- **Returns:** Contact support within 48 hours if an item arrives damaged.
- **Contact:** If the user asks to speak to a human, wants to contact the store directly, asks for the phone number, or has a problem you can't solve, use the "contactSupport" tool to redirect them to WhatsApp.

Keep answers concise. Do not make up prices that are not listed here.`;

const contactSupportTool: FunctionDeclaration = {
  name: 'contactSupport',
  description: 'Redirects the user to WhatsApp to contact the store directly. Use this when the user asks to speak to a human, wants to message the store, asks for the phone number, or implies they want to contact the store.',
  parameters: {
    type: Type.OBJECT,
    properties: {},
  },
};

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: 'Hi there! 🌸 I\'m Bollita. Do you have any questions about our custom plushies or shipping?' }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const chatHistory = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: [
            ...chatHistory,
            { role: 'user', parts: [{ text: userMessage }] }
        ],
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          tools: [{ functionDeclarations: [contactSupportTool] }],
        },
      });

      // Check for function calls first
      if (response.functionCalls && response.functionCalls.length > 0) {
        const call = response.functionCalls.find(fc => fc.name === 'contactSupport');
        if (call) {
            const phoneNumber = "526182469083";
            const message = encodeURIComponent("Necesito ayuda goyibollita");
            const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
            
            setMessages(prev => [...prev, { role: 'model', text: "I'll redirect you to our WhatsApp support so you can talk to a human! 📱✨" }]);
            
            setTimeout(() => {
                window.open(whatsappUrl, '_blank');
            }, 1500);
            
            setIsLoading(false);
            return;
        }
      }

      const responseText = response.text || "I'm having a little trouble thinking right now. Please try again later! 💫";
      setMessages(prev => [...prev, { role: 'model', text: responseText }]);

    } catch (error) {
      console.error("Chatbot error:", error);
      setMessages(prev => [...prev, { role: 'model', text: "Oops! Something went wrong. Please check your internet connection or try again later. 😿" }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-24 right-6 z-50 flex flex-col items-end">
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 w-80 sm:w-96 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden flex flex-col transition-all duration-300 animate-in slide-in-from-bottom-5 fade-in">
          {/* Header */}
          <div className="bg-[#25D366] p-4 flex justify-between items-center text-white">
            <div className="flex items-center space-x-2">
              <WhatsAppIcon className="w-6 h-6" />
              <span className="font-bold">Goyibollita Support</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 rounded-full p-1 transition-colors">
              <XIcon className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="h-80 overflow-y-auto p-4 space-y-4 bg-slate-50 dark:bg-slate-900">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div 
                  className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                    msg.role === 'user' 
                      ? 'bg-[#25D366] text-white rounded-br-none' 
                      : 'bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-200 shadow-sm rounded-bl-none border border-slate-100 dark:border-slate-600'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white dark:bg-slate-700 p-3 rounded-2xl rounded-bl-none shadow-sm border border-slate-100 dark:border-slate-600">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSend} className="p-3 bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 px-4 py-2 bg-slate-100 dark:bg-slate-700 rounded-full text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#25D366] text-sm"
            />
            <button 
              type="submit" 
              disabled={isLoading || !input.trim()}
              className="p-2 bg-[#25D366] text-white rounded-full hover:bg-[#20bd5a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <SendIcon className="w-5 h-5" />
            </button>
          </form>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`p-4 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 flex items-center justify-center ${
            isOpen ? 'bg-slate-500 hover:bg-slate-600' : 'bg-[#25D366] hover:bg-[#20bd5a]'
        } text-white`}
        aria-label="Toggle chat"
      >
        {isOpen ? <XIcon className="w-8 h-8" /> : <WhatsAppIcon className="w-8 h-8" />}
      </button>
    </div>
  );
};

export default Chatbot;
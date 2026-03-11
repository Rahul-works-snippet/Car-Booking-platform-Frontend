'use client';

import { useState, useRef, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'agent';
  time: string;
}

interface CustomerSupportWidgetProps {
  defaultOpen?: boolean;
}

const quickReplies = [
  'How do I modify my booking?',
  'What documents do I need?',
  'Is there a cancellation fee?',
  'Where is the pickup location?',
];

const CustomerSupportWidget = ({ defaultOpen = false }: CustomerSupportWidgetProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [activeTab, setActiveTab] = useState<'chat' | 'phone'>('chat');
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hi! I\'m here to help with your car rental. How can I assist you today?',
      sender: 'agent',
      time: '15:39',
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      text: text.trim(),
      sender: 'user',
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    // Simulated agent response
    setTimeout(() => {
      setIsTyping(false);
      const agentMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Thanks for reaching out! A support agent will be with you shortly. For urgent matters, please call our 24/7 hotline.',
        sender: 'agent',
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }),
      };
      setMessages((prev) => [...prev, agentMsg]);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(inputValue);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-support flex flex-col items-end gap-3">
      {/* Chat panel */}
      {isOpen && (
        <div className="w-80 sm:w-96 bg-card border border-border rounded-automotive-md shadow-automotive-xl overflow-hidden flex flex-col"
          style={{ maxHeight: '520px' }}
        >
          {/* Header */}
          <div className="bg-primary px-4 py-3 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                <Icon name="ChatBubbleLeftRightIcon" size={16} variant="outline" className="text-primary-foreground" />
              </div>
              <div>
                <p className="text-sm font-caption font-medium text-primary-foreground">DriveEasy Support</p>
                <div className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-success" />
                  <span className="text-xs font-caption text-primary-foreground/80">Online · Avg reply 2 min</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-primary-foreground/80 hover:text-primary-foreground transition-automotive duration-automotive focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-foreground rounded"
              aria-label="Close support chat"
            >
              <Icon name="XMarkIcon" size={20} variant="outline" />
            </button>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-border flex-shrink-0">
            {(['chat', 'phone'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-caption font-medium capitalize transition-automotive duration-automotive focus:outline-none ${
                  activeTab === tab
                    ? 'text-primary border-b-2 border-primary' :'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon name={tab === 'chat' ? 'ChatBubbleOvalLeftIcon' : 'PhoneIcon'} size={14} variant="outline" />
                {tab === 'chat' ? 'Live Chat' : 'Call Us'}
              </button>
            ))}
          </div>

          {activeTab === 'chat' ? (
            <>
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3" style={{ minHeight: 0 }}>
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[75%] px-3 py-2 rounded-automotive text-sm font-body ${
                        msg.sender === 'user' ?'bg-primary text-primary-foreground rounded-br-automotive-sm' :'bg-muted text-foreground rounded-bl-automotive-sm'
                      }`}
                    >
                      <p className="leading-relaxed">{msg.text}</p>
                      <p className={`text-xs font-data mt-1 ${msg.sender === 'user' ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                        {msg.time}
                      </p>
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-muted px-4 py-3 rounded-automotive rounded-bl-automotive-sm flex items-center gap-1">
                      {[0, 1, 2].map((i) => (
                        <span
                          key={i}
                          className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce"
                          style={{ animationDelay: `${i * 150}ms` }}
                        />
                      ))}
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Quick replies */}
              <div className="px-3 pb-2 flex gap-1.5 overflow-x-auto flex-shrink-0 scrollbar-hide">
                {quickReplies.map((reply) => (
                  <button
                    key={reply}
                    onClick={() => sendMessage(reply)}
                    className="flex-shrink-0 text-xs font-caption text-primary border border-primary/30 bg-primary/5 hover:bg-primary/10 px-2.5 py-1.5 rounded-full transition-automotive duration-automotive whitespace-nowrap"
                  >
                    {reply}
                  </button>
                ))}
              </div>

              {/* Input */}
              <div className="px-3 pb-3 flex-shrink-0">
                <div className="flex items-center gap-2 bg-background border border-border rounded-automotive px-3 focus-within:ring-[3px] focus-within:ring-ring/20 focus-within:border-primary transition-automotive duration-automotive">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type a message..."
                    className="flex-1 h-10 bg-transparent text-sm font-body text-foreground placeholder:text-muted-foreground focus:outline-none"
                  />
                  <button
                    onClick={() => sendMessage(inputValue)}
                    disabled={!inputValue.trim()}
                    className="text-primary disabled:text-muted-foreground transition-automotive duration-automotive focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
                    aria-label="Send message"
                  >
                    <Icon name="PaperAirplaneIcon" size={18} variant="outline" />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center gap-5 p-6">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <Icon name="PhoneIcon" size={28} variant="outline" className="text-primary" />
              </div>
              <div className="text-center">
                <p className="text-sm font-caption font-medium text-foreground mb-1">24/7 Customer Support</p>
                <p className="text-xs font-caption text-muted-foreground">Available around the clock for booking assistance</p>
              </div>
              <a
                href="tel:+18005551234"
                className="w-full flex items-center justify-center gap-2 h-12 bg-primary text-primary-foreground text-sm font-caption font-medium rounded-automotive shadow-automotive hover:shadow-automotive-md active:scale-95 transition-automotive duration-automotive"
              >
                <Icon name="PhoneIcon" size={18} variant="outline" />
                +1 (800) 555-1234
              </a>
              <div className="w-full flex flex-col gap-2">
                <div className="flex items-center justify-between text-xs font-caption">
                  <span className="text-muted-foreground">Email support</span>
                  <a href="mailto:support@driveeasy.com" className="text-primary hover:underline">support@driveeasy.com</a>
                </div>
                <div className="flex items-center justify-between text-xs font-caption">
                  <span className="text-muted-foreground">Response time</span>
                  <span className="text-foreground font-medium">Under 2 hours</span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* FAB */}
      <button
        onClick={() => setIsOpen((v) => !v)}
        className={`w-14 h-14 rounded-full shadow-automotive-lg flex items-center justify-center transition-automotive duration-automotive focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:scale-95 ${
          isOpen ? 'bg-secondary text-secondary-foreground' : 'bg-primary text-primary-foreground'
        }`}
        aria-label={isOpen ? 'Close support' : 'Open support chat'}
      >
        <Icon name={isOpen ? 'XMarkIcon' : 'ChatBubbleLeftRightIcon'} size={24} variant="outline" />
        {!isOpen && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-accent rounded-full flex items-center justify-center">
            <span className="text-accent-foreground text-xs font-data font-medium leading-none">1</span>
          </span>
        )}
      </button>
    </div>
  );
};

export default CustomerSupportWidget;
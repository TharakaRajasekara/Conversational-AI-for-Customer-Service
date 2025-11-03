
import React, { useState, useRef, useEffect } from 'react';
import type { Chat } from '@google/genai';
import { Message, MessageRole } from './types';
import { startChat, sendMessage } from './services/geminiService';
import Header from './components/Header';
import ChatBubble from './components/ChatBubble';
import MessageInput from './components/MessageInput';
import TypingIndicator from './components/TypingIndicator';

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: MessageRole.MODEL,
      text: "Hello! I'm the virtual assistant for InnovateTech. How can I help you today with our products like SmartWidget Pro, QuantumLeap Laptop, or DataSphere Cloud Storage?",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const chatRef = useRef<Chat | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      chatRef.current = startChat();
    } catch (error) {
      console.error(error);
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          role: MessageRole.ERROR,
          text: "Configuration error: Could not connect to the AI service. If you are the developer, please ensure the API key is configured correctly.",
        },
      ]);
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSendMessage = async (userMessage: string) => {
    if (!chatRef.current) return;

    setIsLoading(true);
    setMessages((prevMessages) => [
      ...prevMessages,
      { role: MessageRole.USER, text: userMessage },
    ]);

    const modelResponseText = await sendMessage(chatRef.current, userMessage);

    setMessages((prevMessages) => [
      ...prevMessages,
      { role: MessageRole.MODEL, text: modelResponseText },
    ]);
    setIsLoading(false);
  };
  
  return (
    <div className="flex flex-col h-screen max-w-3xl mx-auto bg-gray-50 dark:bg-gray-800 shadow-2xl rounded-lg overflow-hidden">
      <Header />
      <div className="flex-grow overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => (
          <ChatBubble key={index} message={msg} />
        ))}
        {isLoading && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>
      <MessageInput
        onSendMessage={handleSendMessage}
        isLoading={isLoading || !chatRef.current}
      />
    </div>
  );
};

export default App;

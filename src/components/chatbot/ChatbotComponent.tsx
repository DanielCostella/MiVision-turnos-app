import React, { useState } from 'react';
import { Chatbot } from 'react-chatbot-kit';
import config from './config';
import { Bot } from 'lucide-react';
import 'react-chatbot-kit/build/main.css';
import MessageParser from './MessageParser';
import ActionProvider from './ActionProvider';
import ChatbotButton from './ChatbotButton';

const ChatbotComponent: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => setIsOpen(!isOpen);

  return (
    <>
      <ChatbotButton onClick={toggleChat} isOpen={isOpen} />
      
      {isOpen && (
        <div className="fixed bottom-24 right-4 z-50 shadow-2xl rounded-lg overflow-hidden w-96 max-w-[calc(100vw-2rem)]">
          <div className="bg-blue-500 p-4 flex items-center gap-3">
            <Bot className="w-8 h-8 text-white" />
            <h3 className="text-white font-semibold">Asistente Virtual</h3>
          </div>
          <Chatbot
            config={config}
            messageParser={MessageParser}
            actionProvider={ActionProvider}
            placeholderText="Escribe tu mensaje aquí..."
          />
        </div>
      )}
    </>
  );
};

export default ChatbotComponent;
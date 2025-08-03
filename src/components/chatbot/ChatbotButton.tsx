import React from 'react';
import { Bot } from 'lucide-react';

interface ChatbotButtonProps {
  onClick: () => void;
  isOpen: boolean;
}

const ChatbotButton: React.FC<ChatbotButtonProps> = ({ onClick, isOpen }) => {
  return (
    <button
      onClick={onClick}
      className={`fixed bottom-4 right-4 z-50 flex items-center justify-center w-16 h-16 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition-all ${
        isOpen ? 'scale-90' : 'scale-100 animate-bounce'
      }`}
      aria-label="Asistente Virtual"
    >
      <Bot className="w-8 h-8" />
    </button>
  );
};

export default ChatbotButton;
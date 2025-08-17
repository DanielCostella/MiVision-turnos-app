import React from 'react';
import { Bot, X } from 'lucide-react';

interface ChatbotButtonProps {
  onClick: () => void;
  isOpen: boolean;
}

const ChatbotButton: React.FC<ChatbotButtonProps> = ({ onClick, isOpen }) => {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-4 right-4 z-50 p-3 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition-all flex items-center justify-center"
      aria-label={isOpen ? "Cerrar chat" : "Abrir chat"}
    >
      {isOpen ? (
        <X className="w-8 h-8" />
      ) : (
        <Bot className="w-8 h-8" /> // Volvemos al ícono de robot
      )}
    </button>
  );
};

export default ChatbotButton;
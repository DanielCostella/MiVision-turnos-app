import React, { ReactNode } from 'react';
import ChatbotComponent from './chatbot/ChatbotComponent';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {children}
      <ChatbotComponent />
    </div>
  );
};

export default Layout;
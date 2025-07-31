import React from 'react';
import { IconBaseProps } from 'react-icons';
import { FaWhatsapp as WhatsAppIcon } from 'react-icons/fa';

const Icon = WhatsAppIcon as React.ComponentType<IconBaseProps>;

export const WhatsAppButton: React.FC = () => {
  return (
    <button
      onClick={() => window.open('https://wa.me/TUNUMERODEWHATSAPP', '_blank')}
      className="fixed bottom-4 right-4 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-colors z-50"
      aria-label="Contactar por WhatsApp"
    >
      <Icon size={24} />
    </button>
  );
};
import React from 'react';

const Footer: React.FC = () => (
  <footer className="bg-gray-800 text-white py-8 mt-12">
    <div className="container mx-auto px-4 text-center">
      <p className="text-lg font-semibold mb-2">MIVISION - Centro de Oftalmología</p>
      <p className="text-gray-300">Cuidamos tu visión, cuidamos tu futuro</p>
      <div className="mt-4">
        <a
          href="https://wa.me/5491112345678"
          className="text-green-400 hover:text-green-300 mx-2"
          target="_blank"
          rel="noopener noreferrer"
        >
          📱 WhatsApp
        </a>
        <span className="text-gray-500">|</span>
        <a
          href="tel:+5491112345678"
          className="text-blue-400 hover:text-blue-300 mx-2"
        >
          📞 Llamar
        </a>
      </div>
    </div>
  </footer>
);

export default Footer; 
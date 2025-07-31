import React from 'react';
import { Link } from 'react-router-dom';

export const Navbar: React.FC = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex items-center">
              <span className="text-xl font-bold text-blue-600">MI VISIÓN</span>
            </Link>
          </div>
          <div className="flex space-x-8">
            <Link to="/" className="inline-flex items-center px-1 pt-1 text-gray-500 hover:text-gray-900">
              Inicio
            </Link>
            <Link to="/servicios" className="inline-flex items-center px-1 pt-1 text-gray-500 hover:text-gray-900">
              Servicios
            </Link>
            <Link to="/turnos" className="inline-flex items-center px-1 pt-1 text-gray-500 hover:text-gray-900">
              Turnos
            </Link>
            <Link to="/ubicacion" className="inline-flex items-center px-1 pt-1 text-gray-500 hover:text-gray-900">
              Ubicación
            </Link>
            <Link to="/admin" className="inline-flex items-center px-1 pt-1 text-gray-500 hover:text-gray-900">
              Admin
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
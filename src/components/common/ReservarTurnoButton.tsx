import React from 'react';
import { IconBaseProps } from 'react-icons';
import { FaCalendarAlt as CalendarIcon } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Icon = CalendarIcon as React.ComponentType<IconBaseProps>;

export const ReservarTurnoButton: React.FC = () => {
  return (
    <Link 
      to="/turnos"
      className="fixed bottom-20 right-4 bg-blue-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors z-50 flex items-center gap-2"
    >
      <Icon size={24} />
      <span>Reservar Turno</span>
    </Link>
  );
};
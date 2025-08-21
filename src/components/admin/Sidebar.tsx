
import React from 'react';
import { CalendarDaysIcon, BuildingOfficeIcon, UserGroupIcon, ClockIcon } from '@heroicons/react/24/outline';

export interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeSection, onSectionChange }) => {
  return (
    <div className="w-64 bg-white shadow-lg h-full">
      <div className="p-4 border-b">
        <h2 className="text-xl font-semibold text-gray-800">Panel Admin</h2>
      </div>
  <nav className="mt-4">
        <button
          onClick={() => onSectionChange('historial')}
          className={`flex items-center w-full px-4 py-3 text-left ${
            activeSection === 'historial'
              ? 'bg-indigo-50 text-indigo-700 border-r-4 border-indigo-700'
              : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          <span className="mr-3 inline-flex items-center">
            <ClockIcon className="h-5 w-5" />
          </span>
          <span>Historial de Turnos</span>
        </button>
        <button
          onClick={() => onSectionChange('turnos')}
          className={`flex items-center w-full px-4 py-3 text-left ${
            activeSection === 'turnos'
              ? 'bg-indigo-50 text-indigo-700 border-r-4 border-indigo-700'
              : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          <span className="mr-3 inline-flex items-center">
            <CalendarDaysIcon className="h-5 w-5" />
          </span>
          <span>Agenda de Turnos</span>
        </button>
        <button
          onClick={() => onSectionChange('sedes')}
          className={`flex items-center w-full px-4 py-3 text-left ${
            activeSection === 'sedes'
              ? 'bg-indigo-50 text-indigo-700 border-r-4 border-indigo-700'
              : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          <span className="mr-3 inline-flex items-center">
            <BuildingOfficeIcon className="h-5 w-5" />
          </span>
          <span>Gestión de Sedes</span>
        </button>
        <button
          onClick={() => onSectionChange('profesionales')}
          className={`flex items-center w-full px-4 py-3 text-left ${
            activeSection === 'profesionales'
              ? 'bg-indigo-50 text-indigo-700 border-r-4 border-indigo-700'
              : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          <span className="mr-3 inline-flex items-center">
            <UserGroupIcon className="h-5 w-5" />
          </span>
          <span>Profesionales</span>
        </button>
      </nav>
    </div>
  );
};

export default Sidebar;

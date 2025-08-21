import React, { useState } from 'react';
import Sidebar from './Sidebar';
import AdminCalendario from './AdminCalendario';
import HistorialTurnos from './HistorialTurnos';

export const AdminPanel: React.FC = () => {
  const [activeSection, setActiveSection] = useState('turnos');

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />
      <div className="flex-1">
  {activeSection === 'turnos' && <AdminCalendario />}
        {activeSection === 'historial' && <HistorialTurnos />}
        {/* Aquí puedes agregar más secciones si lo necesitas */}
      </div>
    </div>
  );
};

export default AdminPanel;
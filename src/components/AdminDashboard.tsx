import React, { useState } from 'react';
import AdminCalendario from './admin/AdminCalendario';
import Sidebar from './admin/Sidebar';

type Section = 'turnos' | 'sedes' | 'profesionales';

const AdminDashboard: React.FC = () => {
  const [activeSection, setActiveSection] = useState<Section>('turnos');

  const handleSectionChange = (section: string) => {
    setActiveSection(section as Section);
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'turnos':
        return <AdminCalendario />;
      case 'sedes':
        return <div>Gestión de Sedes (en desarrollo)</div>;
      case 'profesionales':
        return <div>Gestión de Profesionales (en desarrollo)</div>;
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar activeSection={activeSection} onSectionChange={handleSectionChange} />
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
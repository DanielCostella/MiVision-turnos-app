import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { SedesPanel } from './SedesPanel';
import ProfesionalesPanel from './ProfesionalesPanel';
import TurnosPanel from './TurnosPanel';
import { UsuariosPanel } from './UsuariosPanel';

export const AdminPanel: React.FC = () => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg h-screen p-4">
        <nav>
          <Link 
            to="/admin/turnos" 
            className="block py-2 px-4 hover:bg-blue-50 rounded-lg"
          >
            Turnos
          </Link>
          <Link 
            to="/admin/sedes" 
            className="block py-2 px-4 hover:bg-blue-50 rounded-lg"
          >
            Sedes
          </Link>
          <Link 
            to="/admin/profesionales" 
            className="block py-2 px-4 hover:bg-blue-50 rounded-lg"
          >
            Profesionales
          </Link>
          <Link 
            to="/admin/usuarios" 
            className="block py-2 px-4 hover:bg-blue-50 rounded-lg"
          >
            Usuarios
          </Link>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6">Panel de Administración</h1>
        <Routes>
          <Route path="/turnos" element={<TurnosPanel />} />
          <Route path="/sedes" element={<SedesPanel />} />
          <Route path="/profesionales" element={<ProfesionalesPanel />} />
          <Route path="/usuarios" element={<UsuariosPanel />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminPanel;
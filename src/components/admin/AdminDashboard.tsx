import React from 'react';
import TurnosPanel from './TurnosPanel';
import { SedesPanel } from './SedesPanel';
import ProfesionalesPanel from './ProfesionalesPanel'; // Cambiado
import { HorariosPanel } from './HorariosPanel';

const AdminDashboard: React.FC = () => {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Panel de Administración</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ProfesionalesPanel />
                <TurnosPanel />
                <SedesPanel />
                <HorariosPanel />
            </div>
        </div>
    );
};

export default AdminDashboard;
import React, { useState, useEffect } from 'react';
import { Profesional } from '../../types/profesional';
import { profesionalesService } from '../../services/profesionalesService';

const ProfesionalesPanel: React.FC = () => {
    const [profesionales, setProfesionales] = useState<Profesional[]>([]);

    useEffect(() => {
        loadProfesionales();
    }, []);

    const loadProfesionales = async () => {
        try {
            const data = await profesionalesService.getProfesionales();
            setProfesionales(data);
        } catch (error) {
            console.error('Error al cargar profesionales:', error);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Profesionales</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {profesionales.map(profesional => (
                    <div key={profesional.id} className="border p-4 rounded-lg shadow">
                        <h3 className="text-lg font-semibold">
                            {profesional.nombre} {profesional.apellido}
                        </h3>
                        <p>Especialidad: {profesional.especialidad}</p>
                        <p>Matrícula: {profesional.matricula}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProfesionalesPanel;